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

      <el-row class="panelArea " >

        <el-col :span="18" :offset="1" :md="16" :lg="16" :xs="3" :sm="24">

          <el-cascader
            :change-on-select="true"
            :props="defaultParams"
            :options="options"
            v-model="selectedOptions"
            @change="handelChange"
            size="small"
            clearable
          ></el-cascader>

          <el-button type="primary" icon="el-icon-search" @click="onSubmit" size="small">搜索</el-button>

        </el-col>
        <el-col :span="4" :offset="3" :md="4" :lg="4" :xs="24" :sm="24"
                style="text-align: left;box-sizing: border-box;padding-left: -2%">
          <el-tooltip content="刷新" placement="top">
            <el-button type="primary" icon="el-icon-refresh" @click="refresh" size="small"
                       plain></el-button>
          </el-tooltip>

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
            style="width: 100%" >

            <el-table-column
              type="selection"
              label="全选"
              style="width: 10%"  align="center">
            </el-table-column>

            <el-table-column
              style="width: 10%"
              type="index"
              label="序号" align="center">
            </el-table-column>

            <el-table-column
              prop="buildingName"
              style="width: 15%"
              label="楼栋名称" align="center">
            </el-table-column>

            <el-table-column
              prop="floorName"
              style="width: 10%"
              label="楼层" align="center">
            </el-table-column>

            <el-table-column
              prop="roomNumber"
              style="width: 10%"
              label="房间号" align="center">
            </el-table-column>

            <el-table-column
              prop="roomCurrentHeadcount"
              style="width: 10%"
              label="房间人数" align="center">
            </el-table-column>

            <el-table-column
              prop="deviceName"
              label="设备名称"
              style="width: 15%"
              align="center">
            </el-table-column>


            <el-table-column
              style="width: 10%"
              prop="imei"
              label="IMEI值" align="center">
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


        <el-form-item label="楼栋类型" :label-width="formLabelWidth" prop="buildingType">
          <el-select v-model="form_user.buildingType" placeholder="请选择楼栋类型"  @change="selectbuildingType"  filterable allow-create>
            <el-option
              v-for="name in options"
              :key="name.name"
              :label="name.name"
              :value="name.name">
            </el-option>
          </el-select>

        </el-form-item>

        <el-form-item label="楼栋名称" :label-width="formLabelWidth" prop="buildingName">
          <el-select v-model="form_user.buildingName" placeholder="请选择楼栋名称"  @change="selectbuildingName"   filterable allow-create>
            <el-option
              v-for="(name,index) in one"
              :label="name.name"
              :value="name.name"
              :key="index">
            </el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="楼层" :label-width="formLabelWidth" prop="floorName">
          <el-select v-model="form_user.floorName" placeholder="请选择楼层"  @change="selectfloorName"   filterable allow-create>
            <el-option
              v-for="(name,index) in two"
              :label="name.name"
              :value="name.name"
              :key="index">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="房间号" :label-width="formLabelWidth" prop="roomNumber">
          <el-select v-model="form_user.roomNumber" placeholder="请选择房间号"   filterable allow-create >
            <el-option
              v-for="(name,index) in three"
              :label="name.name"
              :value="name.name"
              :key="index">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="房间名" :label-width="formLabelWidth" prop="roomName" >
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
      let checkremarks = (rule, value, callback) => {
        if (value.length >= 35) {
          return callback(new Error("备注内容过长"));
        }else {
          callback(); //这个会变绿
        }
      };

      return {
        one:[],
        two:[],
        three:[],
        vals:[],
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
        },
        fromCheck1: {
          position: false,
          remarks: false,
        },
        form_user: {
          floorName: "",
          roomNumber: "",
          roomName:"",
          buildingName: "",
          roomCurrentHeadcount: "",
          roomSharingPolicy:"",
          remarks: "",
          buildingType:""
        },//新增 和 编辑 的数据
        dialogText: "",
        search: "",//搜索框
        search_select: "deviceName",//搜索框左侧下拉数据
        tableData: [],//表单数据源

        tableChecked:[],//被选中的记录数据。。。对应“批量删除”传的参数值
        idsarr:[],//批量删除id

        options:[],
        selectedOptions: [],
        defaultParams: {
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
          this.dialogText = "新增房源";
          this.dialogFormNew = true;
          this.form_user = {
            floorName: "",
            roomNumber: "",
            roomName:"",
            buildingName: "",
            roomCurrentHeadcount: "",
            roomSharingPolicy:"",
            remarks: "",
            buildingType:""
          }
        } else if (type === 'edit') {
          this.action = "edit";
          this.id = data["id"];
          for (let item in data) {
            if (data.hasOwnProperty(item)) {
              this.form_user[item] = data[item];
            }
          }
          this.dialogText = "编辑房源信息";
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

            this.requestApi("delete");
            this.dialogVisible = false;
          }
        } else if (this.action === "add") {
          if (res === "cancel") {
            this.dialogFormNew = false;
            this.action = "";
          } else {
            console.log("新增房源");
            //首先打印一下this.$refs[formName]，检查是否拿到了正确的需要验证的form。其次在拿到了正确的form后，检查该form上添加的表单验证是否正确
            this.$refs["userForm"].validate((valid) => {
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
                roomNumber: this.form_user.roomNumber,//房间号
                roomName: this.form_user.roomName,//房间名
                floorName: this.form_user.floorName,//楼层
                buildingName: this.form_user.buildingName,//楼栋名称
                buildingType:this.form_user.buildingType,//楼栋类型
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
            this.$axios.put("/schoolRoom", {
                id: this.id,
                roomNumber: this.form_user.roomNumber,
                roomName: this.form_user.roomName,
                floorName: this.form_user.floorName,
                buildingName: this.form_user.buildingName,
                buildingType:this.form_user.buildingType,
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
              }
            }).catch((error) => {
            });
            break;
          case "delete":
            this.$axios.delete("/schoolRoom", {//删除学校设备
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
                pageNum:this.currentPage,
                pageSize:this.page_size
              }
            } ).then((res) => {
              if (res.status === 200) {
                let list = res.data.data.list;
                this.page_total = res.data.data.pageTotal;
                this.tableData = list.map(function (item) {
                  return item;
                });
               // this.tips("查看房源列表接口连接成功");
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
          this.options=res.data.data;
          console.log("2222222222222222222222222222");
          console.log("2222222222222222222222222222");
          console.log(this.options)
          console.log("3443535436356346533546576543")
        })
      },
      handelChange(value){

        this.vals=value;
        console.log(value);
        console.log(this.vals);
        console.log(this.vals[0])
      },

      onSubmit() {
        console.log("2222222222222222222222222222");
        console.log("3443535436356346533546576543")
        console.log(this.vals);
        console.log(this.vals[0])
        this.$axios({//查询
          method:'get',
          url:'/schoolRoom/list',
          headers:{
            'Authorization':'Bearer ' +sessionStorage.getItem("token")
          },
          params:{
            buildingType:this.vals[0],
            buildingName:this.vals[1],
            floorName:this.vals[2],
            roomNumber:this.vals[3],
            pageNum: this.currentPage,
            pageSize:this.page_size
          }
        } ).then((res) => {
          if (res.data.code === 0) {
            let list = res.data.data.list;
            this.page_total = res.data.data.pageTotal;
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
      },
      selectbuildingType(value){
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
        if(rows.length === 0){
          this.tips("请选择要删除的房源！", "warning");
        }else{
            _this.$confirm('是否确认此操作?', '提示', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning'
       }).then(() => {
         rows.forEach(element =>{
           console.log(element);
           idsarr.push(element.id)


           this.$axios.delete("/schoolRoom", {//删除学校设备
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
               this.tips("删除不成功！");
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
    },
    created() {
      this.requestApi("getUser");
      this.getProductType();

    }


  }
</script>

<style lang="scss" scoped media="screen">
  .c-main /deep/ .el-select .el-input {
    width: 120px;
    text-align: center;
  }

  .c-main /deep/ .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }

  .leftdiv{
    float:left;
    width:400px;
    background-color:#CC6633;
  }

  .rightdiv{
    float:right;
    width:400px;
    background-color:#CC66FF;

  }

  .centerdiv{
    float:left;
    width:50px;
    border-right: 1px dashed black;
    padding-bottom:1600px;  /*关键*/
    margin-bottom:-1600px;  /*关键*/

  }

/*  !*分辨率低于1280，采用下面的样式*!
  @media screen and (max-device-width:1280px){
    .lala{
      width: 100%;
    }
  }*/


</style>
