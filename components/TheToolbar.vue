<template>
  <nav
    id="toolbar"
    :class="{
      'toolbar-hide': scroll.pos > 100,
    }"
  >
    <!-- 
    // 仅滑到顶部时显示工具栏
    :class="{
      'toolbar-hide': scroll.pos > 100,
    }"
    // 上滑时显示工具栏
    :class="{
      'toolbar-hide': scroll.change > 0,
      'toolbar-bg': scroll.pos > 100,
    }" -->
    <div class="toolbar-title" @click="$router.push('/')">{{ title }}</div>
    <div class="toolbar-spacer"></div>
    <ul class="toolbar-menu" :class="{ 'menu-dark': scroll.pos > 100 }">
      <li @click="$router.push('/')"><i class="fa fa-home"></i>主页</li>
      <li @click="$router.push('/timeline')"><i class="fa fa-list"></i>归档</li>
      <li @click="$router.push('/links')"><i class="fa fa-at"></i>友链</li>
      <li @click="$router.push('/projects')">
        <i class="fa fa-file-code-o"></i>项目
      </li>
    </ul>
    <div class="toolbar-spacer"></div>
  </nav>
</template>

<script>
export default {
  data: () => ({
    title: "雫『Shizuku』",
  }),
  computed: {
    scroll() {
      return this.$store.getters.scroll;
    },
  },
};
</script>
<style lang="scss">
#toolbar {
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  color: var(--text);
  width: 100%;
  height: 4rem;
  padding: 0 2rem;
  background: transparent;
  transition: all 0.3s linear;
  z-index: 9;
  &.toolbar-hide {
    transform: translateY(-100%);
  }
  &.toolbar-bg {
    color: rgba(63, 63, 63, 1);
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 0 8px grey;
  }
}

.toolbar-title {
  font-size: 1.2rem;
  font-family: InfoDisplay;
  font-weight: 500;
  padding-right: 2rem;
  cursor: pointer;
}

.toolbar-menu {
  display: flex;
  justify-content: center;
  align-items: center;
  li {
    line-height: 3rem;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: .33rem .33rem 0 0;
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
      border-bottom: var(--theme-primary) solid 2px;
      transition: width 0.2s ease-in-out;
    }
    i {
      padding-right: 0.25rem;
      font-size: 1.1rem;
    }
  }
  &.menu-dark li {
    &:hover {
      background: var(--theme-primary);
    }
    &::after {
      border-bottom: var(--black) solid 2px;
    }
  }
}

.toolbar-spacer {
  flex-grow: 1;
}

@media screen and (max-width: 768px) {
  .toolbar-title {
    display: none;
  }
}
</style>