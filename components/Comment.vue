<template lang="pug">
.comment-wrap
  .comment(v-for="(item, index) in comments", :key="index")
    .comment-body
      .comment-avater {{ item.visitor.visitorIcon}}
      .comment-username {{ item.visitor.visitorName }}
      .comment-date {{ item.comment.commentDatetime }}
      .comment-content {{ item.comment.commentContent }}
      input.comment-btn-reply
    .comment-reply(v-if="item.childs", :class="{ child: isIndent(99) }")
      Comment(:deep="deep + 1", :comments="item.childs", :reply="reply")
</template>

<script>
export default {
  name: "Comment",
  props: {
    comments: Array,
    reply: Function,
    deep: {
      type: Number,
      default: 1,
    },
  },
  data: () => ({
    hover: false,
    defaultIcon: "https://cdn.jsdelivr.net/gh/tsukiseele/awsl.re/static/icon/akarin.png",
  }),
  methods: {
    isIndent(deep) {
      /*
      if (this.$vuetify.breakpoint.xsOnly) return this.deep < deep - 4;
      else if (this.$vuetify.breakpoint.smOnly) return this.deep < deep - 3;
      else if (this.$vuetify.breakpoint.mdOnly) return this.deep < deep - 2;
      else return this.deep < deep;*/
      return true;
    },
    handleReply(item) {
      this.reply(
        Object.assign({}, { comment: item.comment, visitor: item.visitor })
      );
    },
  },
  mounted() {
    console.log(this.comments);
  }
};
</script>

<style lang="scss" scoped>
.comment-wrap {

}
.comment {
  padding-left: 1rem;
  border-radius: 5px;
  border: 1px solid var(--border);

  .comment-body {

  }
}
/*
.v-card {
  box-shadow: none !important;

  &:hover {
    box-shadow: none !important;
  }
}

.visitor-info {
  cursor: pointer;
}

.visitor-nickname {
  position: relative;
  color: teal;
  margin: 0 5px;

  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;
    width: 0;
    border-bottom: 1px solid teal;
    transition: 0.3s;
  }
}
.visitor-icon {
  vertical-align: middle;
}

.visitor-icon {
  transition: 0.3s ease;
  border: 1px solid teal;
}

.content:hover {
  .visitor-icon {
    transform: rotateZ(360deg);
  }

  .visitor-nickname {
    &::before {
      width: 100%;
      left: 0;
    }
  }
}

.btn-reply {
  // background-color #ccc
  border-radius: 10%;
  color: teal;
  transition: 0.3s;
  &:hover {
    background-color: teal;
    color: white;
  }
}*/
</style>