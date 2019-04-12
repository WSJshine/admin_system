<template>
  <div class="c-main">
    <el-row class="topArea  wow fadeInDown">
      <el-col :span="24">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>欢迎来到管理中心</el-breadcrumb-item>
          <el-breadcrumb-item>首页</el-breadcrumb-item>
        </el-breadcrumb>

      </el-col>
    </el-row>


    <el-row class="dataVisualization  panelArea">
      <el-col class="dataVisualization_item dataVisualization_item1 wow fadeInLeft" :span="6" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        <div class="card" @mouseenter="displayChart(1)"><h3>设备数量<br/> <b>100</b><img src="../../assets/other-img/shebei@2x.png" height="50" width="50" class="img1"/></h3>
        </div>
      </el-col>

      <el-col class="dataVisualization_item dataVisualization_item2 wow fadeInLeft" :span="6" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        <div class="card" @mouseenter="displayChart(2)"><h3>房源总数<br/> <b>1200</b><img src="../../assets/other-img/fangyuan@2x.png" height="50" width="50" class="img1"/></h3>
        </div>
      </el-col>
      <el-col class="dataVisualization_item dataVisualization_item3 wow fadeInRight" :span="6" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        <div class="card" @mouseenter="displayChart(3)"><h3>管理员人数<br/><b>20</b><img src="../../assets/other-img/kongzhi@2x.png" height="50" width="50" class="img1"/></h3>
        </div>
      </el-col>
      <el-col class="dataVisualization_item dataVisualization_item4 wow fadeInRight" :span="6" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        <div class="card" @mouseenter="displayChart(4)"><h3>用户总数<br/><b>200</b><img src="../../assets/other-img/yonghu@2x.png" height="50" width="50" class="img1"/></h3>
        </div>
      </el-col>
    </el-row>

    <el-row class="chartArea  panelArea" :span="24">

      <el-col class="chart" :span="12">
        <div id="chart" style="height: 380px;width: 90%" class="grid-content"></div>
      </el-col>
      <el-col class="chart" :span="6">
        <div id="chart1" style="height: 380px;width: 90%" class="grid-content"></div>
      </el-col>
      <el-col class="chart" :span="6">
        <div id="chart2" style="height: 380px;width: 90%" class="grid-content"></div>
      </el-col>
      <el-col class="chart" :span="24">
        <div id="chart3" style="height: 600px;width: 100%" class="grid-content"></div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  export default {
    name: "home",
    data() {
      return {
        getSize:"",
        arrayData: [
          {timeRange: "11", value: 22},
          {timeRange: "12", value: 20},
          {timeRange: "13", value: 10},
          {timeRange: "14", value: 10},
          {timeRange: "14", value: 5},
          {timeRange: "15", value: 3},
          {timeRange: "16", value: 1},
          {timeRange: "17", value: 6},
          {timeRange: "18", value: 30},
          {timeRange: "19", value: 69},
          {timeRange:"20",value:11}
        ],
        unit:"个",
        chartColor:"#005da0",
        chartTitle:"报修处理情况统计（近10天）",
        chartType:"bar",
        activeName: 'tie',

      }
    },
    methods: {
      displayChart(){

      },
      drawChart(afresh) {

        let a=this.arrayData;
        let b=this.arrayData1;
        let t=[];
        let v=[];
        for (let i = 0; i < a.length; i++) {
          t.push(a[i].timeRange);
          v.push(a[i].value);
        }

        let chartPanel = this.$echarts.init(document.getElementById('chart'));
        let chartPanel1 = this.$echarts.init(document.getElementById('chart1'));
        let chartPanel2 = this.$echarts.init(document.getElementById('chart2'));
        let chartPanel3 = this.$echarts.init(document.getElementById('chart3'));
        if (afresh) {
          //如果传入的afresh是true 表示 是重绘地图，在这里销毁掉原来的地图，重新初始化一个地图
          chartPanel.dispose();
          chartPanel1.dispose();
          chartPanel2.dispose();
          chartPanel3.dispose();
          chartPanel = this.$echarts.init(document.getElementById('chart'));
          chartPanel1 = this.$echarts.init(document.getElementById('chart1'));
          chartPanel2 = this.$echarts.init(document.getElementById('chart2'));
          chartPanel3 = this.$echarts.init(document.getElementById('chart3'));
        }else {
          chartPanel.dispose();
          chartPanel1.dispose();
          chartPanel2.dispose();
          chartPanel3.dispose();
          chartPanel = this.$echarts.init(document.getElementById('chart'));
          chartPanel1 = this.$echarts.init(document.getElementById('chart1'));
          chartPanel2 = this.$echarts.init(document.getElementById('chart2'));
          chartPanel3 = this.$echarts.init(document.getElementById('chart3'));
        }

        // 绘制图表
        chartPanel.setOption({
          animation: !afresh,//如果是重绘的地图 就关掉动画效果，这样就可以实现只在页面第一次加载的时候展示绘图动画setoption
          legend: {
            orient: 'vertical',
            x: 'right',
          },
          color:['#00c6a5','#397bff'],
          tooltip: {},
          dataset: {
            dimensions: ['product', '已处理', '未处理'],
            source: [
              {product: '11', '已处理': 43.3, '未处理': 85.8},
              {product: '12', '已处理': 83.1, '未处理': 73.4 },
              {product: '13', '已处理': 86.4, '未处理': 65.2 },
              {product: '14', '已处理': 22.4, '未处理': 53.9 },
              {product: '15', '已处理': 34.4, '未处理': 43.9 },
              {product: '16', '已处理': 32.4, '未处理': 23.9 },
              {product: '17', '已处理': 66.4, '未处理': 73.9 },
              {product: '18', '已处理': 77.4, '未处理': 93.9 },
              {product: '19', '已处理': 45.4, '未处理': 83.9 },
              {product: '20', '已处理': 88.4, '未处理': 53.9 }
            ]
          },
          xAxis: {
            type: 'category',
            name:'日期'
          },
          yAxis: {
            name:'个数'
          },
          // Declare several bar series, each will be mapped
          // to a column of dataset.source by default.
          title: {text: '报修处理情况统计（近十天）'},
          series: [
            {type: 'bar'},
            {type: 'bar'},
          ]
        })
        // 中间环形图
        chartPanel1.setOption({
          animation: !afresh,//如果是重绘的地图 就关掉动画效果，这样就可以实现只在页面第一次加载的时候展示绘图动画setoption
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'right',
            data:['防撬','劫持','假锁','离线','低电量']
          },
          color:['#3f78f6','#00e498','#ff5756','#ffb000',"#7940f4"],
          title: {text: '当日报警统计'},
          series: [
            {
              name:'访问来源',
              type:'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data:[
                {value:335, name:'防撬'},
                {value:310, name:'劫持'},
                {value:234, name:'假锁'},
                {value:135, name:'离线'},
                {value:1548, name:'低电量'}
              ]
            }
          ]
        })
        // 右边环形图
        chartPanel2.setOption({
          animation: !afresh,//如果是重绘的地图 就关掉动画效果，这样就可以实现只在页面第一次加载的时候展示绘图动画setoption
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'right',
            data:['故障设备','正常设备']
          },
          color:['#d3dcff','#91a7fd'],
          title: {text: '设备故障报警'},
          series: [
            {
              name:'访问来源',
              type:'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data:[
                {value:335, name:'故障设备'},
                {value:310, name:'正常设备'}
              ]
            }
          ]
        })
        // 绘制下边那个光滑曲线图
        //
        chartPanel3.setOption({
          animation: !afresh,//如果是重绘的地图 就关掉动画效果，这样就可以实现只在页面第一次加载的时候展示绘图动画setoption
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['0点', '1点', '2点', '3点', '4点', '5点', '6点', '7点', '8点', '9点', '10点', '11点', '12点', '13点', '14点', '15点', '16点', '17点', '18点', '19点', '20点', '21点', '22点', '23点', '24点']
          },
          yAxis: {
            type: 'value'
          },
          title: {text: '当日时分段进出次数趋势图'},
          series: [{
            data: [820, 932, 901, 934, 290, 330, 720, 820, 1320, 920, 320, 730, 520, 620, 220, 420, 620, 320, 520, 720, 820, 320, 620, 820,688],
            type: 'line',
            areaStyle: {},
            smooth:true
          }],
          itemStyle: {
            color: 'rgba(255,0,0,0.5)'
          }
        })
      }

    },
    mounted() {

      this.drawChart();
      let width = "";
      width = document.getElementsByClassName("c-main")[0].clientWidth;


      this.getSize=setInterval(() => {
        try {


        let w = document.getElementsByClassName("c-main")[0].clientWidth;
        if (w !== width) {
          this.drawChart(true);
          width = w;
        }

        }catch(e){
          console.log("Failed to get window size");
        }
      }, 1000)
    },
    beforeDestroy(){
      clearInterval(this.getSize);
    },
    created() {
      this.toTop();
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/base";

  .c-main {
    overflow: hidden;

    .dataVisualization {

      .dataVisualization_item {
        padding: 15px 15px;
        .card {
          position: relative;
          box-sizing: border-box;
          padding: 5px;
          background-color: $baseColor1;
          border-radius: 3px;
          cursor: pointer;
          h3 {
            font-weight: lighter;
            color: white;
            padding: 2px;
            b {
              font-weight: bold;
              font-size: 45px;
              padding: 0 10px;
            }
            span {
              font-size: 12px;
              color: #e4e4e4;
            }
          }
          .viewMore {
            text-align: right;
            color: white;
            font-size: 12px;
          }

        }
      }

      .dataVisualization_item1 {
        .card {
          background-color: $baseColor1;
          transition: all 0.3s ;
        }
      }
      .dataVisualization_item1:hover {
        .card {
          background-color: #003f6b;
        }
      }
      .dataVisualization_item2 {
        .card {
          background-color: #4270ae;
          transition: all 0.3s ;
        }
      }
      .dataVisualization_item2:hover {
        .card {
          background-color: #31507e;
        }
      }
      .dataVisualization_item3 {
        .card {
          background-color: #21a3b0;
          transition: all 0.3s ;
        }
      }
      .dataVisualization_item3:hover {
        .card {
          background-color: #1e7c88;
        }
      }
      .dataVisualization_item4 {
        .card {
          background-color: #7bbdbc;
          transition: all 0.3s ;
        }
      }

      .dataVisualization_item4:hover {
        .card {
          background-color: #5c908f;
        }
      }

    }

    .chartArea{

    }

    .tableArea{
      .table,.console{
        padding: 15px;
      }
    }

    .img1{
      padding-left: 70px;
    }

  }
</style>
