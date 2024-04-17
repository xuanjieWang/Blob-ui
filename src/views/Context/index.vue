<!--页面-->
<template>
  <div class="main">
    <div class="info">
      <p>你好, 我是</p>
      <p>王玄杰</p>
      <p>一名全栈开发工程师</p>
      <p>喜欢<span class="java">Java</span>、<span class="Python">Python</span>、<span class="Go">Go</span><span>&nbsp;和&nbsp;</span><span class="Vue">Vue</span>、<span class="React">React</span></p>
      <p>我在这个网站记录我的成长，努力 💪 成为一个更好的程序员</p>
    </div>
  </div>
</template>

<script setup></script>
<style scoped>
.main {
  width: 65%;
  height: 100vh;
  margin-left: 16%;
  margin-right: 10%;
}
.info {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  position: relative;
  top: 28%;
  width: 100%;
  color: #fff;
}
.info p:first-of-type {
  font-size: 1.6rem;
}
.info p:nth-of-type(2) {
  font-size: 2.8rem;
  color: #25c8ef;
  font-weight: 700;
}
.info p:nth-of-type(3) {
  font-size: 1.6rem;
  color: #fff;
}
.info p:nth-of-type(4) {
  font-size: 1.4rem;
  color: #fff;
}
.info p:nth-of-type(5) {
  font-size: 1rem;
  color: #fff;
}
.java {
  background-image: linear-gradient(to right, #cc6600, #ffaa33);
  -webkit-background-clip: text;
  color: transparent;
}
.Python {
  background-image: linear-gradient(to right, #00aa00, #33ff33);
  -webkit-background-clip: text;
  color: transparent;
}
.Go {
  background-image: linear-gradient(to right, #0000aa, #0000ff);
  -webkit-background-clip: text;
  color: transparent;
}
.Vue {
  background-image: linear-gradient(to right, #00ff99, #77ffcc);
  -webkit-background-clip: text;
  color: transparent;
}
.React {
  background-image: linear-gradient(to right, #5555ff, #5555ff);
  -webkit-background-clip: text;
  color: transparent;
}
</style>
