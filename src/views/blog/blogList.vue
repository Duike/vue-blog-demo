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
          //请求参数
          let params = {

          };
          this.$axios({
            url: 'xqd/department/findTemplateList',
            method: 'post',//请求的方式
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',
              'token':sessionStorage.getItem("Token")
            },
            data:JSON.stringify(params)
          }).then(res => {
            //console.log(res);


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
