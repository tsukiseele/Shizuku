<template lang="pug">
#container
  main#main
    .article
      //- .banner
      //-   img.bg(v-if="article.articleCover", :src="article.articleCover") 
      //-   .header
      //-     .title(v-text="article.articleTitle")
      //-     ul.tags
      //-       .tag(v-for="(tag, i) in tags", :key="i") 
      //-         i.tag-icon.fa.fa-tags
      //-         span.tag-text {{ tag }}
      .markdown.card
        MarkdownPreview(v-model="article.articleContent")
      .comments.card
        .comment-header {{ comments.length == 0 ? '暂无评论' : '评论' }}
        .comment-edit
          .comment-content
          .comment-username
          .comment-email
          .comment-domain
            
        Comment(:comments="comments" :reply="handleReply()")
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
      title: this.article.articleTitle || "无题",
      isHideSubtitle: true,
      // isHide: true,
    });
  },
  methods: {
    handleReply() {
      
    }
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
@media screen and(max-width: 768px) {
  .markdown, .comments {
    border-radius: 0;
  }
}
#main {
  padding: 2rem 0;
}

.article {
}

.markdown {
  overflow: hidden;
}

.comments {
  overflow: hidden;
  margin-top: 2rem;
  padding: 2rem;
  .comment-header {
    color: var(--text);
    font-size: 1.4rem;
  }
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
      color: var(--text);
      font-size: 2.4rem;
      font-family: InfoDisplay;
      line-height: 2.5rem;
    }
    .tags {
      list-style: none;
      display: flex;
      align-items: center;
      justify-content: center;
      .tag {
        display: inline-block;
        text-align: center;
        color: var(--text);
        padding: 0.1rem 0.3rem;
        transition: color 0.3s ease;
        cursor: pointer;
        font-size: 0.9rem;
        &:hover {
          color: var(--text-primary);
        }
        .tag-icon {
        }
        .tag-text {
          font-family: InfoDisplay;
          padding-left: 0.2rem;
        }
      }
    }
  }
}
</style>