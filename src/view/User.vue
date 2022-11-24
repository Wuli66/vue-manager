<template>
    <div class="manage">
        <el-dialog title="提示" :visible.sync="dialogVisible" :before-close="handleClose" width="50%">
            <el-form ref="form" :rules="rules" :inline="true" :model="form" label-width="80px">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-select v-model="form.sex" placeholder="请选择">
                        <!-- :value将string转为number 后台发送的0，1就是number类型  -->
                        <el-option label="男" :value="1"></el-option>
                        <el-option label="女" :value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="出生日期" prop="birth">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.birth" style="width: 100%;"
                        value-format="yyyy-MM-DD ">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="地址" prop="addr">
                    <el-input v-model="form.addr" placeholder="请输入地址"></el-input>
                </el-form-item>
            </el-form>
            <!-- 用户的表单信息 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>

        </el-dialog>
        <div class="manage-header">
            <el-button type="primary" @click="handleAdd"> + 新增</el-button>
            <el-form :model="userForm" :inline="true">
                <el-form-item>
                    <el-input placeholder="请输入名称" v-model='userForm.name'></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onsubmit">查询</el-button>
                </el-form-item>
            </el-form>
            <!-- form搜索区域 -->
        </div>
        <div class="commontable">
            <el-table :data="tableData" style="width: 100%" height="90%" stripe>
                <el-table-column prop="name" label="姓名">
                </el-table-column>
                <el-table-column prop="sex" label="性别">
                    <template slot-scope="scope">
                        <!-- slot-scope 获取子组件元素 scope.row指的是当前行的-->
                        <span style="margin-left: 10px">{{ scope.row.sex === 1 ? '男' : '女' }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="age" label="年龄">
                </el-table-column>
                <el-table-column prop="birth" label="出生日期">
                </el-table-column>
                <el-table-column prop="addr" label="地址">
                </el-table-column>
                <el-table-column>
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="paper">
                <el-pagination layout="prev, pager, next" :total="total" @current-change="handelPage">
                </el-pagination>  
            </div>
        </div>

    </div>
</template>
<script>
import { getUser, addUser, editUser, delUser } from '../api'
export default {
    name: 'User',
    data() {
        return {
            userForm:{
                name:'',
            },
            dialogVisible: false,
            form: {
                name: '',
                age: '',
                sex: '',
                birth: '',
                addr: ''
            },
            rules: {
                name: { required: true, message: '请输入姓名' },
                age: { required: true, message: '请输入年龄' },
                sex: { required: true, message: '请选择性别' },
                birth: { required: true, message: '请选择出生日期' },
                addr: { required: true, message: '请输入地址' },


            },
            tableData: [],
            //到底是点编辑弹出的框 还是 添加弹出的框
            modalType: 0, //0 表示添加 1表示编辑
            total: 0, //当前总条数
            pageData: {
                page: 1,
                limit: 10
            }
        }
    },
    mounted() {
        this.getList();
    },
    methods: {
        // 提交用户表单
        submit() {
            //valid是否完成表单bool
            this.$refs.form.validate(valid => {
                if (valid) {
                    if (this.modalType === 0) {
                        addUser(this.form).then(()=> {
                            this.getList();
                        })
                    } else {
                        editUser(this.form).then(() => {
                            this.getList();
                        })
                    }
                    //  后续对表单数据的处理
                    // console.log('form',this.form);
                    //清空表单数据
                    this.$refs.form.resetFields();
                    //关闭弹窗 
                    this.dialogVisible = false
                }
            })
        },
        handleAdd() {
            this.modalType = 0;
            this.dialogVisible = true
        },
        handleClose() {
            this.dialogVisible = false
            // console.log(this.$refs.form);
        },
        cancel() {
            this.dialogVisible = false
            this.handleClose();
        },
        handleEdit(row) {

            this.modalType = 1;
            this.dialogVisible = true;
            //注意 需要对当前数据进行深拷贝，否则会出错
            this.form = JSON.parse(JSON.stringify(row))
        },
        handleDelete(row) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                delUser({ id:row.id }).then(() => { //删除时传入目标的ID

                    this.$message({ type: 'success', message: '删除成功!' });
                    this.getList();

                })
            }).catch((e) => {
                this.$message({ type: 'info', message: '已取消删除' });
            });
            
        },
        //从后端获取列表数据
        getList() {
            //原有的params就是一个对象 --- Es6合并对象属性的方法
            getUser({ params: {...this.userForm,...this.pageData}}).then(res => {
                this.tableData = res.data.list;
                this.total = res.data.count || 0;
            })
        },
        //选择页码的回掉函数
        handelPage(val) {
            this.pageData.page = val;
            this.getList();
        },
        //列表查询
        onsubmit() {
            this.getList()
        }
    }
}
</script>
<style lang="less" scoped>
.manage {
    height: 90%;
    .manage-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .commontable {
        position: relative;
        height: calc(100% - 62px);
        .paper { 
            position: absolute;
            bottom: 0;
            right: 20px;
        }
    }
    
}
</style>


operateFormLabel: [
                    {
                        model: 'name',
                        label: '姓名',
                        type: 'input'
                    },
                    {
                        model: 'age',
                        label: '年龄',
                        type: 'input'
                    },
                    {
                        model: 'sex',
                        label: '性别',
                        type: 'select',
                        opts: [
                            {
                                label: '男',
                                value: 1
                            },
                            {
                                label: '女',
                                value: 0
                            }
                        ]
                    },
                    {
                        model: 'birth',
                        label: '出生日期',
                        type: 'date'
                    },
                    {
                        model: 'addr',
                        label: '地址',
                        type: 'input'
                    }
                ],