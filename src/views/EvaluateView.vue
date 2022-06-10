<template>
  <a-row>
    <a-col :span="8">
      <a-range-picker v-model:value="dateRange"/>
    </a-col>
    <a-col :span="8">
      <a-select
          ref="select"
          v-model:value="NodeID"
          style="width: 120px"
          :options="options_Node"
      ></a-select>
    </a-col>
  <a-col :span="8">
    <a-button type="primary" @click="DataEvaluate">开始分析</a-button>
  </a-col>
  </a-row>
  <a-row>
    <a-col :span="12"><a-image
        :width="400"
        :src="imgsrc"
        title="相关性热力图"
    /></a-col>
    <a-col :span="12">  <a-table :columns="columns_evaluate" :data-source="evaluate_result" bordered>
      <template #title>前5个相关性大的小时对</template>
    </a-table></a-col>
  </a-row>
  <v-chart :option="UVvalue" style="height: 400px"></v-chart>
</template>

<script setup lang="ts">
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import {TitleComponent,TooltipComponent,LegendComponent} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts"
import echarts from 'echarts'
let imgurl = "";
let Uvalue = 0;
let Vvalue = 0;
const imgsrc = ref<string>("http://127.0.0.1:8800/evaluate_pic?"+Math.random())
const url_prefix = "http://127.0.0.1:8800";
import axios from "axios";
import {computed, ref} from "vue";
import {Dayjs} from "dayjs";
import * as dayjs from "dayjs";
import {SelectProps} from "ant-design-vue";
const dateRange = ref<[Dayjs, Dayjs]>([
  dayjs("2016-08-31"),
  dayjs("2016-09-31"),
]);
const NodeID = ref<string>()
const StartDateTime = computed<string>(()=>
    dateRange.value[0].format("YYYY-MM-DD")
)
const EndDateTime = computed<string>(()=>
    dateRange.value[1].format("YYYY-MM-DD")
)
const DataEvaluate = () =>{
  console.log(NodeID.value)
  axios
      .post(url_prefix+"/evaluate",{
        NodeID:NodeID.value,
        startDateTime:StartDateTime.value,
        endDateTime:EndDateTime.value
      })
      .then(response=>{
        if (response.data) {
          console.log(response.data)
          evaluate_result.value = response.data['Relation']
          imgurl = response.data['ImageSRC']
          Uvalue = response.data['Uvalue']
          Vvalue = response.data['Vvalue']
          console.log(Uvalue,Vvalue)
          UVvalue.value.series[0].data = Uvalue;
          UVvalue.value.series[1].data = Vvalue;
          imgsrc.value = imgurl + Math.random()
        }})
      .catch(err=>{console.log('Error')})
}

  const UVvalue= ref({
    title: { text: "均值与方差" },
    legend: {
      data: ['均值', '方差']
    },
    tooltip: {},
    xAxis: {
      data: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"],
    },
    yAxis: {},
    series: [
      {
        name: "均值",
        type: "bar",
        data: [],
      },
      {
        name: "方差",
        type: "bar",
        data: [],
      }
    ]
  });

const columns_evaluate = [
  {
    title: 'hour1',
    dataIndex: 'hour1',
  },
  {
    title: 'hour2',
    dataIndex: 'hour2',
  },
  {
    title: 'corr',
    dataIndex: 'corr',
  },
];
const evaluate_result = ref([])
const options_Node = ref<SelectProps['options']>([
  {
    value: '1163938587',
    label: '1163938587',
  },
  {
    value: '1472527383',
    label: '1472527383',
  }
]);
</script>

<style scoped>

</style>