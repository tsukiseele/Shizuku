<template lang="pug">
  #container
    ul.list
      li.list-item(v-for="(item, i) in articles" :key="i")
        span {{ item.articleTitle }}

</template>

<script>
export default {
  layout: "admin",
  data: () => ({
    articles: []
  }),
  async asyncData({app, isDev, route, store, env, params, query, req, res, redirect, error}) {
    let articles = []
    try {
      articles = await app.$api.getAllArticles();
    } catch(e) {
      console.log(e);
    }
    return {
      articles
    }
  },
}
</script>

<style lang="scss" scoped>

</style>