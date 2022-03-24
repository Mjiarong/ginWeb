import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import Message from 'vue-multiple-message'

Vue.use(Vuetify);
Message.config({
  top: 60,
  duration: 3000,
  zIndex: 2000
})
Vue.prototype.$message = Message

export default new Vuetify({
});
