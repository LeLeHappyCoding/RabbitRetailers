import axios from 'axios'
import store from '@/store'
import router from '@/router'
// 到处基准地址 ，其他地方可能也会用到基准地址，故放在外面
export const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'

const instance = axios.create({
  baseURL,
  timeout: 5000
})

instance.interceptors.request.use(config => {
  const { profile } = store.state.user
  if (profile.token) {
    config.headers.Authorization = `Bearer ${profile.token}`
  }

  return config
}, err => {
  return Promise.reject(err)
})

instance.interceptors.response.use(res => res.data, (err) => {
  if (err.response && err.response.status === 401) {
    store.commit('user/setUser', {})
    // 当前路由地址
    // 组件里面: `/user?a=10` $router.path === /user $router.fullPath === /user?a=10
    // js模块中: router.currentRoute.value.fullPath 就是当前路由地址 (加.value 是因为 (Vue3) router.currentRoute是响应式的)
    // encodeURIComponent是js原生api 用于转换到url编码 (当url中有query参数?a=10&b=90会出问题)
    const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
    router.push('/login?redirectUrl=' + fullPath)
  }
  return Promise.reject(err)
})

export default (url, method, submitData) => {
  return instance({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}
