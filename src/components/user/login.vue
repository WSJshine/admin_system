<template>
<div class="c-main">




<div class="loginWrapper ">
  <div class="logo "><p class="zi">校园可视化管理系统</p></div>
  <el-form :label-position="labelPosition" label-width="80px" :model="form" >
    <el-form-item label="">
      <el-input v-model="form.userName" placeholder="请输入用户名">
        <template slot="prepend"><img src="../../assets/other-img/yonghudl@2x.png"  width="25px" height="25px"></template>
      </el-input>
    </el-form-item>
    <el-form-item label="">
      <el-input type="password" v-model="form.password" placeholder="请输入密码">
        <template slot="prepend"><img src="../../assets/other-img/mima@2x.png"  width="25px" height="25px"></template>
      </el-input>
    </el-form-item>
    <el-form-item  label="" class="mima">
      <el-radio class="mima1" >记住密码</el-radio>
      <el-button  type="text" class="mima2">忘记密码</el-button>
    </el-form-item>
    <el-form-item  label="">
      <el-button  type="primary" @click="login" class="denglu">登录</el-button>
    </el-form-item>
  </el-form>

</div>



</div>
</template>

<script>
    export default {
        name: "login",
      data(){
          return{
            labelPosition:"top",
            form: {
              userName:"",
              password:"",
            }
          }
      },
      methods:{
          login(){
            let that=this;
            let type = "";
            this.requestApiFnc("/sysUser/login",'post2',{
              userName:this.form.userName,
              password:this.form.password,
            },(res)=>{


              if(res.data.code === 0){
              //  that.setStorage("token",this.$base64.encode(res.data.data.token));

                sessionStorage.setItem('token',res.data.data.token)
                that.tips("登录成功","success");
                that.$router.push({path: "/frame/home"});
              }else{
                this.tips("登录失败,请重新登录");
                that.$router.push({path: "/"});
              }


            });
          },

        register(){
          this.tips("注册还没有做","warning");
        },
      },
      created(){
        let that=this;
        // 使用sessionStorage模拟登录状态
         var token = that.getStorage("token");
         console.log("111111111");
         console.log(that.getStorage("token"));
         console.log("222222222222222");
         console.log(token);
        if(token==null || token=="0"){
          // console.log("没有登录");
        }else {

          that.$router.replace({name: "Home"});

        }

      }
    }
</script>

<style lang="scss"  scoped>
  @import "../../assets/styles/base";

  @keyframes bg{

    0%{
      background-position: 0 0;
    }
    100%{
      background-position: 100% 0;
    }

  }

  @keyframes login{

    0%{
      opacity: 0;
    }
    100%{
      opacity: 1;
    }

  }
.c-main{
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  background-image: url("../../assets/other-img/bj@2x.png");
  background-size: 100% 100%;
  animation: bg 10s ease-in-out infinite  alternate;


  .loginWrapper{

    .logo{
      position: absolute;
      top:-10%;
      left: 50%;
      width: 400px;
      height: 100px;
      transform: translate(-50%,-50%);
      z-index: 100;
      text-align: center;
      color: #fff;
      font-family: "Microsoft YaHei";
      font-size: 30px;
    }

  background-color:  rgba(255,255,255,0.6);
    padding: 40px;
    border-radius: 10px;
    width: 300px;
    height: 260px;
    color: $baseColor1;
    position: absolute;
    top:60%;
    left: 70%;
    transform: translate(-50%,-50%);
    margin-top: -5%;
    transition: all 0.5s;
    animation: login 2s ease-in-out 1;

    .copyright{

      position: absolute;
      bottom: -80px;
      left: 0;
      width: 100%;
      text-align: center;
      color: white;
      font-size: 12px;
      opacity: 0.8;
    }

  }
  .loginWrapper:hover{
    box-shadow: 1px 5px  30px 0px #6e6e6e;

  }

  .mima{
    margin-top: 20px;
  }
  .mima1{
    font-family: "Microsoft YaHei";
    font-size: 12px;
    color: black;
    margin-left: 20px;
  }
  .mima2{
    font-family: "Microsoft YaHei";
    font-size: 13px;
    color: #3f7bf6;
    padding-left: 30%;
  }
  .denglu{
    width: 300px;
    height: 50px;
  }

}

  </style>
