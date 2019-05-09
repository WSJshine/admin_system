<template>
  <div class="c-main wow fadeIn">

    <el-row class="topArea wow fadeInDown" data-wow-delay="0.5s">
      <el-col :span="24">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>人员管理</el-breadcrumb-item>
          <el-breadcrumb-item>学生</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>

    <div class="mainBody">

      <el-row class="headArea wow fadeInDown panelArea" data-wow-delay="0.3s">
        <el-col :span="24">
          <span class="title">学生</span>
        </el-col>
      </el-row>

      <el-row class="panelArea ">

        <el-col :span="18" :offset="1" :md="16" :lg="16" :xs="3" :sm="24">

          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="姓名">
              <el-input  placeholder="姓名" v-model="formInline.name" size="small"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-select  placeholder="性别" v-model="formInline.gender" size="small">
                <el-option label="未知" value="0"></el-option>
                <el-option label="男" value="1"></el-option>
                <el-option label="女" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="联系方式">
              <el-input  placeholder="联系方式" v-model="formInline.phoneNumber" size="small"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit"> 查询</el-button>
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
          <el-tooltip content="导出报表" placement="top">
            <el-button type="primary"  icon="el-icon-download" size="small" plain></el-button>
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
              width="55">
            </el-table-column>

            <el-table-column
              width="50"
              type="index"
              label="序号">
            </el-table-column>

            <el-table-column
              label="头像" align="center" width="180">
              <template slot-scope="scope">
                <img :src="scope.row.avatarUrl" width="40" height="40" class="head_pic"/>
              </template>
            </el-table-column>

            <el-table-column
              prop="name"
              label="姓名" align="center" width="150">
            </el-table-column>

            <el-table-column
              prop="gender"
              width="120"
              label="性别" align="center">
            </el-table-column>

            <el-table-column
              prop="age"
              width="90"
              label="年龄" align="center">
            </el-table-column>

            <el-table-column
              width="150"
              prop="position"
              label="职位" align="center">
            </el-table-column>

            <el-table-column
              prop="phoneNumber"
              width="180"
              label="联系方式" align="center">
            </el-table-column>

            <el-table-column
              prop="schoolAddress"
              label="宿舍号" align="center">
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
      title="删除学生"
      :visible.sync="dialogVisible"
      width="30%">
      <span>{{this.dialogText}}</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogConfirm('cancel')">取 消</el-button>
    <el-button type="primary" @click="dialogConfirm('confirm')">确 定</el-button>
  </span>
    </el-dialog>


    <el-dialog :append-to-body="true" :title="this.dialogText" @close="closeUserDialog" :visible.sync="dialogFormNew">
      <el-form :model="form_user" ref="userForm" :rules="formRulers" size="small" enctype="multipart/form-data">

        <el-form-item label="头像" :label-width="formLabelWidth" prop="avatarUrl">
          <el-upload
            class="avatar-uploader"
            action="https://school.tcsmart.com.cn/api/web/school/file"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>

        </el-form-item>

        <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
          <el-row>
            <el-col :span="12">
              <el-input v-model="form_user.name" auto-complete="off" ></el-input>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="年龄" :label-width="formLabelWidth" prop="age">
          <el-row>
            <el-col :span="12">
              <el-input v-model="form_user.age" auto-complete="off"  placeholder="请输入学生年龄"></el-input>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-select v-model="form_user.gender" placeholder="请选择性别">
            <el-option label="未知" value="0"></el-option>
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="宿舍号" :label-width="formLabelWidth" prop="schoolAddress">
          <el-row>

            <el-cascader
              :change-on-select="true"
              :props="defaultParams"
              :options="options"
              v-model="selectedOptions"
              @change="handelChange"
            ></el-cascader>
          </el-row>
        </el-form-item>




        <el-form-item label="联系方式" :label-width="formLabelWidth" prop="phoneNumber">
          <el-row>
            <el-col :span="12">
              <el-input v-model="form_user.phoneNumber" auto-complete="off"  ></el-input>
            </el-col>
          </el-row>
        </el-form-item>


        <el-form-item label="职位" :label-width="formLabelWidth" prop="position">
          <el-row>
            <el-col :span="12">
              <el-input v-model="form_user.position" auto-complete="off"></el-input>
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
    name: "student",
    data() {


      let checkremarks = (rule, value, callback) => {
        if (value.length >= 35) {
          return callback(new Error("备注内容过长"));
        }else {
          callback(); //这个会变绿
        }
      };

      return {
        iurl:'',
        imageUrl: '',
        avatarUrl:'',//头像地址

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
          ]
        },
        form_user: {
          name: "",
          phoneNumber: "",
          gender: "",
          schoolAddress: "",
          age: "",
          position: "",
          remarks: "",
          imei: "",
          file:""
        },//新增 和 编辑 的数据

        dialogText: "",

        search: "",//搜索框
        search_select: "name",//搜索框左侧下拉数据

        tableData: [],//表单数据源

        tableChecked:[],//被选中的记录数据。。。对应“批量删除”传的参数值
        idsarr:[],//批量删除id

//查询
        formInline: {
          name: '',
          gender: '',
          phoneNumber:''
        },

//新增编辑三级下拉选
        options:[],
        selectedOptions: [],
        defaultParams: {
          label: 'name',
          value: 'id',
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
          this.dialogText = "确认删除该学生吗？"
        } else if (type === 'add') {
          this.id = "";
          this.action = "add";
          this.dialogText = "新增学生";
          this.dialogFormNew = true;
          this.form_user = {
            name: "",
            phoneNumber: "",
            gender: "",
           schoolAddress: "",
            age: "",
            position: "",
            remarks: "",
            file:""
          }
        } else if (type === 'edit') {
          this.action = "edit";
          this.id = data["id"];
          for (let item in data) {
            if (data.hasOwnProperty(item)) {
              this.form_user[item] = data[item];
            }
          }
          if (this.form_user.gender === "男") {
            this.form_user.gender = "1"
          } else if (this.form_user.gender === "女") {
            this.form_user.gender = "2"
          }else if (this.form_user.gender === "未知") {
            this.form_user.gender = "0"
          }
          this.dialogText = "编辑学生信息";
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
            console.log("删除学生11111");
            console.log("删除学生", this.id);
            console.log("删除学生222222222");
            this.requestApi("delete");
            this.dialogVisible = false;
          }
        } else if (this.action === "add") {
          if (res === "cancel") {
            this.dialogFormNew = false;
            this.action = "";
          } else {
            console.log("新增学生");
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
            console.log("保存编辑的学生信息");
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
            let k = this.vals.length - 1;
            if(this.vals[k] === 0){
              this.tips('没选中学生房间号',"error");
            }else{
              let that = this;
              this.$axios({
                method:'post',
                url:'/schoolBasicPersonnelInfo',
                data: {
                  avatarUrl:that.imgId.fileUrlPath,
                  name: this.form_user.name,//姓名
                  gender: this.form_user.gender,//性别
                  phoneNumber: this.form_user.phoneNumber,//联系电话
                  schoolAddress: this.form_user.schoolAddress,
                  position: this.form_user.position,//职位
                  remarks: this.form_user.remarks,//备注
                  age: this.form_user.age,//年龄
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
            this.$axios.put("/schoolBasicPersonnelInfo", {
                avatarUrl:that.imgId.fileUrlPath,
                id: this.id,
                name: this.form_user.name,//姓名
                gender: this.form_user.gender,//性别
                phoneNumber: this.form_user.phoneNumber,//联系电话
                schoolAddress: this.form_user.schoolAddress,//房间号
                position: this.form_user.position,//职位
                remarks: this.form_user.remarks,//备注
                age: this.form_user.age,//年龄
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
              }
            }).catch((error) => {
            });
            break;
          case "delete":
            this.$axios.delete("/schoolBasicPersonnelInfo", {//删除学生
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
            this.$axios({//查看学生列表
              method:'get',
              url:'/schoolBasicPersonnelInfo/list',
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
                  if (item.gender === 1) {
                    item.gender = "男"
                  } else if (item.gender === 2) {
                    item.gender = "女"
                  } else {
                    item.gender = "未知";
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

        }
      },

      onSubmit() {
        this.$axios({//查询
          method:'get',
          url:'/schoolBasicPersonnelInfo/list',
          headers:{
            'Authorization':'Bearer ' +sessionStorage.getItem("token")
          },
          params:{
            pageNum:this.currentPage,
            name: this.formInline.name,
            gender: this.formInline.gender,
            phoneNumber: this.formInline.phoneNumber
          }
        } ).then((res) => {
          if (res.data.code === 0) {
            let list = res.data.data.list;
            this.page_total = res.data.data.pageSum;
            this.tableData = list.map(function (item) {
              if (item.gender === 1) {
                item.gender = "男"
              } else if (item.gender === 2) {
                item.gender = "女"
              } else {
                item.gender = "未知";
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
//头像上传
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) { //上传前的函数
        //上传前对图片类型和大小进行判断
        const isJPG = file.type === 'image/jpeg'||file.type === 'image/png';

        const isLt10M = file.size / 1024 / 1024 <10;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG或png 格式!');
        }
        if (!isLt10M) {
          this.$message.error('上传头像图片大小不能超过 10MB!');
        }
        //校验成功上传文件
        if(isJPG && isLt10M == true){
          console.log(file);
          console.log("file");
          //将文件转化为formdata数据上传
          let fd = new FormData()
          fd.append('file', file)
          console.log("fd")
          console.log(fd)
          // post上传图片

          let that = this

          new Promise(function (resolve, reject) {
            that.$axios.post('/file', fd,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  'Authorization':'Bearer ' +sessionStorage.getItem("token")
                }
              }).then((response) => {
              that.imgId = response.data.data
              console.log("imgId")
              console.log(that.imgId)
              resolve(that.imgId);

            }).catch((error) =>{
              this.tips('头像上传失败，请重新上传!',"error");
            })
          })

        }
        return isJPG && isLt10M;

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
        console.log(this.vals[3])

      },


      handleSelectionChange(val){
        console.log("handleSelectionChange--",val)
        this.tableChecked = val
      },
      //批量删除
      batchDelete(rows){
        console.log(rows);
        var _this = this;
        var idsarr = [];
        if(rows.length === 0){
          this.tips("请选择要删除的学生！", "warning");
        }else{
           _this.$confirm('是否确认此操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          rows.forEach(element =>{
            console.log(element);
            idsarr.push(element.id)


            this.$axios.delete("/schoolBasicPersonnelInfo", {//删除学生
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


  .avatar-uploader .el-upload {
    border: 1px dashed  #409EFF;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border: 1px dashed #8c939d;
    border-radius: 6px;
  }


  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
