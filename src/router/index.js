import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/user/login'
import Register from '@/components/user/register'
import Frame from '@/components/frame'
import Home from '@/components/home/home'
import openDoor from '@/components/news/openDoor'
import message from '@/components/news/message'
import teacher from '@/components/news/teacher'
import alarm from '@/components/news/alarm'
import student from '@/components/news/student'
import housing from '@/components/setting/housing'


import devicePassword from '@/components/repairs/devicePassword'
import device from '@/components/repairs/device'



import UserManagement from '@/components/user/userManagement'



import Role from '@/components/user/role'


Vue.use(Router)

export default new Router({
 // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {/*菜单栏*/
      path: '/frame',
      name: 'Frame',
      component: Frame,
      children: [
        {/*首页*/
          path: 'home',
          name: 'Home',
          component: Home
        },
        {/*开门记录*/
          path: 'openDoor',
          name: 'openDoor',
          component: openDoor
        },
        {/*消息管理*/
          path: 'message',
          name: 'message',
          component: message
        },{/*教师*/
          path: 'teacher',
          name: 'teacher',
          component: teacher
        },
        {/*报警记录*/
          path: 'alarm',
          name: 'alarm',
          component: alarm
        },
        {/*学生*/
          path: 'student',
          name: 'student',
          component:student
        },
        {
/*用户管理*/
          path: 'userManagement',
          name: 'userManagement',
          component: UserManagement


        },{
          path: 'role',
          name: 'role',
          component: Role
        },{/*房源管理*/
          path: 'housing',
          name: 'housing',
          component: housing
        },{/*设备密码管理*/
          path: 'devicePassword',
          name: 'devicePassword',
          component: devicePassword,
        },
        {/*智能锁*/
          path: 'device',
          name: 'device',
          component: device,
        }

      ]
    }

  ]
})
