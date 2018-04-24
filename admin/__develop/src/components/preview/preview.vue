<template>
  <div class="box-preview wrapper">
    <h4>{{info.name}}</h4>
    <p class="text-center">
      <span>{{info.user_name}}</span> -
      <span>{{info.class_name}}</span>
    </p>
    <div class="box-iframe">
      <canvas id="canvas"></canvas>
    </div>
    <div class="info">
      <div class="box-action">
        <i class="el-icon-download"></i>
        <a :href="w.download_url" target="_blank" style="color:#60c5ff;">下载</a>
        <span>文件大小:{{w.size}}</span>
      </div>
      <p class="box-info"><span>作品描述：</span><span>{{w.intro || '无'}}</span></p>
    </div>
  </div>
</template>
<script>
// 预览
import PDFJS from 'vue-pdf'
export default {
	name: 'preview',
	// props: ['parentData'],
	data() {
		return {
			info: {
					name: '作品名称',
			user_name: '李想',
			class_name: '泡小西区-五年级一班',
			work_detail: {
				url: 'http://localhost:8081/work_file/7ca63ec615d34f30c7ea32dd1a2024ce.docx',
				format: 'docx',
				size: '15M',
				intro: '作品描述：微课是互联网+时代的一种越来越普遍的信息技术教学工具。在课前、课中、课后都有广泛的应用前景'
			}
			}
		}
	},
	computed: {
		w() {
			return this.info.work_detail;
		}
	},
	created() {
        
		    //   var url = 'http://localhost:8081/upload/e5266cda72e3920f828083a540351349.docx';
         
        //    PDFJS.getDocument(url).then(function getPdf(pdf) {
        //            pdf.getPage(2).then(function getPage(page) {
        //                        var scale = 1;
        //                        var viewport = page.getViewport(scale);
        //                        var canvas = document.getElementById('canvas');
        //                        var context = canvas.getContext('2d');
        //                        canvas.height = viewport.height;
        //                        canvas.width = viewport.width;
        //                        var renderContext = {
        //                            canvasContext: context,
        //                                viewport: viewport
        //                       };
        //                   page.render(renderContext);
        //                 });
        // });

		let data = {
			name: '作品名称',
			user_name: '李想',
			class_name: '泡小西区-五年级一班',
			work_detail: {
				url: 'http://localhost:8081/upload/e5266cda72e3920f828083a540351349.docx',
				format: 'pdf',
				size: '15M',
				intro: '作品描述：微课是互联网+时代的一种越来越普遍的信息技术教学工具。在课前、课中、课后都有广泛的应用前景'
			}
		}

		Object.assign(this.info,  JSON.parse(this.$route.query.data));

	}
}
</script>
<style scoped>
  .wrapper {
    margin: 0 auto;
    max-width: 800px;
    background-color: #f1f1f1;
    padding: 40px;
  }

  .box-iframe {
    height: 400px;
  }

  iframe {
    width: 100%;
    height: 100%;
  }

  h4 {
    font-size: 16px;
    font-weight: bold;
    line-height: 1.5;
    text-align: center;
  }

  .box-action,
  h4,
  p {
    margin: 10px 0;
  }

  .info {
    background-color: #fff;
    padding: 10px;
  }

</style>
