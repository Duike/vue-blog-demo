<template>
    <h1>博客界面</h1>
</template>

<script>
    export default {
        name: "blogList",
      data(){
          return{
            departmentInfo:{
              id:'',
              name:''
            }
          }
      },
      methods:{
          //获取部门信息
        getDepartmentList(){
          let _this = this;
          this.$axios({
            url: 'xqd/department/findTemplateList',
            method: 'get',//请求的方式
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',

            },
            data:JSON.stringify({})
          }).then(res => {
            console.log(res);
            if (res.data.status == "异常报错"){
              this.$message({
                message: res.data.message,
                type: "warning"
              });

              // let _this = this;
              // setTimeout(function(){
              //   _this.$router.push({
              //     path: "/login"
              //   });
              // },2000)


            }

          }).catch(err => {
            console.log('报错的信息', err);
          }).then(function () {
            //最后执行

          });
        }
      },
      mounted(){
          this.getDepartmentList();
      }
    }
</script>

<style scoped>

</style>
