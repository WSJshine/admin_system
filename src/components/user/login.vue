<template>
<div class="c-main">




<div class="loginWrapper ">
  <div class="logo "><p class="zi">校园可视化管理系统</p></div>
  <el-form :label-position="labelPosition" label-width="80px" :model="form" >
    <el-form-item label="">
      <el-input v-model="form.userName" placeholder="请输入用户名">
        <template slot="prepend"><img src="../../assets/other-img/yonghudl@2x.png"  width="28px" height="28px"></template>
      </el-input>
    </el-form-item>
    <el-form-item label="">
      <el-input type="password" v-model="form.password" placeholder="请输入密码">
        <template slot="prepend"><img src="../../assets/other-img/mima@2x.png"  width="28px" height="28px"></template>
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
              userName:"wangshujun",
              password:"666666",
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
              console.log("1111");
              console.log(res.data);
             // this.setStorage("login",this.$base64.encode(res.data.map.token));//获取token
              that.setStorage("login",this.$base64.encode(res.data.token));
              that.tips("登录成功","success");
              console.log(res);
              that.$router.push({path: "/home"});
              that.getUserInfo();
            });
          },
        getUserInfo(){
          that.requestApiFnc("/sysUser/login","post",{token:this.$base64.decode(this.getStorage('login'))},(res)=>{
              const {code,map:{user},message} = res.data;
              if (code === 200){
                that.setStorage('user',that.$base64.encode(JSON.stringify(user)));
                /*console.log(this.getStorage('user'));
                console.log(this.$base64.decode(this.getStorage('user')));
                console.log(JSON.parse(this.$base64.decode(this.getStorage('user'))));*/
                this.$router.push({path: "/home"});
              }
            })
        },
        register(){
          this.tips("注册还没有做","warning");
        },
      },
      created(){
        // 使用sessionStorage模拟登录状态
        var login = this.getStorage("login");
        console.log(login);
        if(login==null || login=="0"){
          console.log("没有登录");
        }else {
          console.log("已经登录了 直接跳到首页");
          that.$router.push({path: "/home"});
        //   this.getUserInfo();
        }
         // this.notify("warning","注意","账号和密码是假数据，直接点击登录即可~~")
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
    margin-left: 120px;
  }
  .denglu{
    width: 300px;
    height: 50px;
  }

}

  </style>
