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

        <el-col :span="18" :offset="1" :md="16" :lg="16" :xs="3" :sm="24">

          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="设备名称">
              <el-input  placeholder="设备名称" v-model="formInline.deviceName" size="small"></el-input>
            </el-form-item>
            <el-form-item label="设备状态">
              <el-select  placeholder="设备状态" v-model="formInline.deviceStatus" size="small">
                <el-option label="正常" value="0"></el-option>
                <el-option label="不正常" value="1"></el-option>
                <el-option label="未激活" value="2"></el-option>
                <el-option label="离线" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="设备位置">
              <el-cascader
                :change-on-select="true"
                :props="formInline.defaultParams"
                :options="formInline.options"
                v-model="formInline.selectedOptions"
                @change="handelChange"
                size="small"
                clearable
              ></el-cascader>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search"  @click="onSubmit" size="small"> 搜索</el-button>
            </el-form-item>
          </el-form>
        </el-col>

        <el-col :span="4" :offset="3" :md="4" :lg="4" :xs="24" :sm="24"
                style="text-align: left;box-sizing: border-box;padding-left: 25px">
          <!--<el-tooltip content="新增" placement="top">
            <el-button type="primary" @click="openDialog('add')" icon="el-icon-plus" size="small" plain></el-button>
          </el-tooltip>-->

        </el-col>


      </el-row>

      <el-row class="panelArea">
        <el-col :span="24">
          <el-table
            :data="tableData"
            border
            style="width: 100%">

            <el-table-column
              style="width: 10%"
              type="index"
              label="序号" align="center">
            </el-table-column>

            <el-table-column
              style="width: 15%"
              prop="deviceName"
              label="设备名称" align="center">
            </el-table-column>

            <el-table-column
              prop="deviceTypeString"
              style="width: 10%"
              label="设备类型" align="center">
            </el-table-column>

            <el-table-column
              prop="deviceStatusString"
              style="width: 10%"
              label="设备状态" align="center">
            </el-table-column>

            <el-table-column
              prop="imei"
              style="width: 15%"
              label="IMEI值" align="center">
            </el-table-column>

            <el-table-column
              prop="passwordName"
              style="width: 10%"
              label="设备密码" align="center">
            </el-table-column>

            <el-table-column
              prop="devicePosition"
              style="width: 20%"
              label="设备位置" align="center">
            </el-table-column>

            <el-table-column
              align="center"
              fixed="right"
              label="操作"
              style="width: 10%">

              <template slot-scope="scope">
                <el-button @click="openDialog('edit',scope.row)" type="text" size="small">详情</el-button>
                <!--<el-button type="text" size="small" @click="openDialog('delete',scope.row)">删除</el-button>-->
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
      <el-form :model="form_user" ref="userForm" size="small">
        <el-form-item label="设备名称" :label-width="formLabelWidth" prop="deviceName">
          <el-row>
            <el-col :span="12">
              <el-input v-model="form_user.deviceName" auto-complete="off" :disabled="true"></el-input>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="设备类型" :label-width="formLabelWidth" prop="deviceTypeString">
          <el-row>
            <el-col :span="12">
              <el-input v-model="form_user.deviceTypeString" auto-complete="off" :disabled="true"></el-input>
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
          <el-select v-model="form_user.deviceStatus" placeholder="请选择状态" :disabled="true">
            <el-option label="在线" value="1"></el-option>
            <el-option label="离线" value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="信号强度" :label-width="formLabelWidth" prop="passwordName">
          <el-row>
            <el-col :span="12">
              <el-input v-model="form_user.passwordName" auto-complete="off" :disabled="true" placeholder="5"></el-input>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="IMEI值" :label-width="formLabelWidth" prop="imei">
          <el-row>
            <el-col :span="12">
              <el-input v-model="form_user.imei" auto-complete="off" :disabled="true" ></el-input>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="设备密码" :label-width="formLabelWidth" prop="passwordName">
          <el-row>
            <el-col :span="12">
              <el-input v-model="form_user.passwordName" auto-complete="off" :disabled="true" ></el-input>
            </el-col>
          </el-row>
        </el-form-item>


        <el-form-item label="设备位置" :label-width="formLabelWidth" prop="position">
          <el-row>
            <el-col :span="12">
              <el-input v-model="form_user.position" auto-complete="off" :disabled="true"></el-input>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="备注" :label-width="formLabelWidth" prop="remarks">
          <el-row>
            <el-col :span="12">
              <el-input type="textarea" v-model="form_user.remarks" :disabled="true"></el-input>
            </el-col>
          </el-row>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
      <!--  <el-button @click="dialogConfirm('cancel')">取 消</el-button>-->
        <el-button type="primary" @click="dialogConfirm('confirm')">确 定</el-button>
      </div>
    </el-dialog>

  </div>

</template>

<script>
  export default {
    name: "devicePassword",
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
          passwordName: "",
          deviceTypeString: "",
          batteryLevel: "",
          deviceStatus: "1",
          position: "",
          remarks: "",
          imei: "",
          passwordName:""
        },//新增 和 编辑 的数据

        dialogText: "",
        search: "",//搜索框
        search_select: "deviceName",//搜索框左侧下拉数据

        tableData: [],//表单数据源


//查询
        //查询
        vals:[],
        formInline: {
          options:[],
          selectedOptions: [],
          defaultParams: {
            label: 'name',
            value: 'name',
            children: 'children'
          },

        },
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
        if (type === 'edit') {
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
          this.dialogText = "查看设备信息";
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
         if (this.action === "edit") {
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
                deviceTypeString: this.form_user.deviceTypeString,
                passwordName: this.form_user.passwordName,
                batteryLevel: this.form_user.batteryLevel,
                position: this.form_user.position,
                remarks: this.form_user.remarks,
                deviceStatus: this.form_user.deviceStatus,
              },
              {
                headers:{
                  'Authorization':'Bearer ' +sessionStorage.getItem("token")
                }
              }).then((res) => {
              if (res.data.code === 0) {
               // this.tips("更新成功！","success");
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

            this.$axios({//查看设备列表
              method:'get',
              url:'/devicePassword/list',
              headers:{
                'Authorization':'Bearer ' +sessionStorage.getItem("token")
              },
              params:{
                pageNum:this.currentPage,
                pageSize:this.page_size,
              }
            } ).then((res) => {
              if (res.data.code === 0) {
                let list = res.data.data.list;
                this.page_total = res.data.data.pageTotal;
                if(list === null){
                  this.tips("暂无数据");
                  this.tableData = null;
                }else{
                  this.tableData = list;
                }

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

        }
      },
      handelChange(value){

        this.vals=value;
        console.log(value);
        console.log(this.vals);
        console.log(this.vals[0])
      },
      onSubmit() {
        this.$axios({//查询
          method:'get',
          url:'/devicePassword/list',
          headers:{
            'Authorization':'Bearer ' +sessionStorage.getItem("token")
          },
          params:{
            pageNum:this.currentPage,
            pageSize:this.page_size,
            deviceName: this.formInline.deviceName,
            devicePosition: this.formInline.devicePosition,
            deviceStatus: this.formInline.deviceStatus,
            buildingType:this.vals[0],
            buildingName:this.vals[1],
            floorName:this.vals[2],
            roomNumber:this.vals[3],
          }
        } ).then((res) => {
          if (res.data.code === 0) {
            let list = res.data.data.list;
            this.page_total = res.data.data.pageTotal;
            if(list === null){
              this.tips("暂无数据");
              this.tableData = null;
            }else{
              this.tableData = list;/*.map(function (item) {
                if (item.deviceStatus === 1) {
                  item.deviceStatus = "在线"
                } else if (item.deviceStatus === 0) {
                  item.deviceStatus = "离线"
                } else {
                  item.loginTime = "暂无记录";
                }
                return item;
              });*/
            }

          } else {
            this.tips(res.data.message,"warning");
          }
          this.loading = false;
        }).catch((error) => {
          this.tips( "系统出错！","error");
          console.log(error);
          this.loading = false;
        });
      },
      // 从后台获取数据
      getProductType(){
        this.$axios({//查看三级查询列表
          method:'get',
          url:'/schoolRoom/roomPositionList',
          headers:{
            'Authorization':'Bearer ' +sessionStorage.getItem("token")
          },
          params:{
            pageNum:this.currentPage
          }
        } ).then((res) => {

          console.log(res.data.data)
          this.formInline.options=res.data.data;
          console.log("2222222222222222222222222222");
          console.log("2222222222222222222222222222");
          console.log(this.options)
          console.log("3443535436356346533546576543")
        })
      },
    }, created() {
      this.requestApi("getUser");
      this.getProductType();
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
