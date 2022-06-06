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
    <a-range-picker v-model:value="datetimeRange" show-time @change="dateChange"/>
  </a-space>
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

<script setup lang="ts">
import {computed, ref} from 'vue'
import { message } from 'ant-design-vue';
import { UploadOutlined } from '@ant-design/icons-vue';
import type { UploadChangeParam } from 'ant-design-vue';
import * as dayjs from 'dayjs'
import type { Dayjs } from 'dayjs';
import axios from "axios";
const StartDateTime = computed<string>(()=>
    datetimeRange.value[0].format("YYYY-MM-DD HH:mm:ss")
)
const EndDateTime = computed<string>(()=>
    datetimeRange.value[1].format("YYYY-MM-DD HH:mm:ss")
)
const datetimeRange = ref<[Dayjs, Dayjs]>([
    dayjs("2016-08-31"),
    dayjs("2016-09-31"),
]);
const handleChange = (info: UploadChangeParam) => {
  if (info.file.status !== 'uploading') {
    console.log(info.file, info.fileList);
  }
  if (info.file.status === 'done') {
    message.success(`${info.file.response.message} file uploaded successfully`);
    //console.log(info.file.response);
  } else if (info.file.status === 'error') {
    message.error(`${info.file.name} file upload failed.`);
  }
};
const dateChange = () =>{
  console.log(datetimeRange.value[0].format("YYYY-MM-DD HH:mm:ss"),datetimeRange.value[1].format("YYYY-MM-DD HH:mm:ss"));
  query();
}

const url_prefix = "http://127.0.0.1:8800";
const url="http://127.0.0.1:8800/data";
const data=ref([])
axios.get(url)
    .then(response=>{
      if (response.data) {
        console.log(response.data)
        data.value=response.data
      }})
    .catch(err=>{console.log('Error')})

function query():void{
  console.log(StartDateTime.value, EndDateTime.value)
  axios
      .post(url_prefix+"/query",{
        filename:"a.xls",
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

</script>