<template lang="pug">
  #app
    TheHeader
    TheToolbar
    Nuxt
</template>

<script>

export default {

  data: () => ({
    
  }),
  created() {
  },
  mounted() {
    }
}
</script>

<style lang="scss" scoped>
#app {
  position: relative;
  &::before {
    content: '';
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
    background: url(/bg.jpg);
    background-attachment: fixed;
  }
}

</style>
