<template>
  <div class="c-main wow fadeIn">

    <el-row class="topArea wow fadeInDown" data-wow-delay="0.5s">
      <el-col :span="24">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>报表中心</el-breadcrumb-item>
          <el-breadcrumb-item>报警记录</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>

    <div class="mainBody">

      <el-row class="headArea wow fadeInDown panelArea" data-wow-delay="0.3s">
        <el-col :span="24">
          <span class="title">报警记录</span>
        </el-col>
      </el-row>

      <el-row class="panelArea ">

        <el-col :span="18" :offset="1" :md="16" :lg="16" :xs="3" :sm="24">

          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="设备名称">
              <el-input  placeholder="设备名称" v-model="formInline.deviceName" size="small"></el-input>
            </el-form-item>
            <el-form-item label="报警时间">
            <el-date-picker
              type="datetimerange"
              size="small"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit"> 查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>

        <el-col :span="4" :offset="3" :md="4" :lg="4" :xs="24" :sm="24"
                style="text-align: left;box-sizing: border-box;padding-left: 25px">
          <el-tooltip content="导出报表" placement="top">
            <el-button type="primary"  icon="el-icon-download" size="small" plain></el-button>
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
              prop="deviceName"
              label="设备名称">
            </el-table-column>

            <el-table-column
              width="150"
              prop="position"
              label="设备位置">
            </el-table-column>

            <el-table-column
              prop="alarmdeviceTypeName"
              width="120"
              label="报警类型">
            </el-table-column>

            <el-table-column
              prop="createTime"
              width="90"
              label="报警时间">
            </el-table-column>

            <el-table-column
              prop="handlerId"
              width="120"
              label="处理人员">
            </el-table-column>

            <el-table-column
              prop="handleStatusString"
              width="120"
              label="处理情况">
            </el-table-column>

            <el-table-column
              align="center"
              fixed="right"
              label="操作"
              width="100">

              <template slot-scope="scope">
                <el-button @click="openDialog('edit',scope.row)" type="text" size="small">详情</el-button>
              <!--  <el-button type="text" size="small" @click="openDialog('delete',scope.row)">删除</el-button>-->
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

  <!--  <el-dialog
      :append-to-body="true"
      title="删除设备"
      :visible.sync="dialogVisible"
      width="30%">
      <span>{{this.dialogText}}</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogConfirm('cancel')">取 消</el-button>
    <el-button type="primary" @click="dialogConfirm('confirm')">确 定</el-button>
  </span>
    </el-dialog>-->


    <el-dialog :append-to-body="true" :title="this.dialogText" @close="closeUserDialog" :visible.sync="dialogFormNew">
      <el-form :model="form_user" ref="userForm"  size="small">
        <el-form-item label="设备名称" :label-width="formLabelWidth" prop="deviceName">
          <el-row>
            <el-col :span="12">
              <el-input v-model="form_user.deviceName" auto-complete="off" ></el-input>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="设备类型" :label-width="formLabelWidth" prop="deviceTypeName">
          <el-row>
            <el-col :span="12">
              <el-input v-model="form_user.deviceTypeName" auto-complete="off" :disabled="true"></el-input>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="电池电量" :label-width="formLabelWidth" prop="batteryLevel">
          <el-row>
            <el-col :span="12">
              <el-input v-model="form_user.batteryLevel" auto-complete="off" :disabled="true"></el-input>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="设备状态" :label-width="formLabelWidth">
          <el-select v-model="form_user.deviceStatus" placeholder="请选择状态">
            <el-option label="在线" value="1"></el-option>
            <el-option label="离线" value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="IMEI值" :label-width="formLabelWidth" prop="imei">
          <el-row>
            <el-col :span="12">
              <el-input v-model="form_user.imei" auto-complete="off" :disabled="true"></el-input>
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

        <el-form-item label="报警类型" :label-width="formLabelWidth" prop="alarmdeviceTypeName">
          <el-row>
            <el-col :span="12">
              <el-input v-model="form_user.alarmdeviceTypeName" auto-complete="off" :disabled="true" ></el-input>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="报警时间" :label-width="formLabelWidth" prop="createTime">
          <el-row>
            <el-col :span="12">
              <el-input v-model="form_user.createTime" auto-complete="off" :disabled="true" ></el-input>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="处理人员" :label-width="formLabelWidth" prop="handlerId">
          <el-row>
            <el-col :span="12">
              <el-input v-model="form_user.handlerId" auto-complete="off" :disabled="true" ></el-input>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="处理情况" :label-width="formLabelWidth" prop="handleStatusString">
          <el-row>
            <el-col :span="12">
              <el-input v-model="form_user.handleStatusString" auto-complete="off" :disabled="true" ></el-input>
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
    name: "newsCatalogue",
    data() {
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
        form_user: {
          deviceName: "",
          handleStatusString: "",
          alarmdeviceTypeName: "",
          handlerId: "",
          createTime: "1",
          position: "",
          imei: "",
        },//新增 和 编辑 的数据

        dialogText: "",

        search: "",//搜索框
        search_select: "deviceName",//搜索框左侧下拉数据

        tableData: [],//表单数据源


//查询
        formInline: {
          deviceName: '',
          value2: ''
        }
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
        /*if (type === 'delete') {
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
            handleStatusString: "",
            alarmdeviceTypeName: "",
            handlerId: "",
            createTime: "1",
            position: "",
            remarks: "",
            imei: "",
          }
        } else*/ if (type === 'edit') {
          this.action = "edit";
          this.id = data["id"];
          for (let item in data) {
            if (data.hasOwnProperty(item)) {
              this.form_user[item] = data[item];
            }
          }
          if (this.form_user.createTime === "在线") {
            this.form_user.createTime = "1"
          } else if (this.form_user.createTime === "离线") {
            this.form_user.createTime = "0"
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
       /* if (this.action === "delete") {
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
        } else*/ if (this.action === "edit") {
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
      requestApi(action, verifyCB) {

        switch (action) {
          case "edit":
            this.$axios.put("/device", {
                id: this.id,
                deviceName: this.form_user.deviceName,
                imei: this.form_user.imei,
                alarmdeviceTypeName: this.form_user.alarmdeviceTypeName,
                handleStatusString: this.form_user.handleStatusString,
                handlerId: this.form_user.handlerId,
                position: this.form_user.position,
                createTime: this.form_user.createTime,
              },
              {
                headers:{
                  'Authorization':'Bearer ' +sessionStorage.getItem("token")
                }
              }).then((res) => {
              if (res.data.code === 0) {
                this.tips("更新成功！","success");
                this.requestApi("getUser")
              } else {
                this.tips(res.data.message,"warning");
                // this.tips("更新失败！");
              }
            }).catch((error) => {
            });
            break;

          case "getUser":
            if (this.search !=="") {
              this.requestApi("search");//如果搜索框内有参数， 就执行搜索 接口
              return;
            }
            this.loading = true;
            this.$axios({//查看学校设备列表
              method:'get',
              url:'/device/alarm/list',
              headers:{
                'Authorization':'Bearer ' +sessionStorage.getItem("token")
              },
              params:{
                pageNum:this.currentPage
              }
            } ).then((res) => {
              if (res.data.code === 0) {
                let list = res.data.data.list;
                this.page_total = res.data.data.pageSum;
                this.tableData = list.map(function (item) {
                  if (item.createTime === 1) {
                    item.createTime = "在线"
                  } else if (item.createTime === 0) {
                    item.createTime = "离线"
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

                  if (item.createTime === 1) {
                    item.createTime = "在线"
                  } else if (item.createTime === 0) {
                    item.createTime = "离线"
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

      onSubmit() {
        this.$axios({//查询
          method:'get',
          url:'/device/list',
          headers:{
            'Authorization':'Bearer ' +sessionStorage.getItem("token")
          },
          params:{
            pageNum:this.currentPage,
            deviceName: this.formInline.deviceName,
            alarmdeviceTypeName: this.formInline.alarmdeviceTypeName,
            createTime: this.formInline.createTime
          }
        } ).then((res) => {
          if (res.data.code === 0) {
            let list = res.data.data.list;
            this.page_total = res.data.data.pageSum;
            this.tableData = list.map(function (item) {
              if (item.createTime === 1) {
                item.createTime = "在线"
              } else if (item.createTime === 0) {
                item.createTime = "离线"
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
      }
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
