<template>
    <div class="login-container">
      <van-nav-bar
        class="app-nav-bar"
        title="注册/登录"
        left-arrow
        @click-left="$router.back()"
      />
      <!-- 输入框 -->
      <van-form @submit="onLigin()" 
        @failed="onFailed"
        ref="login-from" 
        :show-error=false
        :show-error-message=false >
        <van-field
          v-model="user.mobile"
          icon-prefix="toutiao"
          left-icon="shouji"
          name="mobile"
          placeholder="请输入手机号"
          :rules="formRules.mobile"
        />
        <van-field
          v-model="user.code"
          icon-prefix="toutiao"
          left-icon="yanzhengma"
          center
          clearable
          placeholder="请输入短信验证码"
          :rules="formRules.code"
        >
          <template #button>
            <van-count-down 
              v-if="isCountDownShow" 
              @finish="finish"
              :time="1000*60" 
              format="ss s后重新发送" />
            <van-button 
              v-else
              @click.prevent="onSendSms"
              :disabled="isSendSmsLoading"
              size="small" 
              round 
              type="primary"
              class="yzm-btn"
            >获取验证码</van-button>
          </template>
        </van-field>
        <div class="login-btn-warp">
          <van-button 
            type="info" 
            class="login-btn" 
            block
            >登录</van-button>
        </div>
      </van-form>

      
    </div>
</template>

<script>
import { login, sendSms } from '../../api/user.js'

export default {
  name:'LoginIndex',
  components: {

  },
  props: {

  },
  data () {
    return {
      user:{
        mobile:'',
        code:'246810'
      },
      // 表单校验页面规则
      formRules:{
        mobile:[
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3|5|7|9]\d{9}$/, message: '请输入正确的手机号' }
        ],
        code:[
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },
      isCountDownShow:false,
      isSendSmsLoading:false,
    }
  },
  methods: {
    async onLigin(){
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration:0
      });
      try{
        const res = await login(this.user)
        console.log(res);
        this.$toast.success('登录成功')
        // 将token等数据存放在Vuex容器中
        this.$store.commit('setUser',res.data.data)
        this.$router.push('./my')
      }catch(err){
        this.$toast.fail('登录失败,手机号或者验证码失败')
        console.log(err);
        console.log('出错了');
      }
    },

    onFailed(error){
      if(error.errors[0]){
        this.$toast({
          message:error.errors[0].message,
          position:top // 提示消息位置顶部
        })
      }else if(error.errors[1]){
        this.$toast({
          message:error.errors[1].message,
          position:top // 提示消息位置顶部
        })
      }
    },

    async onSendSms(){
      // 校验手机验证码
      // 验证通过  -> 发送验证码 -> 开启倒计时 -> 请求登录
      // 请求发送验证码 -> 隐藏发送按键 -> 显示倒计时 -> 
      // 一进入就禁用按钮，防止用户短时间多次触发
      this.isSendSmsLoading = true
      try{
        // 验证是否输入手机号
        await this.$refs['login-from'].validate('mobile')
        console.log('验证成功');
        // 请求发送验证码
        this.isCountDownShow = true
        const res = await sendSms(this.user.mobile)
        // console.log(res);
      }catch(error){
        console.log('掏出一次');
        console.log(error);
        let message = ''
        if(error && error.response && res.response.status === 429){
          message = '发送太频繁，请稍后再试'
        }else if(error.name === 'mobile'){
          message = "请输入正确的手机号"
        }else if(res.response.status === 404){
          message = "系统繁忙，请稍后再试"
        }else{
          message = "系统繁忙，请稍后再试"
        }

        this.$toast({
          message:message,
          position:top // 提示消息位置顶部
        })
      }
      // 结束后无论成功失败都关闭禁用状态
      this.isSendSmsLoading = false
    },

    finish(){
      this.isCountDownShow = false
    }
  }
}
</script>

<style lang="less" scoped>
  
  .login-container{
    .yzm-btn{
      height: 35px;
    }
    .login-btn-warp{
      padding: 26px 16px;
      .login-btn{
        background-color: #6db4fb;
        border: none;
        
      }
    }
  }
</style>