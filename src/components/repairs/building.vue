<template>
  <div class="c-main wow fadeIn">

    <el-row class="topArea wow fadeInDown" data-wow-delay="0.5s">
      <el-col :span="24">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>设备管理</el-breadcrumb-item>
          <el-breadcrumb-item>设备密码管理</el-breadcrumb-item>
        </el-breadcrumb>

      </el-col>
    </el-row>

    <div class="mainBody">

      <el-row class="headArea wow fadeInDown panelArea" data-wow-delay="0.3s">
        <el-col :span="24">
          <span class="title">设备密码管理</span>
        </el-col>
      </el-row>


      <el-row class="panelArea ">

        <el-col :span="8" :offset="12" :md="8" :lg="8" :xs="24" :sm="24">
          <el-input placeholder="请输入搜索内容" v-model="search" class="input-with-select" size="small">
            <el-select v-model="search_select" slot="prepend" placeholder="请选择........">
              <el-option label="设备名称" value="deviceName"></el-option>
              <!--<el-option label="设备类型" value="deviceTypeString"></el-option>
              <el-option label="设备位置" value="position"></el-option>
              <el-option label="设备状态" value="deviceStatus"></el-option>-->
            </el-select>
            <el-button slot="append" @click="requestApi('search')" icon="el-icon-search"></el-button>
          </el-input>
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
        <!-- :header-cell-style="{background:' #33a0d7',color:'white'}" 表格的属性 蓝色背景-->
        <el-col :span="24">
          <!--v-loading="loading"-->
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
              prop="deviceName"
              label="设备名称">
            </el-table-column>

            <el-table-column
              prop="deviceTypeString"
              width="120"
              label="设备类型">
            </el-table-column>

            <el-table-column
              prop="deviceStatus"
              width="90"
              label="设备状态">
            </el-table-column>

            <el-table-column
              prop="imei"
              width="120"
              label="IMEI值">
            </el-table-column>

            <el-table-column
              prop="password"
              width="120"
              label="设备密码">
            </el-table-column>

            <el-table-column
              width="150"
              prop="position"
              label="设备位置">
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
        <el-form-item label="设备名称" :label-width="formLabelWidth" prop="deviceName">
          <el-row>
            <el-col :span="12">
              <el-input v-model="form_user.deviceName" auto-complete="off" placeholder="（必填）"></el-input>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="设备类型" :label-width="formLabelWidth" prop="deviceTypeString">
          <el-row>
            <el-col :span="12">
              <el-input v-model="form_user.deviceTypeString" auto-complete="off" :disabled="true" placeholder="智能锁"></el-input>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="电池电量" :label-width="formLabelWidth" prop="batteryLevel">
          <el-row>
            <el-col :span="12">
              <el-input v-model="form_user.batteryLevel" auto-complete="off" :disabled="true" placeholder="100"></el-input>
            </el-col>
          </el-row>
        </el-form-item>


        <el-form-item label="设备状态" :label-width="formLabelWidth">
          <el-select v-model="form_user.deviceStatus" placeholder="请选择状态">
            <el-option label="正常" value="1"></el-option>
            <el-option label="封禁" value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="信号强度" :label-width="formLabelWidth" prop="signalLevel">
          <el-row>
            <el-col :span="12">
              <el-input v-model="form_user.signalLevel" auto-complete="off" :disabled="true" placeholder="5"></el-input>
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
        </el-form-item>


        <el-form-item label="设备位置" :label-width="formLabelWidth" prop="position">
          <el-row>
            <el-col :span="12">
              <el-input v-model="form_user.position" auto-complete="off"></el-input>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="设备密码" :label-width="formLabelWidth" prop="password">
          <el-row>
            <el-col :span="12">
              <el-input v-model="form_user.password" auto-complete="off"></el-input>
            </el-col>
          </el-row>
        </el-form-item>

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
    name: "building",
    data() {
      let checkdeviceName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('设备名称不能为空'));
        }
        if (value.length < 3 || value.length > 15) {
          return callback(new Error('设备名称长度要求3-15字符'));
        }else{
          callback();
        }
      };

      let checkremarks = (rule, value, callback) => {
        if (value.length >= 35) {
          return callback(new Error("备注内容过长"));
        }else {
          callback(); //这个会变绿
        }
      };

      let checkPassword = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('IMEI值不能为空'));
        }
        if (value.length !== 15 || isNaN(value)) {
          return callback(new Error('IMEI值格式不正确'));
        }
        else {
          callback(); //这个会变绿
        }
      };
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
          deviceName: [
            {validator: checkdeviceName, trigger: 'blur'},
          ],
          /* position: [
             {validator: checkposition, trigger: 'blur'}
           ],*/
          remarks: [
            {validator: checkremarks, trigger: 'blur'}
          ],
          imei: [
            {validator: checkPassword, trigger: 'blur'}
          ]
        },
        fromCheck1: {
          deviceName: false,
          position: false,
          remarks: false,
        },
        form_user: {
          deviceName: "",
          signalLevel: "",
          deviceTypeString: "",
          batteryLevel: "",
          deviceStatus: "1",
          position: "",
          remarks: "",
          password:"",
          imei: "",
        },//新增 和 编辑 的数据
        dialogText: "",
        search: "",//搜索框
        search_select: "deviceName",//搜索框左侧下拉数据
        tableData: [],//表单数据源
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
            deviceName: "",
            signalLevel: "",
            deviceTypeString: "",
            batteryLevel: "",
            deviceStatus: "1",
            position: "",
            remarks: "",
            password:"",
            imei: "",
          }
        } else if (type === 'edit') {
          this.action = "edit";
          this.id = data["id"];
          for (let item in data) {
            if (data.hasOwnProperty(item)) {
              this.form_user[item] = data[item];
            }
          }
          if (this.form_user.deviceStatus === "在线") {
            this.form_user.deviceStatus = "1"
          } else if (this.form_user.deviceStatus === "离线") {
            this.form_user.deviceStatus = "0"
          }
          this.form_user.imei = "";
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
              url:'/device',
              data: {
                deviceName: this.form_user.deviceName,//设备名
                imei: this.form_user.imei,//IMEI号
                deviceTypeString: this.form_user.deviceTypeString,//设备类型
                signalLevel: this.form_user.signalLevel,
                batteryLevel: this.form_user.batteryLevel,
                position: this.form_user.position,
                password: this.form_user.password,
                remarks: this.form_user.remarks,//备注
                deviceStatus: this.form_user.deviceStatus,//设备状态
              },
              headers:{
                'Authorization':'Bearer ' +sessionStorage.getItem("token")
              }
            }).then((res) => {
              if (res.status === 200) {
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
                deviceName: this.form_user.deviceName,
                imei: this.form_user.imei,
                deviceTypeString: this.form_user.deviceTypeString,
                signalLevel: this.form_user.signalLevel,
                batteryLevel: this.form_user.batteryLevel,
                position: this.form_user.position,
                password: this.form_user.password,
                remarks: this.form_user.remarks,
                deviceStatus: this.form_user.deviceStatus,
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
            // this.$axios.get("/user/getAll?pageNum=" + this.currentPage + "&pageSize=" + this.page_size).then((res) => {
            this.$axios({//查看设备列表
              method:'get',
              url:'/devicePassword/list',
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
                  if (item.deviceStatus === 1) {
                    item.deviceStatus = "在线"
                  } else if (item.deviceStatus === 0) {
                    item.deviceStatus = "离线"
                  } else {
                    item.loginTime = "暂无记录";
                  }
                  return item;
                });
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
          case "checkName":
            this.$axios.get("/user/checkName", {
              params: {
                id: this.id,
                deviceName: this.form_user.deviceName,
              }
            }).then((res) => {
              if (res.data.code === 200) {
                this.fromCheck1.deviceName = true;//验证通过
                verifyCB(this.fromCheck1.deviceName);//回调  验证
                this.form_user.hahah = "dd";
              } else if (res.data.code === 500) {
                this.fromCheck1.deviceName = false;//验证不通过
                verifyCB(this.fromCheck1.deviceName);//回调 弹出错误验证
              }
            }).catch((error) => {
              this.tips( "系统出错！","error");
              console.log(error)
            });
            break;
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
                this.tableData = list.map(function (item) {

                  if (item.deviceStatus === 1) {
                    item.deviceStatus = "在线"
                  } else if (item.deviceStatus === 0) {
                    item.deviceStatus = "离线"
                  }
                  return item;
                });
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
