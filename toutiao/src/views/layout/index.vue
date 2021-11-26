<template>
    <div>
      <!-- 路由占位符 -->
      <router-view/>

      <!-- 底部导航栏 -->
      <van-tabbar v-model="active" route>
        <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
        <van-tabbar-item icon="comment-o" to="/qa">问答</van-tabbar-item>
        <van-tabbar-item icon="video-o" to="/video">视频</van-tabbar-item>
        <van-tabbar-item icon="friends-o" to="/my">我的</van-tabbar-item>
      </van-tabbar> 
      <!-- /底部导航栏 -->

    </div>
</template>

<script>
export default {
  name:'LayoutIndex',
  components: {

  },
  props: {

  },
  data () {
    return {
      active:0
    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>

</style>