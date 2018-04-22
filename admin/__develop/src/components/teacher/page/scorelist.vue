<template>
  <div class="scorelist">
    <el-row>
      <div id="chartColumn" style="width:100%; height:400px;" ref="echarts"></div>
    </el-row>
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
                chartColumn: null,
                data1:""
               
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
                    console.log(temp);
                    if(temp){
                        that.$emit("workInfo",params.name,1);
                        temp=false;
                    }
                   
                    return ;
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
                    

            }  
        }
              
    }
</script>

<style scoped>
  .chart-container {
    width: 100%;
    float: left;
  }

</style>
