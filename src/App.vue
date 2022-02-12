<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<style lang="scss">
// import google font
// Inter 400 500 700、Noto San 400 500 700、Nunito Sans 400 700
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Noto+Sans+TC:wght@400;500;700&family=Nunito+Sans:wght@400;700&display=swap');

@import './styles/reset.css';
@import './styles/layout.scss';
// for dark mode
@import './styles/theme.scss';
@import './styles/font.css';

body {
  // mobile layout
  min-width: 375px;
  background-color: var(--body-background);

  // 去除 input[type="number"] 自帶的上下箭頭
  input[type='number'] {
    // for firefox
    -moz-appearance: textfield;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  // 按鈕圖示可被穿透
  button > svg {
    pointer-events: none;
  }

  // 控制logo字母
  .ac-logo {
    path:nth-child(-n + 9) {
      fill: var(--main-text-black);
    }
  }
}

@media screen and (min-width: $breakpoint) {
  body {
    min-width: $view-min-width;
  }
}
</style>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  components: {
    Header,
    Footer
  }
}
</script>
