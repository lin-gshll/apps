<template>
  <div class="scorelist">
    <div >
      <div v-if="isShow" id="chartColumn" style="width:100%; height:400px;" ref="echarts"></div>
    </div>
    <!--<div v-if="!isShow" style="height:30px;width:100%;float:right;text-align:right">
        <el-button type="success" disabled>成功按钮</el-button>
    </div>-->
    <div v-if="!isShow">
  
       
      <div id="chartPie" style="width:100%;height:400px;" ref="echartsPie">

      </div>
    </div>
  </div>
</template>

<script>
    import echarts from 'echarts'
    import store from '../../../store/teacher/teacher.js'
    export default {
        name:"scorelist",
        props:['echartData'],
        data() {
            return {
              isShow:true,
                chartColumn: null,
                data1:"",
                charts: null
            }
        },
        watch: {
            echartData:function(){
                this.begin(this.echartData);
                setTimeout(()=>{
                    this.chartColumn.resize();  
                },0);
            }
        },
        methods:{
           begin: function(info){
                let that = this,temp=true;
                let title=[],dataAvg=[],dataMax=[],dataNotCommit=[];
                for(let i = 0;i<info.length;i++){
                        title.push(info[i]._id);
                        dataAvg.push(info[i].avg.toFixed(2));
                        dataMax.push(info[i].max);
                        dataNotCommit.push(info[i].notCommit);
                }
                this.chartColumn = echarts.init(document.getElementById('chartColumn'));

                this.chartColumn.on("click",function(params){
                    that.isShow = false;
                    that.$nextTick(function() {
                        store.get_scoreDetail({title:params.name}).then(r=>{
                         let opinion=[],opinionData=[];
                        
                          for(var i=0;i<r.data.length-1;i++){
                            opinion.push(r.data[i].name);
                            opinionData.push(r.data[i]);
                          }
                         
                          setTimeout(()=>{
                             that.drawPie('chartPie',r.data[r.data.length-1],opinion,opinionData);
                             that.charts.resize();  
                         },10);
                        })
                       
                     })
                    // if(temp){
                    //     that.$emit("workInfo",params.name,1);
                    //     temp=false;
                    // }
                    // return ;
                })
                this.chartColumn.setOption({
                        title: { text: '实验成绩分布', x: 'center' },
                        tooltip: { 
                            trigger: 'axis',
                            axisPointer: {
                                    type: 'shadow'
                             }
                        },
                        legend: {
                             data:['实验平均分', '实验最高分',"未提交或未批改"],
                      
                             left: 'left'
                          },
                        xAxis: {
                            type : 'category',
                            data: title,
                            axisTick: {
                              alignWithLabel: true
                            }
                        },
                        yAxis: {},
                        series: [{
                            name: '实验平均分',
                            stack: '实验平均分',
                            type: 'bar',
                            data: dataAvg,
                            barWidth : 30,//柱图宽度
                            },{
                            name: '实验最高分',
                            stack: '实验最高分',
                            type: 'bar',
                            data: dataMax,
                            barWidth : 30,//柱图宽度
                            },{
                            name: '未提交或未批改',
                            stack: '未提交或未批改',
                            type: 'bar',
                            data: dataNotCommit,
                            barWidth : 30,//柱图宽度
                            }]
                    });
            
           } ,
            drawPie:function(id,rTitle,opinion,opinionData){
               this.charts = echarts.init(document.getElementById(id))
               this.charts.setOption({
                  title: {
                      text: rTitle,
                      x: 'left',   
                      textStyle : {

                          fontSize : 25,
                        }
                  },
                 tooltip: {
                   trigger: 'item',
                   formatter: '{a}<br/>{b}:{c} ({d}%)'
                 },
                 legend: {
                     bottom: 10,
                      left: 'center',
                      data:opinion,
                     textStyle : {
            
                          fontSize : 20,
                        }
                 },
                 series: [
                   {
                      type: 'pie',
                      radius : '65%',
                      name:"学生成绩分布",
                      center: ['50%', '50%'],
                      selectedMode: 'single',
                      data:opinionData
                   }
                 ],
                itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
               })
            }
        },
         mounted(){
          
        }
              
    }
</script>

<style scoped>
  .chart-container {
    width: 100%;
    float: left;
  }

</style>
