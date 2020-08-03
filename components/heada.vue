<template>
  <header>
    <img model="aspectFill" class="head_title" src="/static/images/head2.png" alt=""/>
  </header>
</template>


<style lang="scss">
  header {
    display: flex;
    flex-direction: column;
    align-items: center;
    .head_title {
      padding-top: 58rpx;
      /*318*76*/
      width: calc(750rpx * 106 / 375);
      height: calc(750rpx * 26 / 375);
    }
  }

</style>

