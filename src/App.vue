<template>
<!--  <nav>-->
<!--    <router-link to="/">Home</router-link> |-->
<!--    <router-link to="/about">About</router-link>-->
<!--  </nav>-->
  <router-view/>
</template>

<script setup lang="ts">
import axios from 'axios'
import {onMounted} from "vue";

import * as echarts from 'echarts'
import { provide } from 'vue'
provide('ec',echarts) //provide
function testAxios1():void
{
  const url="http://127.0.0.1:8800/getitem";
  axios.get(url)
      .then(response=>{
        if (response.data) {console.log(response.data)}})
      .catch(err=>{console.log('Error')})
}

function testAxios2():void
{
  const url="http://127.0.0.1:8800/getitems";
  axios.get(url,{params:{ID:'12',name:'tom'}}).then(response=>{
    if (response.data) {console.log(response.data)}
  }).catch(err=>{alert('Error')})
}

onMounted(()=>{testAxios1(),testAxios2();})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
