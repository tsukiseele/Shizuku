<template lang="pug">
#container
  #main
    .project(v-for="(item, i) in projects", :key="i") 
      img.project-icon(:src="item.linkIcon")
      .project-name(v-text="item.linkName")
</template>

<script>
export default {
  fetch() {
    this.$store.commit("header", { title: "『项目』" });
  },
  async asyncData({ app }) {
    const projects = await app.$api.getAllLink();
    return { projects };
  },
  data: () => ({
    projects: [],
  }),
  methods: {},
};
</script>

<style lang="scss" scoped>
#main {
  max-width: 960px;
  margin: 0 auto;
}
.project {
  display: flex;
  padding: 1rem;
  flex-direction: column;
  flex-wrap: wrap;
  background: var(--card);
  border-radius: 5px;
  box-shadow: 0px 1px 6px var(--shadow);
  margin: 2rem;
  height: 400px;
  .project-name {
    width: 50%;
    font-size: 1.25rem;
    font-weight: 700;
  }

  .project-icon {
    max-width: 128px;
    border-radius: 50%;
    object-fit: contain;
    align-self: center;
  }
}
</style>