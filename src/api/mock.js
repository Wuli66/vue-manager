import  Mock from "mockjs";
import homeApi from './mockServeData/home'
import user from './mockServeData/user'
import permission from './mockServeData/permission'
//定义mock请求拦截  下面第三个函数是用来生成响应数据的函数

Mock.mock('/api/home/getData', 'get', homeApi.getStatisticalData)
//定义用户列表的数据
// 当携带上params时绝对路径匹配失败
Mock.mock('/api/user/add', 'post',user.createUser )
Mock.mock('/api/user/edit', 'post',user.updateUser)
Mock.mock('/api/user/del', 'post',user.deleteUser)   
Mock.mock(/api\/user\/getUser/, user.getUserList)  

//定义拦截接口
Mock.mock(/api\/permission\/getMenu/,'post',permission.getMenu)


 

