<template lang="pug">
  #container
    main#main
      .timeline
        .timeline-group(v-for="(group, key) in timeline" :key="key")
          p.timeline-group-title {{ key }}
          .timeline-item(v-for="(item, index) in group" :key="index" @click="$router.push(`/archives/${item.articleId}`)")
              span.timeline-item-tags
                i.fa.fa-tag(style="padding: 0 .2rem;") 
                span {{ item.articleType || '未分类'}} 
              span.timeline-item-title {{ item.articleTitle }}

</template>

<script>
export default {
  data: () => ({
    archives: [],
    error: null
  }),
  fetch() {
    this.$store.commit("header", { title: "『时间线』" });
  },
  async asyncData({app, isDev, route, store, env, params, query, req, res, redirect}) {
    let archives;
    let error;
    try {
      archives = await app.$api.getAllArticles();
    } catch(e) {
      error = `Failed: ${e}`
    }
    return {
      archives,
      error
    }
  },
  computed: {
    timeline() {
      if (this.archives) {
        let timeline = {}
        for(let article of this.archives) {
          let date = new Date(article.articleDate)
          let group = `${date.getFullYear()}年${date.getMonth()}月`;
          if (group in timeline) {
            timeline[group].push(article);
          } else {
            timeline[group] = [article];
          }
        }
        console.log(timeline);
        return timeline;
      } else {
        return []
      }
    }
  },
  mounted() {
    console.log(this.timeline);
  },
};
</script>

<style lang="scss" scoped>
/*
#container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}*/

#main {
  margin: 1rem auto;
  background: var(--card);
  border-radius: .5rem;
  
}

.timeline {
  padding: 2rem;
  transition: .3s;

  .timeline-group {
    padding: .33rem 0;
    .timeline-group-title {
      color: var(--text-secondary);
    }
  }

  .timeline-item {
    cursor: pointer;
    padding-left: 2rem;
    line-height: 2rem;
    border-radius: 5px;
    transition: background .3s ease;
    
    &:hover {
      background: var(--card-active);
      .timeline-item-title {
        padding-left: 1rem;
      }
    }
  }

  .timeline-item-title {
    color: var(--text-primary);
    font-weight: 300;
    font-family: InfoDisplay;
    padding: 0 .33rem;
    transition: padding .3s;
  }

  .timeline-item-tags {
    // border: 1px solid var(--theme-primary);
    border-radius: 3px;
    color: var(--text);
    font-weight: 300;
    font-size: .8rem;
    padding: .125rem;
  }
}
</style>

