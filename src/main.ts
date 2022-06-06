import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { DatePicker } from "ant-design-vue";
import Antd from 'ant-design-vue'
import "ant-design-vue/dist/antd.css"; // or 'ant-design-vue/dist/antd.less'
import {Layout, Menu} from 'ant-design-vue'
import * as echarts from 'echarts'
createApp(App).use(Antd).use(router,DatePicker).use(Menu).use(Layout).use(DatePicker).mount('#app')

