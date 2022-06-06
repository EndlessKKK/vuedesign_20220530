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
    <a-range-picker v-model:value="datetimeRange" @change="dateChange"/>
  </a-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { message } from 'ant-design-vue';
import { UploadOutlined } from '@ant-design/icons-vue';
import type { UploadChangeParam } from 'ant-design-vue';
import * as dayjs from 'dayjs'
import type { Dayjs } from 'dayjs';
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
  console.log(datetimeRange.value[0].format("YYYY-MM-DD"),datetimeRange.value[1].format("YYYY-MM-DD"));
}

</script>