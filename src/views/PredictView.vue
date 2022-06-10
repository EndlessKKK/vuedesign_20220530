<template>
  <a-row>
    <a-col :span="6">
      <a-space direction="vertical" :size="12">
        <a-range-picker v-model:value="dateRange"/>
      </a-space>
    </a-col>
    <a-col :span="6">
      <a-select
          ref="select"
          v-model:value="NodeID"
          style="width: 120px"
          :options="options_Node"
      ></a-select>
    </a-col>
    <a-col :span="6">
      <div>
        <a-slider id="test" v-model:value="predictTime"/>
      </div>
    </a-col>
    <a-col :span="6"><a-button type="primary" @click="DataPredict">开始预测</a-button></a-col>
  </a-row>
  <a-table :columns="columns" :data-source="predict_result" bordered>
    <template #title>数据预测结果 NodeID = {{NodeID_predict}}</template>
    <template #footer>均方误差：{{MSE}}</template>
  </a-table>
  <v-chart :option="column_predict" style="height: 400px"></v-chart>
</template>

<script setup lang="ts">
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import {TitleComponent,TooltipComponent,LegendComponent} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts"
import echarts from 'echarts'
import axios from "axios";
import {computed, ref} from "vue";
import {Dayjs} from "dayjs";
import * as dayjs from "dayjs";
import type { SelectProps } from 'ant-design-vue';

const predict_result =ref([])
const predictTime = ref<number>(0)
const url_prefix = "http://127.0.0.1:8800";
const MSE = ref<number>(0)
const NodeID = ref<string>()
const dateRange = ref<[Dayjs, Dayjs]>([
  dayjs("2016-08-31"),
  dayjs("2016-09-31"),
]);
const StartDateTime = computed<string>(()=>
    dateRange.value[0].format("YYYY-MM-DD")
)
const EndDateTime = computed<string>(()=>
    dateRange.value[1].format("YYYY-MM-DD")
)
const NodeID_predict = ref<string>('0')
const DataPredict = () =>{
  console.log(NodeID)
  console.log(predictTime.value)
  axios
      .post(url_prefix+"/predict",{
        NodeID: NodeID.value,
        startDateTime:StartDateTime.value,
        endDateTime:EndDateTime.value,
        PredictTime:predictTime.value
      })
      .then(response=>{
        if (response.data) {
          console.log(response.data)
          predict_result.value = response.data['data']
          NodeID_predict.value = response.data['NodeID']
          MSE.value = response.data['MSE']
          var jsondata=JSON.parse(JSON.stringify(response.data['data']));
          console.log(jsondata)
          column_predict.value.series[0].data=[];
          column_predict.value.series[1].data=[];
          column_predict.value.xAxis.data=[];
          for(let item of jsondata){
            column_predict.value.series[0].data.push(item.Predict)
            column_predict.value.series[1].data.push(item.Practical)
            column_predict.value.xAxis.data.push(item.DataTime)
          }
        }})
      .catch(err=>{console.log('Error')})
}

const columns = [
  {
    title: 'DataTime',
    dataIndex: 'DataTime',
  },
  {
    title: 'Practical',
    dataIndex: 'Practical',
  },
  {
    title: 'Predict',
    dataIndex: 'Predict',
  },
  {
    title: '|Practical-Predict|',
    dataIndex: 'Diff'
  }
];
const column_predict = ref({
  title: { text: "数据预测结果" },
  tooltip: {},
  legend: {
    data: ['Predict', 'Practical']
  },
  xAxis: {
    type: 'category',
    data: [],
  },
  yAxis: {},
  series: [
    {
      name: "Predict",
      type: 'line',
      data: [],
    },
    {
      name: "Practical",
      type: 'line',
      data: [],
    }
  ]
});
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