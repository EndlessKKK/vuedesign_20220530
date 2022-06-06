<template>
  <v-chart :option="option_column" style="height: 400px"></v-chart>

  <button v-on:click="changeData">changeData</button>
  <a-table :columns="columns" :data-source="data" bordered>
    <template #bodyCell="{ column, text }">
      <template v-if="column.dataIndex === 'NodeID'">
        <a>{{ text }}</a>
      </template>
    </template>
    <template #title>表头测试 </template>
    <template #footer>表尾测试 </template>
  </a-table>
</template>

<script  setup lang="ts">
import { message } from 'ant-design-vue';
import { UploadOutlined } from '@ant-design/icons-vue';
import {  ref,onMounted } from 'vue';
import axios from 'axios'
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import {TitleComponent,TooltipComponent,LegendComponent} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts"
import echarts from 'echarts'

const url="http://127.0.0.1:8800/data";
const data=ref([])
axios.get(url)
    .then(response=>{
      if (response.data) {
        console.log(response.data)
        data.value=response.data
      }})
    .catch(err=>{console.log('Error')})


function changeData():void {
  console.log(data.value[0]['NodeID'])
  data.value[0]['NodeID']="111"
}


const columns = [
  {
    title: 'NodeID',
    dataIndex: 'NodeID',
  },
  {
    title: 'fValueData',
    className: 'column-money',
    dataIndex: 'fValueData',
  },
  {
    title: 'DataTime',
    dataIndex: 'DataTime',
  },
];


const option_column= ref({
  title: { text: "柱状图" },
  tooltip: {},
  xAxis: {
    data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
  },
  yAxis: {},
  series: [
    {
      name: "销量",
      type: "bar",
      data: [5, 20, 36, 10, 10, 20],
    },
    {
      name: "销2量",
      type: "bar",
      data: [15, 20, 36, 10, 10, 20],
    }
  ]
});

option_column.value.series[1].data[1]=18

</script>

<style>

</style>