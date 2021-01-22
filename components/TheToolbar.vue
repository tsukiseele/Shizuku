<template>
  <div
    class="toolbar"
    :class="{
      'toolbar-hide': scroll.change > 0,
      'toolbar-bg': scroll.position > 100,
    }"
  >
    <div class="toolbar--title">{{ title }}</div>
    <div class="toolbar--spacer"></div>
    <ul class="toolbar--menu">
      <li @click="$router.push('/')"><i class="fa fa-home"></i>主页</li>
      <li @click="$router.push('/timeline')"><i class="fa fa-list"></i>归档</li>
      <li @click="$router.push('/friends')"><i class="fa fa-at"></i>关于</li>
    </ul>
    <div class="toolbar--spacer"></div>
  </div>
</template>

<script>
export default {
  data: () => ({
    title: "雫『Shizuku』",
    scroll: {
      // timer: null,
      position: 0,
      // endPos: 0,
      change: 0,
    },
  }),
  methods: {
    handleScroll() {
      let currentPos =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      this.scroll.change = currentPos - this.scroll.position;
      this.scroll.position = currentPos;
      // startPos == 0 标志着滚动开始
      /*
      if (this.scroll.startPos == 0) {
        this.scroll.startPos =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
      }
      // 函数防抖
      if (this.scroll.timer) {
        clearTimeout(this.scroll.timer);
      }
      // 100ms后判定滚动结束
      this.scroll.timer = setTimeout(() => {
        this.scroll.endPos =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
        // 执行动作
        this.scroll.change = this.scroll.endPos - this.scroll.startPos
        // 滚动动作结束，将startPos重置
        this.scroll.startPos = 0;
      }, 100);
      */
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
};
</script>
<style lang="scss">
.toolbar {
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  color: aliceblue;
  width: 100%;
  height: 4rem;
  padding: 0 2rem;
  background: transparent;
  transition: all 0.3s linear;
  &.toolbar-hide {
    transform: translateY(-100%);
  }
  &.toolbar-bg {
    background: rgba(255, 255, 255, 0.9);
    color: rgba(63, 63, 63, 1);
  }
}

.toolbar--title {
  font-size: 1.2rem;
  font-weight: 500;
  padding-right: 2rem;
  cursor: pointer;
}

.toolbar--menu {
  display: flex;
  justify-content: center;
  align-items: center;
  li {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.25rem;
    padding: 0.25rem 1rem;
    height: 100%;
    cursor: pointer;
    transition: background 0.2s ease-in-out;
    &:hover {
      background: rgba(255, 255, 255, 0.2);
      &::after {
        width: 100%;
        left: 0;
      }
    }
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      right: 0;
      width: 0;
      border-bottom: skyblue solid 2px;
      transition: width 0.2s ease-in-out;
    }
    i {
      padding-right: 0.25rem;
      font-size: 1.1rem;
    }
  }
}

.toolbar--spacer {
  flex-grow: 1;
}
</style>