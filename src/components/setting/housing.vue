<template>
  <div class="c-main wow fadeIn">

    <el-row class="topArea wow fadeInDown" data-wow-delay="0.5s">
      <el-col :span="24">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>房源管理</el-breadcrumb-item>
        </el-breadcrumb>

      </el-col>
    </el-row>

    <div class="mainBody">

      <el-row class="headArea wow fadeInDown panelArea" data-wow-delay="0.3s">
        <el-col :span="24">
          <span class="title">房源管理</span>
        </el-col>
      </el-row>


      <el-row class="panelArea ">

      <!--  <el-col :span="8" :offset="12" :md="8" :lg="8" :xs="24" :sm="24">
          <el-input placeholder="请输入搜索内容" v-model="search" class="input-with-select" size="small">
            <el-select v-model="search_select" slot="prepend" placeholder="请选择........">
              <el-option label="设备名称" value="deviceName"></el-option>
              &lt;!&ndash;<el-option label="设备类型" value="roomNumber"></el-option>
              <el-option label="设备位置" value="position"></el-option>
              <el-option label="设备状态" value="roomCurrentHeadcount"></el-option>&ndash;&gt;
            </el-select>
            <el-button slot="append" @click="requestApi('search')" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>-->

        <el-col :span="8" :offset="12" :md="8" :lg="8" :xs="24" :sm="24">
        <el-cascader
          :options="options"
          change-on-select
        ></el-cascader>
          <el-button type="primary" icon="el-icon-search" @click="requestApi('search')">搜索</el-button>
        </el-col>
        <el-col :span="4" :md="4" :lg="4" :xs="24" :sm="24"
                style="text-align: left;box-sizing: border-box;padding-left: 25px">
          <el-tooltip content="刷新" placement="top">
            <el-button type="primary" icon="el-icon-refresh" @click="refresh" size="small"
                       plain></el-button>
          </el-tooltip>

          <el-tooltip content="新增" placement="top">
            <el-button type="primary" @click="openDialog('add')" icon="el-icon-plus" size="small" plain></el-button>
          </el-tooltip>

        </el-col>


      </el-row>

      <el-row class="panelArea">
        <el-col :span="24">

          <el-table
            :data="tableData"
            border
            style="width: 100%">

            <el-table-column
              width="50"
              type="index"
              label="序号">
            </el-table-column>

            <el-table-column
              prop="buildingName"
              width="120"
              label="楼栋名称">
            </el-table-column>

            <el-table-column
              prop="floorName"
              width="120"
              label="楼层">
            </el-table-column>

            <el-table-column
              prop="roomNumber"
              width="120"
              label="房间号">
            </el-table-column>

            <el-table-column
              prop="roomCurrentHeadcount"
              width="90"
              label="房间人数">
            </el-table-column>

            <el-table-column
              prop="deviceName"
              label="设备名称">
            </el-table-column>


            <el-table-column
              width="150"
              prop="imei"
              label="IMEI值">
            </el-table-column>

            <el-table-column
              align="center"
              fixed="right"
              label="操作"
              width="100">

              <template slot-scope="scope">
                <el-button @click="openDialog('edit',scope.row)" type="text" size="small">编辑</el-button>
                <el-button type="text" size="small" @click="openDialog('delete',scope.row)">删除</el-button>
              </template>
            </el-table-column>

          </el-table>

        </el-col>

      </el-row>

      <el-row class="panelArea">
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40,50]"
            :page-size="page_size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page_total">
          </el-pagination>
        </div>
      </el-row>

    </div>

    <el-dialog
      :append-to-body="true"
      title="删除设备"
      :visible.sync="dialogVisible"
      width="30%">
      <span>{{this.dialogText}}</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogConfirm('cancel')">取 消</el-button>
    <el-button type="primary" @click="dialogConfirm('confirm')">确 定</el-button>
  </span>
    </el-dialog>


    <el-dialog :append-to-body="true" :title="this.dialogText" @close="closeUserDialog" :visible.sync="dialogFormNew">
      <el-form :model="form_user" ref="userForm" :rules="formRulers" size="small">



        <el-form-item label="楼栋名称" :label-width="formLabelWidth" prop="buildingName">
          <el-select v-model="form_user.buildingName" placeholder="请选择楼栋名称">
            <el-option label="女生宿舍1号楼" value="1"></el-option>
            <el-option label="男生宿舍2号楼" value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="楼层" :label-width="formLabelWidth" prop="floorName">
          <el-select v-model="form_user.floorName" placeholder="请选择楼层">
            <el-option label="一楼" value="1"></el-option>
            <el-option label="二楼" value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="房间号" :label-width="formLabelWidth" prop="roomNumber">
          <el-select v-model="form_user.roomNumber" placeholder="请选择房间号">
            <el-option label="301" value="1"></el-option>
            <el-option label="403" value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="房间名" :label-width="formLabelWidth" prop="roomName">
          <el-row>
            <el-col :span="12">
              <el-input v-model="form_user.roomName" auto-complete="off" ></el-input>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="房间人数" :label-width="formLabelWidth" prop="roomCurrentHeadcount">
          <el-row>
            <el-col :span="12">
              <el-input v-model="form_user.roomCurrentHeadcount" auto-complete="off" ></el-input>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="可容人数" :label-width="formLabelWidth" prop="roomSharingPolicy">
          <el-row>
            <el-col :span="12">
              <el-input v-model="form_user.roomSharingPolicy" auto-complete="off" ></el-input>
            </el-col>
          </el-row>
        </el-form-item>

      <!--  <el-form-item label="设备名称" :label-width="formLabelWidth" prop="deviceName">
          <el-row>
            <el-col :span="12">
              <el-input v-model="form_user.deviceName" auto-complete="off" placeholder="（必填）"></el-input>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item v-if="this.action==='add'" label="IMEI值" prop="imei" :label-width="formLabelWidth" >
          <el-row>
            <el-col :span="12">
              <el-input v-model="form_user.imei"  auto-complete="off" placeholder="（必填）"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item v-if="this.action==='edit'" label="IMEI值" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="12">
              <el-input v-model="form_user.imei"  auto-complete="off"
                        placeholder="（不填写此处将不会修改IMEI值）"></el-input>
            </el-col>
          </el-row>
        </el-form-item>-->

        <el-form-item label="备注" :label-width="formLabelWidth" prop="remarks">
          <el-row>
            <el-col :span="12">
              <el-input type="textarea" v-model="form_user.remarks"></el-input>
            </el-col>
          </el-row>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogConfirm('cancel')">取 消</el-button>
        <el-button type="primary" @click="dialogConfirm('confirm')">确 定</el-button>
      </div>
    </el-dialog>

  </div>

</template>

<script>
  export default {
    name: "housing",
    data() {
     /* let checkdeviceName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('设备名称不能为空'));
        }
        if (value.length < 3 || value.length > 15) {
          return callback(new Error('设备名称长度要求3-15字符'));
        }else{
          callback();
        }
      };*/

      let checkremarks = (rule, value, callback) => {
        if (value.length >= 35) {
          return callback(new Error("备注内容过长"));
        }else {
          callback(); //这个会变绿
        }
      };

    /*  let checkPassword = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('IMEI值不能为空'));
        }
        if (value.length !== 15 || isNaN(value)) {
          return callback(new Error('IMEI值格式不正确'));
        }
        else {
          callback(); //这个会变绿
        }
      };*/
      return {
        loading: true,
        action: "",//当前行为
        currentPage: 1,//分页当前页
        page_total: 0,//分页 总数
        page_size: 10,//分页  一页的大小
        id: "",//用户id 唯一标识
        dialogVisible: false,//确认 的删除弹出  是否显示
        dialogFormNew: false,// 添加 或 编辑 的 模态框  是否显示
        formLabelWidth: "80px",//模态框右侧的label间距
        formRulers: {
         /* deviceName: [
            {validator: checkdeviceName, trigger: 'blur'},
          ],*/
          /* position: [
             {validator: checkposition, trigger: 'blur'}
           ],*/
          remarks: [
            {validator: checkremarks, trigger: 'blur'}
          ],
       /*   imei: [
            {validator: checkPassword, trigger: 'blur'}
          ]*/
        },
        fromCheck1: {
        /*  deviceName: false,*/
          position: false,
          remarks: false,
        },
        form_user: {
        /*  deviceName: "",*/
          floorName: "",
          roomNumber: "",
          roomName:"",
          buildingName: "",
          roomCurrentHeadcount: "",
          roomSharingPolicy:"",
          remarks: "",
      //    imei: "",
        },//新增 和 编辑 的数据
        dialogText: "",
        search: "",//搜索框
        search_select: "deviceName",//搜索框左侧下拉数据
        tableData: [],//表单数据源


        options:[{
          value:'zhinan',
          label:'宿舍楼1号楼',
          children:[{
            value:'zhinan1',
            label:'第一层',
            children:[{
              value:'zhinan11',
              label:'101'
            },{
              value:'zhinan12',
              label:'102'
            },{
              value:'zhinan13',
              label:'103'
            }
            ]
          },{
            value:'zhinan2',
            label:'第二层',
            children:[{
              value:'zhinan21',
              label:'201'
            },{
              value:'zhinan22',
              label:'202'
            },{
              value:'zhinan23',
              label:'203'
            }
            ]
          },{
            value:'zhinan3',
            label:'第三层',
            children:[{
              value:'zhinan31',
              label:'301'
            },{
              value:'zhinan32',
              label:'302'
            },{
              value:'zhinan33',
              label:'303'
            }
            ]
          }
          ]
        },{
          value:'ceshi',
          label:'教学楼2号楼',
          children:[{
            value:'ceshi1',
            label:'第一层',
            children:[{
              value:'ceshi11',
              label:'101'
            },{
              value:'ceshi12',
              label:'102'
            },{
              value:'ceshi13',
              label:'103'
            }
            ]
          },{
            value:'ceshi2',
            label:'第二层',
            children:[{
              value:'ceshi21',
              label:'201'
            },{
              value:'ceshi22',
              label:'202'
            },{
              value:'ceshi23',
              label:'203'
            }
            ]
          },{
            value:'ceshi3',
            label:'第三层',
            children:[{
              value:'ceshi31',
              label:'301'
            },{
              value:'ceshi32',
              label:'302'
            },{
              value:'ceshi33',
              label:'303'
            }
            ]
          }
          ]
        }]




      }
    },
    methods: {
      /**
       *改变分页  页面显示条数
       * @param val
       */
      handleSizeChange(val) {
        this.page_size = val;
        this.currentPage = 1;
        this.requestApi("getUser");
      },
      /**
       * 切换分页
       * @param val
       */
      handleCurrentChange(val) {
        this.currentPage = val;
        this.requestApi("getUser");
      },
      handleClick(row) {
        console.log(row);
      },
      /**
       * 打开模态框，删除用户  新增用户  编辑用户
       * @param type
       * @param data
       */
      openDialog(type, data) {
        if (type === 'delete') {
          this.action = "delete";
          this.id = data.id;
          this.dialogVisible = true;
          this.dialogText = "确认删除该设备吗？"
        } else if (type === 'add') {
          this.id = "";
          this.action = "add";
          this.dialogText = "新增设备";
          this.dialogFormNew = true;
          this.form_user = {
          /*  deviceName: "",*/
            floorName: "",
            roomNumber: "",
            roomName:"",
            buildingName: "",
            roomCurrentHeadcount: "",
            roomSharingPolicy:"",
            remarks: "",
       //     imei: "",
          }
        } else if (type === 'edit') {
          this.action = "edit";
          this.id = data["id"];
          for (let item in data) {
            if (data.hasOwnProperty(item)) {
              this.form_user[item] = data[item];
            }
          }
        /*  if (this.form_user.roomCurrentHeadcount === "在线") {
            this.form_user.roomCurrentHeadcount = "1"
          } else if (this.form_user.roomCurrentHeadcount === "离线") {
            this.form_user.roomCurrentHeadcount = "0"
          }*/
       //   this.form_user.imei = "";
          this.dialogText = "编辑设备信息";
          this.dialogFormNew = true;
        }
      },
      /**
       *关闭新增 编辑 用户的回调
       */
      closeUserDialog() {
        this.$refs['userForm'].clearValidate();//清除验证
      },
      /**
       * 确认或者取消
       * @param res
       */
      dialogConfirm(res) {
        if (this.action === "delete") {
          if (res === "cancel") {
            this.dialogVisible = false;
            this.action = "";
          } else {
            console.log("删除设备11111");
            console.log("删除设备", this.id);
            console.log("删除设备222222222");
            this.requestApi("delete");
            this.dialogVisible = false;
          }
        } else if (this.action === "add") {
          if (res === "cancel") {
            this.dialogFormNew = false;
            this.action = "";
          } else {
            console.log("新增设备");
            //首先打印一下this.$refs[formName]，检查是否拿到了正确的需要验证的form。其次在拿到了正确的form后，检查该form上添加的表单验证是否正确
            this.$refs["userForm"].validate((valid) => {
              console.log("1111");
              this.requestApi("add");
              this.dialogFormNew = false;
            });
          }
        } else if (this.action === "edit") {
          if (res === "cancel") {
            this.dialogFormNew = false;
          } else {
            console.log("保存编辑的设备");
            this.$refs["userForm"].validate((valid) => {
              if (valid) {
                this.requestApi("edit");
                this.dialogFormNew = false;
                console.log("success！");
                this.requestApi("getUser");
              } else {
                console.log('error submit!!');
                return false;
              }
            });
          }
        }
      },
      refresh(){
        this.search="";
        this.requestApi("getUser");
      },
      requestApi(action, verifyCB) {

        switch (action) {
          case "add":
            this.$axios({
              method:'post',
              url:'/schoolRoom',
              data: {
           /*     deviceName: this.form_user.deviceName,//设备名*/
            //    imei: this.form_user.imei,//IMEI号
                roomNumber: this.form_user.roomNumber,//房间号
                roomName: this.form_user.roomName,//房间名
                floorName: this.form_user.floorName,//楼层
                buildingName: this.form_user.buildingName,//楼栋名称
                remarks: this.form_user.remarks,//备注
                roomCurrentHeadcount: this.form_user.roomCurrentHeadcount,//房间当前人数
                roomSharingPolicy: this.form_user.roomSharingPolicy//总容纳人数
              },
              headers:{
                'Authorization':'Bearer ' +sessionStorage.getItem("token")
              }
            }).then((res) => {
              if (res.data.code === 0) {
                this.tips( res.data.message,"success")
                this.requestApi("getUser");
              } else {
                this.tips( res.data.message,"warning")
              }
            }).catch(
              (error) => {
                console.log(error);
              }
            );
            break;
          case "edit":
            this.$axios.put("/device", {
                id: this.id,
            /*    deviceName: this.form_user.deviceName,*/
          //      imei: this.form_user.imei,
                roomNumber: this.form_user.roomNumber,
                roomName: this.form_user.roomName,
                floorName: this.form_user.floorName,
                buildingName: this.form_user.buildingName,
                remarks: this.form_user.remarks,
                roomCurrentHeadcount: this.form_user.roomCurrentHeadcount,
                roomSharingPolicy: this.form_user.roomSharingPolicy
              },
              {
                headers:{
                  'Authorization':'Bearer ' +sessionStorage.getItem("token")
                }
              }).then((res) => {
              if (res.data.code === 200) {
                this.tips("更新成功！","success");
                this.requestApi("getUser")
              } else {
                this.tips(res.data.message,"warning");
                // this.tips("更新失败！");
              }
            }).catch((error) => {
            });
            break;
          case "delete":
            this.$axios.delete("/device", {//删除学校设备
              params: {
                ids: this.id
              },
              headers:{
                'Authorization':'Bearer ' +sessionStorage.getItem("token")
              }
            }).then((res) => {
              if (res.data.code === 0) {
                this.tips("删除成功！","success");
                this.requestApi("getUser")
              } else {
                this.tips(res.data.message,"warning");
              }
            }).catch((error) => {
              this.tips("系统出错！","error");
            });
            break;
          case "getUser":
            if (this.search !=="") {
              this.requestApi("search");//如果搜索框内有参数， 就执行搜索 接口
              return;
            }
            this.loading = true;
            this.$axios({//查看房源列表
              method:'get',
              url:'/schoolRoom/list',
              headers:{
                'Authorization':'Bearer ' +sessionStorage.getItem("token")
              },
              params:{
                pageNum:this.currentPage
              }
            } ).then((res) => {
              if (res.status === 200) {
                let list = res.data.data.list;
                this.page_total = res.data.data.pageSum;
                this.tableData = list.map(function (item) {
                  /*if (item.roomCurrentHeadcount === 1) {
                    item.roomCurrentHeadcount = "在线"
                  } else if (item.roomCurrentHeadcount === 0) {
                    item.roomCurrentHeadcount = "离线"
                  } else {
                    item.loginTime = "暂无记录";
                  }*/
                  return item;
                });
                this.tips("查看房源列表接口连接成功");
              } else {
                this.tips(res.data.message,"warning");
              }
              this.loading = false;
            }).catch((error) => {
              this.tips( "系统出错！","error");
              console.log(error);
              this.loading = false;
            });
            break;
     /*     case "checkName":
            this.$axios.get("/user/checkName", {
              params: {
                id: this.id,
              //  deviceName: this.form_user.deviceName,
              }
            }).then((res) => {
              /!*if (res.data.code === 200) {
                this.fromCheck1.deviceName = true;//验证通过
                verifyCB(this.fromCheck1.deviceName);//回调  验证
                this.form_user.hahah = "dd";
              } else if (res.data.code === 500) {
                this.fromCheck1.deviceName = false;//验证不通过
                verifyCB(this.fromCheck1.deviceName);//回调 弹出错误验证
              }*!/
              this.tips( "系统出错！");
            }).catch((error) => {
              this.tips( "系统出错！","error");
              console.log(error)
            });
            break;*/
          case "checkremarks":
            let _this = this;
            console.log(_this.form_user);
            this.$axios.get("/user/checkremarks", {
              params: {
                id: this.id,
                remarks: this.form_user.remarks,
              }
            }).then(function (res) {
              if (res.data.code === 200) {
                _this.fromCheck1.remarks = true;//验证通过
                verifyCB(_this.fromCheck1.remarks);//回调  验证
              } else if (res.data.code === 500) {
                _this.fromCheck1.remarks = false;//验证不通过
                verifyCB(_this.fromCheck1.remarks);//回调  验证
              }
            }).catch((error) => {
              this.tips( "系统出错！","error");
              console.log(error)
            });
            break;
          case "checkposition":
            this.$axios.get("/user/checkposition", {
              params: {
                id: this.id,
                position: this.form_user.position,
              }
            }).then((res) => {
              if (res.data.code === 200) {
                this.fromCheck1.position = true;//验证通过
                verifyCB(this.fromCheck1.position);//回调  验证
              } else if (res.data.code === 500) {
                this.fromCheck1.position = false;//验证
                verifyCB(this.fromCheck1.position);//回调
              }
            }).catch((error) => {
              this.tips( "系统出错！","error");
              console.log(error);
            });
            break;
          case "search":
            if (this.search === "") {
              this.tips("搜索内容不能为空！","warning");
              return;
            }
            this.loading = true;
            this.$axios.get("/device", {
              params: {
                query: this.search,
                type: this.search_select,
                pageNum: this.currentPage,
                //  pageSize: this.page_size,
              },
              headers:{
                'Authorization':'Bearer ' +sessionStorage.getItem("token")
              }
            }).then((res) => {
              if (res.data.code === 200) {
                let list = res.data.map.pageInfo.list;

                if (list.length === 0) {
                  this.tips("没有查询到数据","info");
                  this.tableData = [];
                  this.page_total = 0;
                  this.loading = false;
                  return;
                }
                this.page_total = res.data.pageSum;
                let _this = this;
                /*this.tableData = list.map(function (item) {

                  if (item.roomCurrentHeadcount === 1) {
                    item.roomCurrentHeadcount = "在线"
                  } else if (item.roomCurrentHeadcount === 0) {
                    item.roomCurrentHeadcount = "离线"
                  }
                  return item;
                });*/
              } else if (res.data.code === 500) {
                this.tips(res.data.message,"warning");
              }
              this.loading = false;
            }).catch((error) => {
              this.tips("系统出错！","error");
              console.log(error);
              this.loading = false;
            });
            break;
        }
      },
    }, created() {
      this.requestApi("getUser");
    }
  }
</script>

<style lang="scss" scoped>
  .c-main /deep/ .el-select .el-input {
    width: 120px;
    text-align: center;
  }

  .c-main /deep/ .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }


</style>
