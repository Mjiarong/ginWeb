import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ArticleList from '../components/ArticleList.vue'
import Detail from '../components/Details.vue'
import Category from '../components/CateList.vue'

Vue.use(VueRouter)

const routes = [{
	path: '/',
	//name: 'home',
	component: HomeView,
	children: [{
			path: '/',
			component: ArticleList,
			meta: {
				title: '欢迎来到GinBlog'
			}
		},
		{
			path: '/article/detail/:id',
			component: Detail,
			meta: {
				title: '文章详情'
			},
			props: true
		},
		{
			path: '/category/:cid',
			component: Category,
			meta: {
				title: '分类信息'
			},
			props: true
		},
	]
}, ]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

router.beforeEach((to, from, next) => {
	if (to.meta.title) {
		document.title = to.meta.title ? to.meta.title : '加载中'
	}
	next()
})

export default router
