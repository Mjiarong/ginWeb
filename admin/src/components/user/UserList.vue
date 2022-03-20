<template>
	<div>
		<a-card class="userCard">
			<a-row :gutter="20">
				<a-col :span="6">
					<a-input-search v-model="queryParam.username" allowClear placeholder="输入用户名查找" enter-button
						@search="searchUser" />
				</a-col>
				<a-col :span="4">
					<a-button type="primary" @click="addUserVisible = true">新增</a-button>
				</a-col>
			</a-row>
			<a-table class="userTable" rowKey="ID" :columns="columns" :pagination="pagination" :dataSource="userlist"
				@change="handleTableChange" bordered>
				<span slot="role" slot-scope="data">{{ data == 1 ? '管理员' : '订阅者' }}</span>
				<template slot="action" slot-scope="data">
					<div class="actionSlot">
						<a-button type="primary" icon="edit" style="margin-right: 15px" @click="editUser(data.ID)">编辑
						</a-button>
						<a-button type="danger" icon="delete" style="margin-right: 15px" @click="deleteUser(data.ID)">删除
						</a-button>
					</div>
				</template>
			</a-table>
		</a-card>
		<!-- 新增用户 -->
		<a-modal closable title="新增用户" :visible="addUserVisible" width="60%" @ok="addUserOk" @cancel="addUserCancel"
			destroyOnClose>
			<a-form-model :model="newUser" :rules="addUserRules" ref="addUserRef">
				<a-form-model-item label="用户名" prop="username">
					<a-input v-model="newUser.username"></a-input>
				</a-form-model-item>
				<a-form-model-item has-feedback label="密码" prop="password">
					<a-input-password v-model="newUser.password"></a-input-password>
				</a-form-model-item>
				<a-form-model-item has-feedback label="确认密码" prop="checkpass">
					<a-input-password v-model="newUser.checkpass"></a-input-password>
				</a-form-model-item>
			</a-form-model>
		</a-modal>

		<!-- 编辑用户 -->
		<a-modal closable destroyOnClose title="编辑用户" :visible="editUserVisible" width="60%" @ok="editUserOk"
			@cancel="editUserCancel">
			<a-form-model :model="userInfo" :rules="userRules" ref="addUserRef">
				<a-form-model-item label="用户名" prop="username">
					<a-input v-model="userInfo.username"></a-input>
				</a-form-model-item>
				<a-form-model-item label="是否为管理员">
					<a-switch :checked="IsAdmin" checked-children="是" un-checked-children="否" @change="adminChange" />
				</a-form-model-item>
			</a-form-model>
		</a-modal>
	</div>

</template>

<script>
	//表格列的配置描述
	const columns = [{
			title: 'ID',
			dataIndex: 'ID',
			width: '10%',
			key: 'id',
			align: 'center',
		},
		{
			title: '用户名',
			dataIndex: 'username',
			width: '20%',
			key: 'username',
			align: 'center',
		},
		{
			title: '角色',
			dataIndex: 'role',
			width: '20%',
			key: 'role',
			align: 'center',
			scopedSlots: {
				customRender: 'role'
			},
		},
		{
			title: '操作',
			width: '30%',
			key: 'action',
			align: 'center',
			scopedSlots: {
				customRender: 'action'
			},
		},
	]

	export default {
		data() {
			return {
				pagination: { //分页器
					pageSizeOptions: ['5', '10', '20'], //指定每页可以显示多少条
					defaultPageSize: 5, //默认的每页条数
					defaultCurrent: 1, //默认的当前页数
					pageSize: 5,
					total: 0,
					showSizeChanger: true, //是否可以改变pageSize
					showTotal: (total) => `共${total}条`, //用于显示数据总量和当前数据顺序
				},
				userlist: [],
				columns,
				queryParam: {
					username: '',
					pagesize: 5,
					pagenum: 1,
				},
				addUserVisible: false,
				editUserVisible: false,
				userInfo: {
					username: '',
					password: '',
					role: 0,
					checkPass: '',
				},
				newUser: {
					username: '',
					password: '',
					role: 0,
					checkPass: '',
				},
				userRules: {
					username: [{
						validator: (rule, value, callback) => {
							if (this.userInfo.username == '') {
								callback(new Error('请输入用户名'))
							}
							if ([...this.userInfo.username].length < 4 || [...this.userInfo.username].length >
								12) {
								callback(new Error('用户名应当在4到12个字符之间'))
							} else {
								callback()
							}
						},
						trigger: 'blur',
					}, ],
					password: [{
						validator: (rule, value, callback) => {
							if (this.userInfo.password == '') {
								callback(new Error('请输入密码'))
							}
							if ([...this.userInfo.password].length < 6 || [...this.userInfo.password].length >
								20) {
								callback(new Error('密码应当在6到20位之间'))
							} else {
								callback()
							}
						},
						trigger: 'blur',
					}, ],
					checkpass: [{
						validator: (rule, value, callback) => {
							if (this.userInfo.checkpass == '') {
								callback(new Error('请输入密码'))
							}
							if (this.userInfo.password !== this.userInfo.checkpass) {
								callback(new Error('密码不一致，请重新输入'))
							} else {
								callback()
							}
						},
						trigger: 'blur',
					}, ],
				},
				addUserRules: {
					username: [{
						validator: (rule, value, callback) => {
							if (this.newUser.username == '') {
								callback(new Error('请输入用户名'))
							}
							if ([...this.newUser.username].length < 4 || [...this.newUser.username].length >
								12) {
								callback(new Error('用户名应当在4到12个字符之间'))
							} else {
								callback()
							}
						},
						trigger: 'blur',
					}, ],
					password: [{
						validator: (rule, value, callback) => {
							if (this.newUser.password == '') {
								callback(new Error('请输入密码'))
							}
							if ([...this.newUser.password].length < 6 || [...this.newUser.password].length >
								20) {
								callback(new Error('密码应当在6到20位之间'))
							} else {
								callback()
							}
						},
						trigger: 'blur',
					}, ],
					checkpass: [{
						validator: (rule, value, callback) => {
							if (this.newUser.checkpass == '') {
								callback(new Error('请输入密码'))
							}
							if (this.newUser.password !== this.newUser.checkpass) {
								callback(new Error('密码不一致，请重新输入'))
							} else {
								callback()
							}
						},
						trigger: 'blur',
					}, ],
				},
			}
		},
		created() {
			this.getUserList()
		},
		computed: {
			IsAdmin: function() {
				if (this.userInfo.role === 1) {
					return true
				} else {
					return false
				}
			},
		},
		methods: {
			async getUserList() {
				const {
					data: res
				} = await this.$http.get('users', {
					params: {
						pagesize: this.queryParam.pagesize,
						pagenum: this.queryParam.pagenum,
					},
				})
				if (res.status !== 200) {
					if (res.status === 1004 || 1005 || 1006 || 1007) {
						window.sessionStorage.clear()
						this.$router.push('/login')
					}
					this.$message.error(res.message)
				}
				this.userlist = res.data
				this.pagination.total = res.total
			},
			async searchUser() {
				const {
					data: res
				} = await this.$http.get('users/search', {
					params: {
						username: this.queryParam.username,
						pagesize: this.queryParam.pagesize,
						pagenum: this.queryParam.pagenum,
					},
				})
				if (res.status !== 200) {
					if (res.status === 1004 || 1005 || 1006 || 1007) {
						window.sessionStorage.clear()
						this.$router.push('/login')
					}
					this.$message.error(res.message)
				}
				this.userlist = res.data
				this.pagination.total = res.total
			},
			// 远程加载数据时更改分页
			handleTableChange(pagination, filters, sorter) {
				var pager = {
					...this.pagination
				}
				pager.current = pagination.current
				pager.pageSize = pagination.pageSize
				this.queryParam.pagesize = pagination.pageSize
				this.queryParam.pagenum = pagination.current

				if (pagination.pageSize !== this.pagination.pageSize) {
					this.queryParam.pagenum = 1
					pager.current = 1
				}
				this.pagination = pager
				this.getUserList()
			},
			// 删除用户
			deleteUser(id) {
				this.$confirm({
					title: '提示：请再次确认',
					content: '确定要删除该用户吗？一旦删除，无法恢复',
					onOk: async () => {
						const {
							data: res
						} = await this.$http.delete(`user/${id}`)
						if (res.status != 200) return this.$message.error(res.message)
						this.$message.success('删除成功')
						this.getUserList()
					},
					onCancel: () => {
						this.$message.info('已取消删除')
					},
				})
			},
			// 新增用户
			addUserOk() {
				this.$refs.addUserRef.validate(async (valid) => {
					if (!valid) return this.$message.error('参数不符合要求，请重新输入')
					const {
						data: res
					} = await this.$http.post('user/add', {
						username: this.newUser.username,
						password: this.newUser.password,
						role: this.newUser.role,
					})
					if (res.status != 200) return this.$message.error(res.message)
					this.$refs.addUserRef.resetFields()
					this.addUserVisible = false
					this.$message.success('添加用户成功')
					this.getUserList()
				})
			},
			addUserCancel() {
				this.$refs.addUserRef.resetFields()
				this.addUserVisible = false
				this.$message.info('新增用户已取消')
			},


			// 编辑用户
			async editUser(id) {
				this.editUserVisible = true
				const {
					data: res
				} = await this.$http.get(`user/${id}`)
				this.userInfo = res.data
				this.userInfo.id = id
			},
			editUserOk() {
				this.$refs.addUserRef.validate(async (valid) => {
					if (!valid) return this.$message.error('参数不符合要求，请重新输入')
					const {
						data: res
					} = await this.$http.put(`users/${this.userInfo.id}`, {
						username: this.userInfo.username,
						role: this.userInfo.role,
					})
					if (res.status != 200) return this.$message.error(res.message)
					this.editUserVisible = false
					this.$message.success('更新用户信息成功')
					this.getUserList()
				})
			},
			editUserCancel() {
				this.$refs.addUserRef.resetFields()
				this.editUserVisible = false
				this.$message.info('编辑已取消')
			},
			adminChange(checked) {
				if (checked) {
					this.userInfo.role = 1
				} else {
					this.userInfo.role = 2
				}
			},

		}
	}
</script>

<style scoped>
	.userCard {
		background-color: #fff;
		margin: 10px 10px;
	}

	.userTable {
		margin-top: 10px;
	}
</style>
