<template>
  <div id="index" class="_index">

    <!--头部标题-->
    <header class="indexHead">
      <heada/>
    </header>

    <!--内容-->
    <div class="indexContainer">
      <img mode="widthFix" class="banner_img" lazy-load src="/static/images/source.png" alt="">
      <div class="banenr_text">
        <p v-html="text"></p>
      </div>
    </div>


    <!--底部导航-->
<!--    <footer>-->
<!--      <footer_btn/>-->
<!--    </footer>-->


  </div>

</template>

<script>
  import heada from "@/components/heada"
  // import footer_btn from "@/components/footer_btn"

  export default {
    data() {
      return {
        text: '系统维度艺术一直致力于幼儿、青少年艺术教育传播，\n' +
          '          以及系统的美术课程研发和创新。开设课程分为少儿成长阶梯课程、\n' +
          '          少儿专业特色课程、少儿艺术托管课程。将艺术审美、绘画兴趣、\n' +
          '          内心感悟三者融入课堂教学，秉持“实现艺术美的生活化”为核心理念，\n' +
          '          培养孩子们发现美、表现美的能力，以及通过学习艺术养成良好的行为习惯，\n' +
          '          提升思维能力、审美情趣等综合素质，培养健全人格和个人魅力。'
      }
    },

    components: {
      heada,
      // footer_btn
    },
  }

</script>

<style scoped>
  .indexHead {
    background-color: #7f8971;
  }

  .indexContainer {
    display:flex;
    flex-direction: column;
    align-items: center;
  }

  .banner_img {
    /*1125px x 843px
      高=百分百*原图的高/原图的宽
    */
    width:750rpx;
  }

  .banenr_text {
    margin: 0 6%;
  }

  .banenr_text p {
    /*font-size: 12px;*/
    font-size: calc(750rpx * 12 / 375);
    font-weight: 300;
    color: #7f8971;
  }
</style>

