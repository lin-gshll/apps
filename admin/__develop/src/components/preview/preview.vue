
<template>  
  <div id="container">  
  </div>  
</template>  
<script>  
import pdf from '@/components/pdf'  
  
export default {  
  data () {  
    return {  
    }  
  },  
  methods: {  
  
  }  ,
  mounted() {  
      // this.$showPDF("http://localhost:8081/work_file/8fc5fdc3a5906e964e2e01b85f972463.pdf")
  }

}  
</script>  
  
<style scoped>  
#container {  
  background-color: rgba(0,0,0,0.75);  
  position:fixed;  
  width: 100%;  
  height: 100%;  
  top: 0;  
  left: 0;  
  text-align: center;  
  padding: 5px;  
}  
  
.pdf-page {  
  
}  
  
.foot {  
  position: fixed;  
  transform: translate(-50%,0);  
  left: 50%;  
}  
</style>  
