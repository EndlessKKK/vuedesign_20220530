<template>

  <a-upload
      v-model:file-list="fileList"
      name="file"
      action=" http://127.0.0.1:8800/file"
      :headers="headers"
      @change="handleChange"
  >
    <a-button>
      <upload-outlined></upload-outlined>
      Click to Upload
    </a-button>
  </a-upload>
  <a-space direction="vertical" :size="12">
    <a-range-picker v-model:value="datetimeRange" show-time @change="datetimeChange"/>
  </a-space>
  <a-table :columns="columns" :data-source="data" bordered>
    <template #title>筛选数据</template>
  </a-table>
  <a-space direction="vertical" :size="12">
    <a-date-picker v-model:value="datePick" @change="dateChange"/>
  </a-space>
  <a-row>
    <a-col :span="8"><v-chart :option="column1" style="height: 400px"></v-chart></a-col>
    <a-col :span="8"><v-chart :option="column2" style="height: 400px"></v-chart></a-col>
    <a-col :span="8"><v-chart :option="column3" style="height: 400px"></v-chart></a-col>
  </a-row>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue'
import { message } from 'ant-design-vue';
import { UploadOutlined } from '@ant-design/icons-vue';
import type { UploadChangeParam } from 'ant-design-vue';
import * as dayjs from 'dayjs'
import type { Dayjs } from 'dayjs';
import axios from "axios";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import {TitleComponent,TooltipComponent,LegendComponent} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts"
import echarts from 'echarts'
let datafilename="";


const StartDateTime = computed<string>(()=>
    datetimeRange.value[0].format("YYYY-MM-DD HH:mm:ss")
)
const EndDateTime = computed<string>(()=>
    datetimeRange.value[1].format("YYYY-MM-DD HH:mm:ss")
)
const dateTime = computed<string>(()=>
    datePick.value.format("YYYY-MM-DD")
)
const datetimeRange = ref<[Dayjs, Dayjs]>([
    dayjs("2016-08-31"),
    dayjs("2016-09-31"),
]);
const datePick = ref<Dayjs>(dayjs('2016-08-31'));
const handleChange = (info: UploadChangeParam) => {
  if (info.file.status !== 'uploading') {
    console.log(info.file, info.fileList);
  }
  if (info.file.status === 'done') {
    message.success(`${info.file.response.message} file uploaded successfully`);
    datafilename = info.file.name;
    console.log(datafilename)
    //console.log(info.file.response);
  } else if (info.file.status === 'error') {
    message.error(`${info.file.name} file upload failed.`);
  }
};
const datetimeChange = () =>{
  console.log(datetimeRange.value[0].format("YYYY-MM-DD HH:mm:ss"),datetimeRange.value[1].format("YYYY-MM-DD HH:mm:ss"));
  query();
}

const dateChange = () =>{
  console.log(dateTime.value)
  QueryAndDraw()
  console.log(querydata)

}

const url_prefix = "http://127.0.0.1:8800";
const url="http://127.0.0.1:8800/data";
const data=ref([])
let querydata = []
// axios.get(url)
//     .then(response=>{
//       if (response.data) {
//         console.log(response.data)
//         data.value=response.data
//       }})
//     .catch(err=>{console.log('Error')})

function query():void{
  console.log(StartDateTime.value, EndDateTime.value)
  axios
      .post(url_prefix+"/query",{
        filename:datafilename,
        startDateTime:StartDateTime.value,
        endDateTime:EndDateTime.value
      })
      .then(response=>{
        if (response.data) {
          console.log(response.data)
          data.value=response.data
        }})
      .catch(err=>{console.log('Error')})
}

function QueryAndDraw():void{
  let max_data = 0
  console.log(dateTime.value)
  axios
      .post(url_prefix+"/queryanddraw",{
        filename:datafilename,
        DateTime:dateTime.value
      })
      .then(response=>{
        if (response.data) {
          console.log(response.data)
          querydata=response.data
          var jsondata=JSON.parse(JSON.stringify(querydata));
          column1.value.radar.indicator = []
          column1.value.series[0].data[0].value = [];
          column3.value.xAxis.data = [];
          column3.value.series[0].data = [];
          column2.value.xAxis.data = [];
          column2.value.series[0].data = [];
          for(let item of jsondata){
            if(item.fValueData>max_data)
            {
              max_data = item.fValueData
            }
          }
          for(let item of jsondata){
            column1.value.radar.indicator.push({name: item.DataTime, max:max_data})
            column1.value.series[0].data[0].value.push(item.fValueData)
            column2.value.series[0].data.push(item.fValueData)
            column3.value.series[0].data.push(item.fValueData)
            column2.value.xAxis.data.push(item.DataTime)
            column3.value.xAxis.data.push(item.DataTime)
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
    title: 'fValueData',
    dataIndex: 'fValueData',
  },
];

const column1 = ref({
  title: {
    text: '雷达图'
  },
  radar: {
    // shape: 'circle',
    indicator: [{ name: '0', max: 1 },
    ]
  },
  series: [
    {
      name: 'Budget vs spending',
      type: 'radar',
      data: [
        {
          value: [],
          name: 'fValueData'
        }
      ]
    }
  ]
});

const column2 = ref({
  title: { text: "柱状图" },
  tooltip: {},
  xAxis: {
    data: [],
  },
  yAxis: {},
  series: [
    {
      name: "fValuedata",
      type: "bar",
      data: [],
    }
  ]
});

const column3 = ref({
  title: { text: "折线图" },
  tooltip: {},
  xAxis: {
    type: 'category',
    data: [],
  },
  yAxis: {},
  series: [
    {
      name: "fValuedata",
      type: 'line',
      data: [],
    }
  ]
});

</script>