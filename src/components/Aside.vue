<template>
	<div class="aside">
		<div class="navbar flex-c" v-for="(item,index) in sons" :key="index">
			<h2>{{item.title}}</h2>
			<a :class="[sonsBarActive===citem.name?'active':'']" v-for="(citem,cindex) in item.sons" :key="cindex"
			   @click="jumpPage(citem.url,index)">
				<span :class="['iconfont',citem.icon?citem.icon:'icon-member1']"></span>{{citem.title}}</a>

		</div>
	</div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'Aside',
    components: {},
    props: {},
    data() {
      return {}
    },
    //计算属性
    computed: {
      ...mapGetters([
        'sons',
        'sonsBarActive'
      ])
    },
    watch: {},
    created() {
    },
    mounted() {
      this.$store.dispatch('setSonsNavbarActive', this.$route.path);

    },
    //keep-alive 组件激活时调用
    activated() {
    },
    //keep-alive 组件停用时调用。
    deactivated() {
    },
    //方法
    methods: {
      jumpPage(url,i) {
        this.$router.push({path: url, query: {}});
        this.$store.dispatch('setSonsNavbarActive', url);
        // this.$store.dispatch('setSonsNavbar', {url:url,index:i});
      },
    }
  }
</script>
<style scoped lang="scss">

</style>