import { topCategory } from '@/api/constant'
import { findAllCategory } from '../../api/category'
export default {
  namespaced: true,
  state () {
    return {
    //   分类集合,依赖topCategory重新设置，保证初始化就要有数据
      list: topCategory.map(item => ({ name: item }))
    }
  },
  mutations: {
    setCategory (state, payload) {
      state.list = payload
    },
    // 修改当前一级分类下的open数据为true
    show (state, item) {
      const category = state.list.find(category => category.id === item.id)
      category.open = true
    },
    // 修改当前一级分类下的open数据为false
    hide (state, item) {
      const category = state.list.find(category => category.id === item.id)
      category.open = false
    }
  },
  actions: {
    async getList ({ commit }) {
      const { result } = await findAllCategory()
      result.forEach(item => {
        item.open = false
      })
      commit('setCategory', result)
    }
  }
}
