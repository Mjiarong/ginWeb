import Vue from 'vue'

import {
	ConfigProvider,
  Button,
  FormModel,
  Input,
  Icon,
  message,
} from 'ant-design-vue'

message.config({
  top: `60px`,
  duration: 2,
  maxCount: 3
})

Vue.prototype.$message = message

Vue.use(ConfigProvider)
Vue.use(Button)
Vue.use(FormModel)
Vue.use(Input)
Vue.use(Icon)
