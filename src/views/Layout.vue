<template>
  <!-- 顶部头栏 -->
  <AppNavbar/>
  <!-- 头部组件 -->
  <AppHeader/>
  <!-- 内容容器 -->
  <div class = 'app-body'>
    <!-- 二级路由 -->
    <RouterView />
  </div>
  <!-- 底部组件 -->
  <AppFooter/>
</template>

<script>
import AppNavbar from '@/components/app-navbar.vue'
import AppHeader from '@/components/app-header.vue'
import AppFooter from '@/components/app-footer.vue'
import { useStore } from 'vuex'
export default {
  name: 'Layout',
  components: {
    AppNavbar,
    AppHeader,
    AppFooter
  },
  setup () {
    const store = useStore()
    store.dispatch('category/getList')
  }
}
</script>

<style lang='less' scoped>
.app-body{
  min-height: 600px;
}
</style>
