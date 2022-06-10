<template>
  <div class="chess">
    <h1>{{my_title}}</h1>
    <div id="btn_title" style="text-align:center">
      <button v-on:click="changetitle">修改标题</button>
    </div>
    <div id="btn_size" style="text-align:center">
      <button v-on:click="changesize">修改大小</button>
    </div>
    <div class="container">
      <div id="bord" class="game-board x">
        <div class="row">
          <div class="cell" v-bind:style=my_style @click="fun1('1 1')"></div>
          <div class="cell" v-bind:style=my_style @click="fun1('1 2')"></div>
          <div class="cell" v-bind:style=my_style @click="fun1('1 3')"></div>
        </div>
        <div class="row">
          <div class="cell" v-bind:style=my_style @click="fun1('2 1')"></div>
          <div class="cell" v-bind:style=my_style @click="fun1('2 2')"></div>
          <div class="cell" v-bind:style=my_style @click="fun1('2 3')"></div>
        </div>
        <div class="row">
          <div class="cell" v-bind:style=my_style @click="fun1('3 1')"></div>
          <div class="cell" v-bind:style=my_style @click="fun1('3 2')"></div>
          <div class="cell" v-bind:style=my_style @click="fun1('3 3')"></div>
        </div>
      </div>
    </div>
    <!-- 游戏获胜信息面板 -->
    <div id="message" class="game-message">
      <p id="winner">X 赢了！</p>
      <button id="restart">重新开始</button>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { gb_style } from "./gb_style"

const my_title = ref<string>("Tic Tac Toe");
const my_style = ref<gb_style>({
  fontSize : "88px",
});
const changetitle = ():void =>{
  my_title.value = (my_title.value=='Tic Tac Toe')?"物联网1901朱文涛":"Tic Tac Toe"
}
const changesize = ():void =>{
  my_style.value['fontSize'] = (my_style.value['fontSize']=='88px')?'44px':'88px';
}
import { defineProps, defineEmits } from 'vue';
defineProps({
  my_title:
      {
        type: String,
        required: true
      },
  my_style:
      {
        type: Object,
        required: true
      }
})
const emit = defineEmits(['scan_pos'])
function fun1(val:string){
  emit('scan_pos',val)
}

</script>

<style>
p {
  margin: 0;
}

body {
  background-color: #f9f2e7;
}

/* 标题 */
h1 {
  text-align: center;
  font-size: 60px;
  color: #477998;
}

/* 游戏内容容器 */
.container {
  position: relative;
  width: 471px;
  height: 471px;
  margin: 0 auto;
}

/* 游戏获胜信息面板 */
.game-message {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(69, 133, 136, 0.4);
  text-align: center;
}

/* winner 获胜者 */
.game-message p {
  margin: 180px 0 40px 0;
  color: #fff;
  font-size: 50px;
}

/* 重新开始游戏按钮 */
.game-message button {
  color: #517304;
  border-color: #517304;
  width: 110px;
  height: 40px;
  font-size: 20px;
  cursor: pointer;
}

/* 游戏面板棋盘 */
.game-board {
  width: 471px;
  height: 471px;
}
.game-board.x .cell:not(.x):not(.o):hover::before {
  content: 'X';
  color: lightgray;
}
.game-board.o .cell:not(.x):not(.o):hover::before {
  content: 'O';
  color: lightgray;
}

/* 棋盘 - 行 */
.row {
  display: flex;
}
.row:last-child .cell {
  border-bottom: 0;
}

/* 棋盘 - 单元格 */
.cell {
  flex: 1;
  box-sizing: border-box;
  width: 157px;
  height: 157px;
  line-height: 157px;
  border-right: 6px solid #546363;
  border-bottom: 6px solid #546363;
  text-align: center;
  cursor: pointer;
  font-size: 88px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, sans-serif;
}
.cell:last-child {
  border-right: 0;
}

/* x 玩家 */
.cell.x::before {
  content: 'X';
  color: #01a8c6;
}
/* o 玩家 */
.cell.o::before {
  content: 'O';
  color: #8fbe01;
}

</style>
