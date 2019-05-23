<template>
  <div class="c-main wow fadeIn">

    <el-row class="topArea wow fadeInDown" data-wow-delay="0.5s">
      <el-col :span="24">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>设备管理</el-breadcrumb-item>
          <el-breadcrumb-item>智能锁</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>

    <div class="mainBody">

      <el-row class="headArea wow fadeInDown panelArea" data-wow-delay="0.3s">
        <el-col :span="24">
          <span class="title">智能锁</span>
        </el-col>
      </el-row>

      <el-row class="panelArea ">
        <el-col :span="18" :offset="1" :md="16" :lg="16" :xs="3" :sm="24">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="设备名称">
              <el-input  placeholder="设备名称" v-model="formInline.deviceName" size="small"></el-input>
            </el-form-item>
            <el-form-item label="设备类型">
              <el-select  placeholder="设备类型" v-model="formInline.deviceTypeString" size="small">
                <el-option label="智能锁" value="shanghai"></el-option>
                <!--<el-option label="智能锁2" value="beijing"></el-option>-->
              </el-select>
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
                :props="defaultParams1"
                :options="options1"
                v-model="selectedOptions1"
                @change="handelChange1"
                size="small"
                clearable
              ></el-cascader>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search"  @click="onSubmit"  size="small"> 搜索</el-button>
            </el-form-item>
          </el-form>
        </el-col>

        <el-col :span="4" :offset="3" :md="4" :lg="4" :xs="24" :sm="24"
                style="text-align: left;box-sizing: border-box;padding-left: 25px">
          <el-tooltip content="新增" placement="top">
            <el-button type="primary" @click="openDialog('add')" icon="el-icon-plus" size="small" plain></el-button>
          </el-tooltip>
          <el-tooltip content="批量删除" placement="top" >

            <el-button type="primary" @click="batchDelete(tableChecked)" icon="el-icon-delete" size="small" plain></el-button>

          </el-tooltip>
        </el-col>


      </el-row>

      <el-row class="panelArea">
        <el-col :span="24">
          <el-table
            :data="tableData"
            @selection-change="handleSelectionChange"
            border
            style="width: 100%">

            <el-table-column
              type="selection"
              label="全选"
              style="width: 10%">
            </el-table-column>

            <el-table-column
              style="width: 10%"
              type="index"
              label="序号" align="center">
            </el-table-column>

            <el-table-column
              prop="deviceName"
              style="width: 15%"
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
              prop="batteryLevel"
              style="width: 10%"
              label="电池电量" align="center">
            </el-table-column>

            <el-table-column
              prop="signalLevel"
              style="width: 10%"
              label="信号强度" align="center">
            </el-table-column>

            <el-table-column
              prop="devicePosition"
              style="width: 15%"
              label="设备位置" align="center">
            </el-table-column>

            <el-table-column
              align="center"
              fixed="right"
              label="操作"
              style="width: 10%">

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
              <el-input v-model="form_user.deviceName" auto-complete="off" ></el-input>
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
              <el-input v-model="form_user.batteryLevel" auto-complete="off" :disabled="true"></el-input>
            </el-col>
          </el-row>
        </el-form-item>


        <el-form-item label="设备状态" :label-width="formLabelWidth">
          <el-select v-model="form_user.deviceStatus" placeholder="请选择状态"  :disabled="true">
            <el-option label="在线" value="1"></el-option>
            <el-option label="离线" value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="信号强度" :label-width="formLabelWidth" prop="signalLevel">
          <el-row>
            <el-col :span="12">
              <el-input v-model="form_user.signalLevel" auto-complete="off" :disabled="true"></el-input>
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
        <el-form-item v-if="this.action==='edit'" label="IMEI值"  prop="imei" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="12">
              <el-input v-model="form_user.imei"  auto-complete="off"  :disabled="true"></el-input>
            </el-col>
          </el-row>
        </el-form-item>


       <!-- <el-form-item label="设备位置" :label-width="formLabelWidth" prop="position" v-model="form_user.position">
          <el-row>
            <el-col :span="12">
              <el-input v-model="form_user.position" auto-complete="off"></el-input>
            </el-col>
          </el-row>
        </el-form-item>-->

        <el-form-item label="设备位置" :label-width="formLabelWidth" prop="schoolAddress">
          <el-row>

            <el-cascader
              :change-on-select="true"
              :props="defaultParams2"
              :options="options2"
              v-model="selectedOptions2"
              @change="handelChange2"
              size="small"
              clearable
            ></el-cascader>

          </el-row>
        </el-form-item>


      <!--  <el-form-item label="楼栋类型" :label-width="formLabelWidth" prop="buildingType">
          <el-select v-model="form_user.buildingType" placeholder="请选择楼栋类型"  @change="selectbuildingType">
            <el-option
              v-for="name in options"
              :key="name.name"
              :label="name.name"
              :value="name.name">
            </el-option>
          </el-select>

        </el-form-item>-->

     <!--   <el-form-item label="楼栋名称" :label-width="formLabelWidth" prop="buildingName">
          <el-select v-model="form_user.buildingName" placeholder="请选择楼栋名称"  @change="selectbuildingName" >
            <el-option
              v-for="(name,index) in one"
              :label="name.name"
              :value="name.name"
              :key="index">
            </el-option>
          </el-select>
        </el-form-item>-->

        <!--<el-form-item label="楼层" :label-width="formLabelWidth" prop="floorName">
          <el-select v-model="form_user.floorName" placeholder="请选择楼层"  @change="selectfloorName" >
            <el-option
              v-for="(name,index) in two"
              :label="name.name"
              :value="name.name"
              :key="index">
            </el-option>
          </el-select>
        </el-form-item>-->

  <!--      <el-form-item label="房间号" :label-width="formLabelWidth" prop="roomNumber">
          <el-select v-model="form_user.roomNumber" placeholder="请选择房间号" >
            <el-option
              v-for="(name,index) in three"
              :label="name.name"
              :value="name.name"
              :key="index">
            </el-option>
          </el-select>
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
    name: "device",
    data() {
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
          remarks: [
            {validator: checkremarks, trigger: 'blur'}
          ],
          imei: [
            {validator: checkPassword, trigger: 'blur'}
          ]
        },
        form_user: {
          deviceName: "",
          signalLevel: "",
          deviceTypeString: "",
          batteryLevel: "",
          deviceStatus: "",
          position: "",
          remarks: "",
          imei: "",
        },//新增 和 编辑 的数据

        dialogText: "",
        search: "",//搜索框
        search_select: "deviceName",//搜索框左侧下拉数据
        tableData: [],//表单数据源

        tableChecked:[],//被选中的记录数据。。。对应“批量删除”传的参数值
        idsarr:[],//批量删除id

//查询
        formInline: {
          deviceName: '',
          deviceTypeString: '',
          deviceStatus:''
        },

        one:[],
        two:[],
        three:[],
/*新增和编辑*/
        vals2:[],
        options2:[],
        selectedOptions2: [],
        defaultParams2: {
          label: 'name',
          value: 'id',
          children: 'children'
        },
        /*页面查询*/
        vals1:[],
        options1:[],
        selectedOptions1: [],
        defaultParams1: {
          label: 'name',
          value: 'name',
          children: 'children'
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
            deviceStatus: "",
            position: "",
            remarks: "",
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
          // this.form_user.imei = "";
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
      requestApi(action, verifyCB) {

        switch (action) {
          case "add":
            let k = this.vals2.length - 1;
            if(this.vals2[k] === 0){
              this.tips('没选中学生房间号',"error");
            }else{
              this.$axios({
                method:'post',
                url:'/device',
                data: {
                  deviceName: this.form_user.deviceName,//设备名
                  imei: this.form_user.imei,//IMEI号
                //  deviceTypeString: this.form_user.deviceTypeString,//设备类型
                 /* signalLevel: this.form_user.signalLevel,
                  batteryLevel: this.form_user.batteryLevel,*/
                  /*position: this.form_user.position,*/
                  remarks: this.form_user.remarks,//备注
                 // deviceStatus: this.form_user.deviceStatus,//设备状态
                  devicePositionId:this.vals2[3],//设备位置，此处传的是最后一层的id
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

            }

            break;
          case "edit":
            this.$axios.put("/device", {
                id: this.id,
                deviceName: this.form_user.deviceName,
                imei: this.form_user.imei,
                deviceTypeString: this.form_user.deviceTypeString,
                signalLevel: this.form_user.signalLevel,
                batteryLevel: this.form_user.batteryLevel,
               /* devicePosition: this.form_user.devicePosition,*/
                remarks: this.form_user.remarks,
                deviceStatus: this.form_user.deviceStatus,
                devicePositionId:this.vals2[3],
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
          case "delete":
            this.$axios.delete("/device", {//单个删除学校设备
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
            this.$axios({//查看学校设备列表
              method:'get',
              url:'/device/list',
              headers:{
                'Authorization':'Bearer ' +sessionStorage.getItem("token")
              },
              params:{
                pageNum:this.currentPage,
                pageSize:this.page_size
              }
            } ).then((res) => {
              if (res.data.code === 0) {
                let list = res.data.data.list;
                this.page_total = res.data.data.pageTotal;
                if (list === null){
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
      onSubmit() {
        console.log("11111111111");
        console.log(this.vals1[0]);

        console.log("22222222222");
        console.log(this.vals1[1]);
        console.log("333333333333");
        console.log(this.vals1[2]);
        console.log("4444444444444444");
        console.log(this.vals1[3]);
        this.$axios({//查询
          method:'get',
          url:'/device/list',
          headers:{
            'Authorization':'Bearer ' +sessionStorage.getItem("token")
          },
          params:{
            pageNum:this.currentPage,
            pageSize:this.page_size,
            deviceName: this.formInline.deviceName,//设备名
            deviceTypeString: this.formInline.deviceTypeString,//设备类型
            deviceStatus: this.formInline.deviceStatus,//设备状态
            buildingType:this.vals1[0],
            buildingName:this.vals1[1],
            floorName:this.vals1[2],
            roomNumber:this.vals1[3],
          }
        } ).then((res) => {

          if (res.data.code === 0) {
              let list = res.data.data.list;
              this.page_total = res.data.data.pageTotal;
                if (list === null){
                  this.tips("暂无数据");
                  this.tableData = null;
                }else{
                    this.tableData = list;/*.map(function (item) {
                    if (item.deviceStatus === 1) {
                      item.deviceStatus = "在线"
                    } else if (item.deviceStatus === 0) {
                      item.deviceStatus = "离线"
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
      handleSelectionChange(val){
        console.log("handleSelectionChange--",val)
        this.tableChecked = val
      },
      //批量删除
      batchDelete(rows){
        console.log("rows&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
        console.log(rows);
        var _this = this;
        var idsarr = [];
        if(rows.length === 0 ){
          this.tips("请选择要删除的设备！", "warning");
        }else{
            _this.$confirm('是否确认此操作?', '提示', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning'
       }).then(() => {
         rows.forEach(element =>{
           console.log(element);
           idsarr.push(element.id)


           this.$axios.delete("/device", {//删除学校设备
             params: {
               ids: element.id
             },
             headers: {
               'Authorization': 'Bearer ' + sessionStorage.getItem("token")
             }
           }).then((res) => {
             if (res.data.code === 0) {
               this.tips("删除成功！", "success");
               this.requestApi("getUser")
             } else {
               this.tips(res.data.message, "warning");
               this.tips("删除no成功！");
             }
           })
         })
       }).catch(() => {
         this.$message({
           type: 'info',
           message: '已取消'
         });
       });
        }

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
        /*  res.data= {//逗我呢哥，你id都是0  后台只让我给他传最里层的Id  最里边的Id不是0，还好你不是建筑商，不然我只让你给我盖20楼以上的，20楼以下的不要哈哈，写死id试试
            "code": 0,
            "message": "成功",
            "data": [{
              "name": "上海科技大学",
              "children": [{
                "name": "体育馆",
                "children": [{"name": "2楼", "children": [{"id": 9981491283427328, "name": "201"}], "id": 16}],
                "id": "0"
              }, {
                "name": "学生会",
                "children": [{"name": "4楼", "children": [{"id": 9983288131649536, "name": "411"}], "id": 15}],
                "id": 1
              }, {
                "name": "实验楼B2",
                "children": [{"name": "3楼", "children": [{"id": 9982316927975424, "name": "205"}], "id": 14}],
                "id": 2
              }, {
                "name": "宿舍楼S3",
                "children": [{"name": "6楼", "children": [{"id": 9982797993672704, "name": "610"}], "id": 13}],
                "id": 3
              }, {
                "name": "教学楼A1",
                "children": [{"name": "3楼", "children": [{"id": 9981858649931776, "name": "301"}], "id":12}],
                "id": 0
              }, {
                "name": "教学楼A5",
                "children": [{"name": "5楼", "children": [{"id": 9982120714240000, "name": "502"}], "id": 11}],
                "id": 4
              }, {
                "name": "职工宿舍楼",
                "children": [{"name": "7楼", "children": [{"id": 9983480679563264, "name": "705"}], "id": 10}],
                "id": 5
              }],
              "id": 6
            }, {
              "name": "上海科技大学体育馆",
              "children": [{
                "name": "体育馆游泳池",
                "children": [{"name": "1楼", "children": [{"id": 9981160822603776, "name": "101"}], "id": 9}],
                "id": 7
              }],
              "id": 8
            }]
          };*/
          console.log(res.data.data)
          this.options2=res.data.data;
          this.options1=res.data.data;
          console.log("2222222222222222222222222222");
          console.log("2222222222222222222222222222");
          console.log(this.options2)
          console.log(this.options1)
          console.log("3443535436356346533546576543")
        })
      },
      handelChange2(value){

        this.vals2=value;
        console.log(value);
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
        console.log(this.vals2);
        console.log(this.vals2[3])
      },
      handelChange1(value){

        this.vals1=value;
        console.log(value);
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
        console.log(this.vals1);
        console.log(this.vals1[3])
      },
   /*   selectbuildingType(value){
        for(var i=0;i<this.options.length;i++){
          if(value === this.options[i].name){
            this.one = this.options[i].children;
          }
        }
        console.log(this.one)
      },
      selectbuildingName(value){
        for(var i=0;i<this.one.length;i++){
          if(value === this.one[i].name){
            this.two = this.one[i].children;
          }
        }
      },
      selectfloorName(value){
        for(var i=0;i<this.two.length;i++){
          if(value === this.two[i].name){
            this.three = this.two[i].children;
          }
        }
      },*/

    },
    created() {

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
