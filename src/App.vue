<template>
  <div id="app">
    <router-view></router-view>
    <!--<img src="./assets/logo.png">-->

  </div>
</template>

<script>
  export default {
    name: 'App',
   /* data() {
      return {

      }
    },
    computed:{
      systemInfo(){
        return this.$store.getters.getSystemInfo;
      }
    },
    methods:{
      getSystemInfo() {
        this.requestApiFnc('/algorithm/encrypt','get',value=666,(res)=>{
          /!*const {code,map:{SystemSetting},message} = res.data;
          if (code === 200){
            console.log(SystemSetting);
            this.$store.commit('setSystem',SystemSetting)

          }*!/
          console.log(message);
        })
      },
    },
    created(){
      this.getSystemInfo();
      //console.log(this.systemInfo);
     // console.log("aaaaaaaaaa");
    }*/
  };
</script>

<style lang="scss">
  @import 'assets/styles/publicStyle';
  html, body, #app,.frame-wrapper,.frame,.frame-container,.el-main{
    height: 100%;
  }
  body{
    overflow: hidden;
    background-color: #f2f2f2;
  }
  /*.el-main{*/
    /*padding: 0!important;*/
  /*}*/
</style>

