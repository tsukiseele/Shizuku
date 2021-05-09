<template lang="pug">
#container
  main#main
    .post
      .error(v-if="error") {{ error }}
      PostItem(
        v-for="(item, index) in articles",
        :key="index",
        :item="item",
        :to="`/archives/${item.articleId}`",
        :placeholder="placeholder",
        :data-aos="index % 2 == 0 ? 'fade-left' : 'fade-right'",
        data-aos-once="true"
      )
      .post-btn-next(
        v-if="page > 0",
        :class="{ 'post-btn-bottom': page < 0 }",
        @click="handleNextPage()"
      ) 
        span {{ page > 0 ? 'NEXT' : '已到底部' }}
    .aside-wrap
      TheAside(:icon="icon", :class="asideClasses", :style="asideStyles")
</template>

<script>
export default {
  data: () => ({
    icon: "https://cdn.jsdelivr.net/gh/tsukiseele/awsl.re/static/icon/icon.png",
    placeholder:
      "https://cdn.jsdelivr.net/gh/tsukiseele/awsl.re/static/icon/akarin.png",
    page: null,
    articles: null,
    error: null,
    // 侧栏
    asideStyles: {},
    asideClasses: {},
    asidePos: null,
  }),
  watch: {
    /**
     * 监听滚动事件,处理侧边栏的固定方式
     */
    scroll() {
      if (process.client) {
        const rem = parseInt(
          window.getComputedStyle(document.documentElement)["fontSize"]
        );
        const aside = document.getElementById("aside");
        const asideWrap = document.getElementsByClassName("aside-wrap")[0];
        const container = document.getElementById("container");
        if (aside) {
          if (this.asidePos == null) {
            this.asidePos = asideWrap.offsetTop - rem;
            this.asideStyles.width = `${aside.offsetWidth}px`;
            this.asideStyles.height = `${aside.offsetHeight}px`;
          }
          // 滚动到底部时固定在容器底部
          if (
            this.scroll.pos - this.asidePos + aside.offsetHeight + 2 * rem >
            container.offsetHeight
          ) {
            this.asideStyles.top = `${
              container.offsetHeight - aside.offsetHeight - 2 * rem
            }px`;
            return (this.asideClasses = {
              bottom: true,
            });
          }
          // 滚动超出屏幕时固定
          if (this.scroll.pos > this.asidePos) {
            this.asideStyles.top = null;
            return (this.asideClasses = {
              fixed: true,
            });
          }
        }
      }
      // 清除状态
      this.asideClasses = {};
    },
    // 监听路由改变
    $route: {
      handler(to, from) {
        // 仅客户端执行
        if (process.client) {
          // 等待视图渲染
          this.$nextTick(() => {
            // 首次被加载，设置flag，不做任何动作
            if (window.name == "") {
              window.name = "viewed";
            } else if (window.name == "viewed") {
              // 延迟执行
              setTimeout(() => {
                const ele = document.getElementById("container");
                this.$store.commit("scroll", {
                  pos: ele.offsetTop,
                  change: ele.offsetTop,
                });
                ele.scrollIntoView();
              });
            }
          });
        }
      },
      // 深度观察监听
      deep: true,
      // 路由改变后立即执行
      immediate: true,
    },
  },
  computed: {
    scroll() {
      return this.$store.state.scroll;
    },
  },
  methods: {
    async handleNextPage() {
      if (this.page < 0) return;
      const art = await this.$api.getArticlePage(++this.page, 6);
      if (art) {
        if (art.length === 0) {
          this.page = -1;
          return;
        }
        this.articles.push.apply(this.articles, art);
      }
    },
  },
  async asyncData({ app, params }) {
    let articles = [];
    let error = null;
    const page = params.post;
    try {
      articles = await app.$api.getArticlePage(page || 1, 6);
    } catch (e) {
      error = "获取数据失败！";
      console.error(e);
    }
    return {
      page,
      articles,
      error,
    };
  },
  fetch() {
    this.$store.commit("header", { title: "雫『Shizuku』", isFull: true });
  },
  mounted() {
    console.log(this.articles);
  }
};
</script>

<style lang="scss" scoped>
.aside-wrap {
  display: none;
  @media (min-width: 768px) {
    display: block;
    /** 此处调整侧边栏宽度，必须同时调整.post百分比保证总宽度为100%，否则可能发生错位以及意想不到的后果 */
    width: 27%;
    #aside {
      &.fixed {
        position: fixed;
        top: 0;
      }
      &.bottom {
        position: relative;
        float: none;
      }
    }
  }
}

.post {
  width: 100%;
  float: right;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  width: auto;

  @media (min-width: 768px) {
    width: 73%;
  }
}

/** 下一页按钮样式 */
.post-btn-next {
  position: relative;
  align-self: center;
  width: 120px;
  line-height: 40px;
  margin-top: 1rem;
  margin-bottom: 2rem;
  font-weight: 500;
  color: var(--theme-primary);
  text-align: center;
  transition: color 0.2s ease;
  z-index: 0;
  cursor: pointer;
  font-family: InfoDisplay;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: var(--bg);

    border: var(--theme-primary) solid 3px;
    transition: background 0.3s ease;
    z-index: -1;
  }
  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    width: 0;
    height: 100%;
    background: var(--theme-primary);
    transition: width 0.3s ease;
    z-index: -1;
    margin: 0;
  }

  &:hover {
    &::after {
      width: 100%;
    }
    &::before {
      background: var(--theme-primary);
    }
    color: var(--white)hite;
  }
}
</style>

