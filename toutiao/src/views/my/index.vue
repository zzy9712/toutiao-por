<template>
    <div class="my-container">
      <van-cell-group>
        <van-cell 
          v-if="user"
          title="单元格" 
          value="内容" 
          center
          :border="false"
          class="van-cell-title"
        >
          <van-image
            class="image-info"
            slot="icon"
            round
            fit="cover"
            :src=userDate.photo
          />
          <div slot="title" class="div-name">{{userDate.name}}</div>
          <van-button size="small" round class="update-btn">编辑资料</van-button>
        </van-cell>
        <div class="isuser-info" v-else>
          <van-image 
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
            class="isuser-img" 
            round></van-image>
          <div class="isuser-text" @click="$router.push('./login')">点击登录</div>
        </div>
        <van-grid v-if="user" class="van-grid-title" :border="false">
          <van-grid-item >
            <div slot="text" class="text-conter">
              <div class="span">1</div>
              <div class="text">头条</div>
            </div>
          </van-grid-item>
          <van-grid-item >
            <div slot="text" class="text-conter">
              <div class="span">123</div>
              <div class="text">关注</div>
            </div>
          </van-grid-item>
          <van-grid-item >
            <div slot="text" class="text-conter">
              <div class="span">13</div>
              <div class="text">粉丝</div>
            </div>
          </van-grid-item>
          <van-grid-item >
            <div slot="text" class="text-conter">
              <div class="span">1203</div>
              <div class="text">获赞</div>
            </div>
          </van-grid-item>
        </van-grid>
        <van-grid 
          class="nav-grid"
          column-num="2" 
          :border="true">
          <van-grid-item  
            class="nav-grid-item"
            icon-prefix="toutiao"
            icon="shoucang" 
            text="收藏" />
          <van-grid-item 
            class="nav-grid-item"
            icon-prefix="toutiao"
            icon="lishi" 
            text="历史" />
        </van-grid>
        <div class="xian"></div>
        <van-cell v-if="user" title="消息通知" is-link to="/" />
        <van-cell title="小智同学" is-link to="/" />
      </van-cell-group>
      <div v-if="user" @click="onLoginOut" class="my-login-out">退出登录</div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { userInfo } from '../../api/user.js'
export default {
  name:'MyIndex',
  components: {

  },
  props: {

  },
  data () {
    return {
      userDate:{}
    }
  },
  computed:{
    ...mapState(['user']) // 把Vuex 的数据映射到本地
  },
  created(){
    // 获取个人信息接口失效
    this.loadUserInfoData()
  },
  methods: {
    onLoginOut(){
      this.$dialog.confirm({
        title: '退出登录',
        message: '确认退出吗?'
      })
        .then(() => {
          // 清除登录态
          this.$store.commit('setUser',null)
        })
        .catch(() => {
          // on cancel
        });
    },

    // 发请求获取数据
    async loadUserInfoData(){
      try{
        const res = await userInfo()
        console.log(res.data.data);
        this.userDate = res.data.data
      }catch(err){
        console.log(err);
        console.log('错误');
        this.$toast('服务器错误')
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .my-container{
    .van-cell-title{
      background-color: #3899fc;
      height: 120px;
      box-sizing: border-box; //盒子模型
      padding-top: 60px;
      padding-bottom: 11px;
      .image-info{
        height: 66px;
        width: 66px;
        border: 1px solid #FFF;
      }
      .div-name{
        color: #fff;
        font-size: 18px;
        box-sizing: border-box;
        padding-left: 10px;
      }
      .update-btn{
        height: 22px;
        color: #8c8584;
        line-height: 22px;
      }
    }
    .isuser-info{
      background-color: #3899fc;
      height: 180px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .isuser-img{
        width: 80px;
        height: 80px;
      }
      .isuser-text{
        color: #fff;
        font-size: 18px;
      }
    }
    .van-grid-title{
      height: 70px;
      /deep/.van-grid-item__content{
        background-color: #3899fc;
      }
      .text-conter{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .span{
          font-size: 15px;
          color: #fff;
        }
        .text{
          font-size: 11px;
          color: #fff;
        }
      }

    }
    /deep/.nav-grid{
      .nav-grid-item{
        height: 70px;
        .toutiao{ 
          font-size: 22px;

        }
        .toutiao-shoucang{
          color: #be9e98;
        }
        .toutiao-lishi{
          color: #d4c08f; 
        }
      }
    }
    .my-login-out{
      text-align: center;
      color: #c2a3a9;
      font-size: 18px;
      line-height: 45px;
      height: 45px; 
      margin-top: 4px;
      background-color: #fff;
    }
    .mb-4{
      margin-bottom: 4px;
    }
    .xian{
      height: 4px;
      background-color: #f5f7f9;
      width: 100%;
    }

  }
</style>