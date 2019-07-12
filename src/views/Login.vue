<template>
  <div>
    <el-form
      :model="ruleForm2"
      :rules="rules2"
      ref="ruleForm2"
      label-position="left"
      label-width="0px"
      class="demo-ruleForm login-container"
    >
      <el-form-item prop="username">
        <el-input
          class="username"
          type="text"
          v-model="ruleForm2.username"
          auto-complete="off"
          placeholder="账号"
        >
          <template slot="prepend" style="background-color: #BBBBBB !important;">
            <img src="../assets/user.png">
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="ruleForm2.password"
          auto-complete="off"
          @keyup.enter.native="handleSubmit2"
          placeholder="密码"
        >
          <template slot="prepend">
            <img src="../assets/lock.png">
          </template>
        </el-input>
      </el-form-item>
      <el-checkbox v-model="checked" checked class="remember">记住用户名</el-checkbox>
      <div @click="registered" style="float: right;cursor: pointer;position: relative;">
        <span style="color: #8165FF;">用户注册</span>
      </div>
      <el-form-item style="width:100%;">

        <el-button
          type
          style="width:100%;background-color:#8165FF;color:#FFFFFF;"
          @click="handleSubmit2"
          :loading="logining"
        >登录
        </el-button>
        <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import aes from "../utils/aes";

  export default {
    name: "Login",
    data() {
      return {
        ruleForm2: {
          username: "",
          password: ""
        },
        rules2: {
          username: [
            {
              required: true,
              message: "请输入账号",
              trigger: "blur"
            }
          ],
          password: [
            {
              required: true,
              message: "请输入密码",
              trigger: "blur"
            }
          ]
        },
        checked: true,
        logining: false,
      }
    },
    methods: {
      //用户注册
      registered() {
        console.log('用户注册');
      },
      handleSubmit2() {
        let _this = this;
        this.$refs.ruleForm2.validate(valid => {
          if (valid) {
            this.logining = true;

            //加密
            this.ruleForm2.password = aes.encrypt(this.ruleForm2.password, "SZ[SAFE]dqaq.123")
              .replace(/%/g, "%25")
              .replace(/[+]/g, "%2B");

            let _this = this;
            this.$axios({
              url: 'xqd/login',
              method: 'post',//请求的方式
              headers: {
                'Content-Type': 'application/json; charset=UTF-8'
              },
              data: JSON.stringify(this.ruleForm2)
            }).then(res => {
              console.log(res);
              if (res.data.status == "success") {
                this.$message({
                  message: res.data.message,
                  type: "success"
                });
                if (this.checked) {
                  //记住用户名
                  localStorage.setItem("userName", this.ruleForm2.username);
                }

                //保存token
                sessionStorage.setItem("Token", res.data.token);

                this.$router.push({
                  path: "/blog/blogList"
                });

                sessionStorage.setItem("userId", res.data.user.id);

              } else {
                this.$message({
                  message: res.data.message,
                  type: "error"
                });
              }

            }).catch(err => {
              console.log('报错的信息', err);
            }).then(function () {
              //最后执行
              _this.logining = false;
            });

          } else {
            console.log("error submit!!");
            return false;
          }
        });
      }
    },
    mounted() {

    }
  }
</script>

<style scoped>

</style>
