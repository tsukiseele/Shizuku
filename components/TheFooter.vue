<template lang="pug">
#footer
  .footer-wrap
    .footer-info
      p © {{ new Date().getFullYear() }} by 
        a.info--developer(href="https://github.com/tsukiseele" target="_blank") TsukiSeele 
        | All Rights Reserved.
      p Powered by 
        a.info--nuxtjs(href="https://nuxtjs.org/" target="_blank") Nuxt.js
        |.
        span.info--spacer |
        |Theme 
        a.info--theme(href="https://github.com/tsukiseele/shizuku" target="_blank") Shizuku
        |.
</template>

<script>
export default {
  data: () => ({

  })
};
</script>

<style lang="scss" scoped>
#footer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  font-family: InfoDisplay;
  background-color: rgba(0, 0, 0, .8);
  color: white;
}

.footer-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}


.info--developer {
  color: #b854d4;
}

.info--nuxtjs {
  color: #00c58e;
}

.info--theme {
  color: rgba(139, 207, 222, 1);
}

.info--spacer {
  margin: 0 .5rem;
}

</style>