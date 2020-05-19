<template>
    <div class="login">
        <div class="login-con">
            <Card icon="log-in" :bordered="false">
                <div class="form-con">
                    <h5 class="fz14 t-c mb24">欢迎登录</h5>
                    <Form ref="loginForm" :model="loginForm" :rules="rulelogin" class="mlr16">
                        <FormItem prop="userName">
                            <Input type="text" v-model="loginForm.userName" placeholder="用户名"></Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="loginForm.password" placeholder="密码"></Input>
                        </FormItem>
                        <FormItem class="t-c">
                            <Button type="primary" @click="handleSubmit('loginForm')">登录</Button>
                        </FormItem>
                    </Form>
                    <!-- <p class="login-tip">输入用户名和密码</p> -->
                </div>
            </Card>
        </div>
    </div>
</template>

<script>

import { mapActions } from 'vuex'
export default {
  data () {
    return {
      loginForm: {
        userName: '',
        password: ''
      },
      rulelogin: {
        userName: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  components: {
  },
  methods: {
    ...mapActions(['querylogin']),
    handleSubmit (name) {
      let _this = this
      _this.$refs[name].validate((valid) => {
        if (valid) {
          // 进行防Sql注入
          let params = {
            usercode: _this.$xss(_this.loginForm.userName),
            password: _this.$xss(_this.loginForm.password)
          }
          _this.$store.dispatch('querylogin', params).then((res) => {
            _this.$Message.success('登录成功')
            // sessionStorage.setItem('token', res.token)
            // // let res = composeTree(res.res)
            // // console.log(res)
            // sessionStorage.setItem('res', JSON.stringify(composeTree(res.res)))
            // sessionStorage.setItem('role', JSON.stringify(res.role))
            // sessionStorage.setItem('user', JSON.stringify(res.user))
            // _this.$router.push('/home')
          }).catch((res) => {
            _this.$Message.success('账号或密码错误')
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoprd>
@import url('./login.less');
</style>
