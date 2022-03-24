<template>
  <div>
    <div class="d-flex justify-center pa-3 ma-1 text-h4 font-weight-bold">{{ artInfo.title }}</div>
    <div class="d-flex justify-center align-center">
      <div class="d-flex mx-10 justify-center">
        <v-icon class="mr-1" color="indigo" small>
          {{
          'mdi-calendar-month'
          }}
        </v-icon>
        <span>{{ artInfo.CreatedAt | dateformat('YYYY-MM-DD') }}</span>
      </div>
    </div>
    <v-divider class="pa-3 ma-3"></v-divider>
    <v-alert
      class="ma-4"
      elevation="1"
      color="indigo"
      dark
      border="left"
      outlined
    >{{ artInfo.desc }}</v-alert>

    <div v-html="artInfo.content" class="content ma-5 pa-3 text-justify"></div>
    <v-divider class="ma-5"></v-divider>
  </div>
</template>
<script>
export default {
  props: ['id'],
  data() {
    return {
      artInfo: {},
      total: 0,
      headers: {
        username: '',
        user_id: 0
      },
      queryParam: {
        pagesize: 5,
        pagenum: 1
      }
    }
  },
  created() {
    this.getArtInfo()
  },
  methods: {
    // 查询文章
    async getArtInfo() {
      const { data: res } = await this.$http.get(`article/${this.id}`)
      this.artInfo = res.data
    },
  }
}
</script>
<style scoped>
span {
  width: auto;
  max-width: 100%;
}

</style>