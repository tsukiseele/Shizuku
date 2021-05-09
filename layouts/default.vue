<template lang="pug">
#app
  TheToolbar
  TheHeader(:title="header.title", :subtitle="header.subtitle", :isFull="header.isFull" :isHide="header.isHide")
  Nuxt
  TheBackTop
  TheFooter
</template>

<script>
export default {
  data: () => ({
  }),
  computed: {
    header() {
      return this.$store.state.header;
    },
  },
  methods: {
    handleScroll() {
      const newPos =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      const scroll = this.$store.getters.scroll;
      this.$store.commit("scroll", {
        pos: newPos,
        change: scroll && scroll.pos ? newPos - scroll.pos : 0,
      });
    },
    // 夜晚改变主题
    changeTheme() {
      var hour = new Date().getHours();
      if (hour < 7 || hour > 19) {
        document.getElementsByTagName("html")[0].setAttribute("theme", "dark");
      }
    },
  },
  beforeMount() {
    this.changeTheme();
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    /*
    if (process.client) {
      console.log(this.$mobile());
    }*/
  },
};
</script>

<style lang="scss" scoped>
#app {
  position: relative;
  &::before {
    content: "";
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
    background: url(https://cdn.jsdelivr.net/gh/tsukiseele/awsl.re/static/bg/1.webp);
    background-attachment: fixed;
    background-position: center;
    background-size: cover;
    filter: brightness(0.8);
  }
  background: var(--bg);
}
</style>
