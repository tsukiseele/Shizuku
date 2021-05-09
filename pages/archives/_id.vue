<template lang="pug">
#container
  main#main
    .article
      .banner
        img.bg(v-if="article.articleCover", :src="article.articleCover") 
        .header
          .title(v-text="article.articleTitle")
          ul.tags
            Button.tag(v-for="(tag, i) in tags", :key="i") {{ tag }}
      .markdown
        MarkdownPreview(v-model="article.articleContent")
      Comment(:comments="comments")
</template>

<script>
export default {
  data: () => ({
    markdown: {
      toolbars: {
        fullscreen: false,
      },
    },
    article: {},
    comments: {},
  }),
  fetch() {
    this.$store.commit("header", {
      // title: this.article.articleTitle || "无题",
      isHide: true,
    });
  },
  async asyncData({ app, params }) {
    let id = params.id || 0;
    let article = {};
    let comments = {};
    try {
      const articleRes = await app.$api.getArticleById(id);
      const commentRes = await app.$api.getCommentTree(id);
      article = articleRes;
      comments = commentRes;
    } catch (e) {
      console.log(e);
    }
    return {
      article,
      comments,
    };
  },
  computed: {
    tags() {
      if (this.article.articleTags) return this.article.articleTags.split(" ");
    },
  },
};
</script>

<style lang="scss" scoped>
#container {
}

#main {
}

.article {
}

.banner {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 66vh;
  @media screen and (max-width: 768px) {
    height: 33vh;
  }
  /* 遮罩层*/
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: var(--header);
  }
  /* 图片实体 */
  .bg {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .header {
    z-index: 1;
    .title {
      color: var(--text-primary);
      font-size: 2rem;
      font-family: InfoDisplay;
      text-shadow: 0 1px 6px var(--text-primary);
    }
    .tags {
      list-style: none;
      /*
      .tag {
        display: inline-block;
        color: var(--text-primary);
        font-size: 0.8rem;
        line-height: 1.5rem;
        padding: 0 1rem;
        margin: 0.5rem 0.1rem;
        border: gainsboro solid thin;
        border-radius: 1rem;
        transition: background 0.3s ease;
        cursor: pointer;
        &:hover {
          background: gainsboro;
        }
      }*/
    }
  }
}
.markdown {
  filter: invert(100%);
}
</style>