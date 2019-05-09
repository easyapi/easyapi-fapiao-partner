<template>
	<div class="layout">
		<Header></Header>
		<Aside></Aside>
		<div class="main">
			<router-view></router-view>
		</div>
	</div>
</template>
<script>
	import Header from '../../components/Header'
  import Aside from '../../components/Aside'
  export default {
    name: 'LayOut',
    components: {
      Header,Aside
    },
    props: {},
    data() {
      return {}
    },
    //计算属性
    computed: {},
    watch: {},
    created() {

    },
    mounted() {

    },
    //keep-alive 组件激活时调用
    activated() {
    },
    //keep-alive 组件停用时调用。
    deactivated() {
    },
    //方法
    methods: {}
  }
</script>
<style scoped lang="scss">


.el-main {
	background-color: $cl-gray;
	height: 100%;
}

.el-container {
	height: 100%;
}


</style>