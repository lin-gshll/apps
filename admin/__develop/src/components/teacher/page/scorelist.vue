<template>
  <div class="scorelist">
       
    <div >
      <div v-show="isShow" id="chartColumn" style="width:100%; height:400px;" ref="echarts"></div>
    </div>
   
    <div v-show="!isShow">
          <div style="height:10px;width:50%;float:right;text-align:right;margin-right:50px;z-index:1;">
           <el-button type="success"  @click="lookSing()">查看成绩详细数据</el-button>
      </div>
      <div style="z-index:1;height:10px;width:50%;float:right;text-align:right;margin-right:50px;">
           <el-button type="primary" style="margin-top:80px;" @click="lookAll()">查看所有实验数据</el-button>
      </div>
      
      <div id="chartPie" style="width:80%;height:400px;" ref="echartsPie">

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
                charts: null,
                titleC:""
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
            lookSing:function(){
  
                  this.$emit("workInfo",this.titleC,1);
            },
            lookAll:function(){
                let that = this;
                this.isShow = !this.isShow;
                setTimeout(()=>{
                    that.chartColumn.resize(); 
                },10);
            },
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
                          that.titleC = r.data[r.data.length-1];
                          setTimeout(()=>{
                             that.drawPie('chartPie',r.data[r.data.length-1],opinion,opinionData);
                              document.getElementById("chartPie").style.zIndex = "1";
                             that.charts.resize();  
                             document.getElementById("chartPie").style.zIndex = "1"; 
                         },10);
                        })
                       
                     })
              
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
                let that =this;
                let temp = true;
               this.charts = echarts.init(document.getElementById(id));
               this.charts.on("click",function(params){
                
                   that.$emit("workInfo",that.titleC,2,params.name);
     
               })
               this.charts.setOption({
                  title: {
                      text: rTitle,
                      x: 'center',   
                      textStyle : {

                          fontSize : 25,
                        }
                  },
                 tooltip: {
                   trigger: 'item',
                   formatter: '{a}<br/>{b}:{c} ({d}%)'
                 },
                 legend: {
                      orient: 'vertical',
                      left: 'left',
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
