// 定义分类相关api接口
import request from '@/utils/request'

export const findAllCategory = () => {
  return request('/home/category/head', 'get')
}
