<template>
    <el-row>
        <el-col :span="8" style="margin-top: 20px;padding-right: 10px;">
            <el-card shadow="hover" style="height:250px;">
                <div class="user">
                    <img src="../assets/images/user.png" />
                    <div class="userinfo">
                        <p class="name">Admin</p>
                        <p class="access">超级管理员</p>
                    </div>

                </div>
                <div class="login-info">
                    <p>上次登录时间：<span>2021-7-19</span></p>
                    <p>上次登录地点：<span>武汉</span></p>
                </div>

            </el-card>
            <el-card style="margin-top:20px;height:500px;padding-left: 10px;">
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column prop="name" label="课程">
                    </el-table-column>
                    <el-table-column prop="todayBuy" label="今日购买">
                    </el-table-column>
                    <el-table-column prop="monthBuy" label="本月购买">
                    </el-table-column>
                    <el-table-column prop="totalBuy" label="全部购买">
                    </el-table-column>
                </el-table>
            </el-card>



        </el-col>
        <el-col :span="16">
            <div class="grid-content bg-purple-light">
                <div class="num">
                    <el-card :body-style="{ display: 'flex', padding: '0px' }" v-for="item in countData"
                        :key="item.name">
                        <i class="icon" :class="`el-icon-${item.icon}`" :style="{ backgroundColor: item.color }"></i>
                        <div class="detail">
                            <p class="desc">{{ item.name }}</p>
                            <p class="price">{{ item.value }}</p>
                        </div>
                    </el-card>
                </div>
                <el-card style="height:280px">
                    <!-- 折线图 -->
                    <div ref="echarts1" style="height:260px"></div>
                </el-card>
                <div class="graph">
                    <el-card style="height:260px;">
                        <!-- 柱状图 -->
                        <div style="height:260px" ref="echarts2"> </div>
                    </el-card>
                    <el-card style="height:260px;">
                        <!-- 饼图 -->
                        <div style="height:200px" ref="echarts3"> </div>
                    </el-card>
                </div>
            </div>
        </el-col>
    </el-row>
</template>
<script>
import * as echarts from 'echarts'
import { getData } from '../api/index'
export default {
    name: 'Home',
    mounted() {
        getData().then(({ data }) => {
            console.log('getData方法得到的',data);
            const { tableData } = data.data
            this.tableData = tableData;
            //折线图
            const echarts1 = echarts.init(this.$refs.echarts1);
            let echarts1Option = {};
            const { orderData, userData, videoData } = data.data;
            const xAxis = Object.keys(orderData.data[0])
            const xAxisData = { data: xAxis }
            echarts1Option.xAxis = xAxisData
            echarts1Option.yAxis = {}

            echarts1Option.legend = xAxisData //legend最上面的 对图例的解释
            echarts1Option.series = [] //主要显示出来的图与数据
            xAxis.forEach((key) => {
                echarts1Option.series.push({
                    name: key,
                    data: orderData.data.map(item => item[key]),
                    type: 'line'
                })
            })
            // echarts1Option.series =  {
            //     type:''
            // }
            echarts1.setOption(echarts1Option)

            //柱状图
            const echarts2 = echarts.init(this.$refs.echarts2)
            const echarts2Option = {
                legend: {
                    // 图例文字颜色
                    textStyle: {
                        color: "#333",
                    },
                },
                grid: {
                    left: "20%",
                },
                // 提示框
                tooltip: {
                    trigger: "axis",
                },
                xAxis: {
                    type: "category", // 类目轴
                    data: userData.map(item => item.date),
                    axisLine: {
                        lineStyle: {
                            color: "#17b3a3",
                        },
                    },
                    axisLabel: {
                        interval: 0,
                        color: "#333",
                    },
                },
                yAxis: [
                    {
                        type: "value",
                        axisLine: {
                            lineStyle: {
                                color: "#17b3a3",
                            },
                        },
                    },
                ],
                color: ["red", "green"],
                series: [
                    {
                        name: '新增用户',
                        data: userData.map(item => item.new),
                        type: 'bar'
                    },
                    {
                        name: '活跃用户',
                        data: userData.map(item => item.active),
                        type: 'bar'

                    }
                ],

            }
            echarts2.setOption(echarts2Option)

            //饼状图
            const echarts3 = echarts.init(this.$refs.echarts3)
            const echarts3Option = {
                legend: {

                    // 图例文字颜色
                    textStyle: {
                        color: "#333",
                    },
                    top: 5


                },

                xAxis: {
                    type: "category", // 类目轴
                    data: [],
                    axisLine: {
                        lineStyle: {
                            color: "#fff",
                        },
                    },

                },
                yAxis: [
                    {
                        type: "value",
                    },
                ],
                color: ["yellow", "#b6a2de", '#544', 'blue', 'pink', 'red'],
                series: [
                    { data: videoData, type: 'pie', top: 30 }
                ],

            }
            echarts3.setOption(echarts3Option)



        })




    },
    data() {
        return {
            tableData: [],
            countData: [
                {
                    name: "今日支付订单",
                    value: 1234,
                    icon: "success",
                    color: "#2ec7c9",
                },
                {
                    name: "今日收藏订单",
                    value: 210,
                    icon: "star-on",
                    color: "#ffb980",
                },
                {
                    name: "今日未支付订单",
                    value: 1234,
                    icon: "s-goods",
                    color: "#5ab1ef",
                },
                {
                    name: "本月支付订单",
                    value: 1234,
                    icon: "success",
                    color: "#2ec7c9",
                },
                {
                    name: "本月收藏订单",
                    value: 210,
                    icon: "star-on",
                    color: "#ffb980",
                },
                {
                    name: "本月未支付订单",
                    value: 1234,
                    icon: "s-goods",
                    color: "#5ab1ef",
                },
            ],

        }
    }
}
</script>

<style lang="less" scoped >
.user {
    display: flex;
    align-content: center;
    padding-bottom: 20px;
    margin-bottom: 20px;

    img {
        width: 150px;
        height: 150px;
        border-radius: 50%;

    }


    .userinfo {

        .name {
            font-size: 32px;
            margin-top: 32px;
            margin-bottom: 10px;
            margin-left: 40px;
        }

        .access {
            color: #999;
            margin-left: 40px;
        }
    }

}

.login-info {
    border-top: 1px solid #ccc;
    padding-top: 10px;
    margin-top: -30px;

    p {
        line-height: 28px;
        font-size: 14px;
        color: #999;

        span {
            color: 666;
            margin-left: 60px;
        }
    }
}

.num {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .icon {
        height: 80px;
        width: 80px;
        font-size: 30px;
        line-height: 80px;
        background-color: aqua;
        text-align: center
    }

    .detail {
        margin-left: 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;


        .price {
            text-indent: 8px;
            margin-top: 5px;
            font-size: 30px;
            height: 30px;
            line-height: 30px
        }

        .desc {
            color: #999;
            font-size: 14px;
            text-align: center
        }
    }

    .el-card {
        width: 32%;
        margin-bottom: 20px;
    }
}

.graph {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;

    .el-card {
        width: 48%;
    }

}



;
</style>