<template>
  <div class="home">
    <chessboard v-bind:my_title=my_title v-bind:my_style=my_style @scan_pos = "fun1"></chessboard>
  </div>
  <div>
    <img src="http://127.0.0.1:8800/user">
  </div>
</template>

<script setup lang="ts">
import chessboard from '@/views/ChessBoard.vue'; // @ is an alias to /src
import { ref } from 'vue'
const my_style = ref({
  fontSize : "22px",
});
const my_title = ref<string>("Tic Tac Toe")

function fun1(val:string)
{
  console.log(val)
}
</script>