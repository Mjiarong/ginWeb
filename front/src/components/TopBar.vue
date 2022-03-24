<template>
	<div>
		<v-app-bar app color="indigo darken-2">
			<v-app-bar-nav-icon dark class="hidden-md-and-up" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

			<v-toolbar-title>
				<v-app-bar-nav-icon class="mx-15 hidden-md-and-down">
					<v-avatar size="40" color="grey">
					</v-avatar>
				</v-app-bar-nav-icon>
			</v-toolbar-title>

			<v-tabs dark center-active centered class="hidden-sm-and-down">
				<v-tab @click="$router.push('/')">首页</v-tab>
				<v-tab v-for="item in cateList" :key="item.id" text @click="gotoCate(item.id)">{{ item.name }}</v-tab>
			</v-tabs>



		</v-app-bar>


	</div>
</template>

<script>
	export default {
		data() {
			return {
				cateList: [],
			}
		},
		created() {
			this.GetCateList()
		},
		methods: {
			// 获取分类
			async GetCateList() {
				const {
					data: res
				} = await this.$http.get('category')
				this.cateList = res.data
			},
			gotoCate(cid) {
				this.$router.push(`/category/${cid}`).catch((err) => err)
			},
		}
	}
</script>

<style>
</style>
