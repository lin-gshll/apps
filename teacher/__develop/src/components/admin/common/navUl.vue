<template>
	<el-row class="tac">
	  <el-col :span="24">
		<el-menu
		  default-active="2"
		  class="el-menu-vertical-demo">
		  <el-menu-item index="2">
			<!-- <span slot="title">导航二</span> -->
			<a href="#/activity">活动管理</a>
		  </el-menu-item>
		  <el-menu-item index="4">
			<!-- <span slot="title">导航四</span> -->
			<a href="#/account">账号管理</a>
		  </el-menu-item>
		</el-menu>
	  </el-col>
	</el-row>
</template>
<script>
	export default {
		name: 'nav',
		props: ['parentData'],
		data(){
			return {
			}
		},
		methods: {
			methods: {
			 handleOpen(key, keyPath) {
			   console.log(key, keyPath);
			 },
			 handleClose(key, keyPath) {
			   console.log(key, keyPath);
			 }
		   }
		}
	}
</script>
<style scoped>

</style>