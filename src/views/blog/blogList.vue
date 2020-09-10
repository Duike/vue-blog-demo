<template>
  <div>
    <h1>博客界面</h1>
    <span>{{messageSocket}}</span>
  </div>

</template>

<script>
  export default {
    name: "blogList",
    data() {
      return {
        departmentInfo: {
          id: '',
          name: ''
        },
        userName: '上赞',
        messageSocket: ""
      }
    },
    methods: {
      //获取部门信息
      getDepartmentList() {
        let _this = this;
        //请求参数
        let params = {
          id:1,
          name:"duike"
        };
        this.$axios({
          url: 'xqd/department/test111',
          method: 'post',//请求的方式
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'token': sessionStorage.getItem("Token")
          },
          params:{
            current:20,
            size:30
          },
          data: JSON.stringify(params)
        }).then(res => {
          //console.log(res);


        }).catch(err => {
          console.log('报错的信息', err);
        }).then(function () {
          //最后执行

        });
      },
      initWebSocket() {
        // 连接错误
        this.websocket.onerror = this.setErrorMessage

        // 连接成功
        this.websocket.onopen = this.setOnopenMessage

        // 收到消息的回调
        this.websocket.onmessage = this.setOnmessageMessage

        // 连接关闭的回调
        this.websocket.onclose = this.setOncloseMessage

        // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
        window.onbeforeunload = this.onbeforeunload
      },
      setErrorMessage() {
        console.log('WebSocket连接发生错误   状态码：' + this.websocket.readyState)
      },
      setOnopenMessage() {
        console.log('WebSocket连接成功    状态码：' + this.websocket.readyState)
      },
      setOnmessageMessage(event) {
        console.log(event);
        // 根据服务器推送的消息做自己的业务处理
        console.log('服务端返回：' + event.data)
        this.messageSocket = event.data;
      },
      setOncloseMessage() {
        console.log('WebSocket连接关闭    状态码：' + this.websocket.readyState)
      },
      onbeforeunload() {
        this.closeWebSocket()
      },
      closeWebSocket() {
        this.websocket.close()
      }
    },
    mounted() {
      //this.getDepartmentList();
      // WebSocket
      if ('WebSocket' in window) {
        this.websocket = new WebSocket('ws://localhost:8080/duike/websocket/' + this.userName)
        this.initWebSocket()
      } else {
        alert('当前浏览器 Not support websocket')
      }
      this.getDepartmentList();
    },
    beforeDestroy() {
      this.onbeforeunload()
    },
  }
</script>

<style scoped>

</style>
