<template lang="pug">
aside#aside
  .aside-card
    img.card-icon(:src="icon")
    .card-title TsukiSeele
    .card-info 技术宅拯救世界
    .card-links
      a.normal(href="https://github.com/tsukiseele" target="_brank") 
        i.fa.fa-github.fa-lg(aria-hidden="true")
      a.normal(href="https://twitter.com/tsukiseele" target="_brank") 
        i.fa.fa-twitter.fa-lg(aria-hidden="true")
      a.normal(href="mailto:tsukiseele@gmail.com") 
        i.fa.fa-envelope.fa-lg(aria-hidden="true" style="font-size:1.15em;")
  .aside-content 
</template>

<script>
export default {
  props: {
    icon: String,
  },
  data: () => ({
  }),
  computed: {

  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
#aside {
  position: relative;
  // display: none;
  box-shadow: 3px 3px 8px var(--shadow);
  margin: 1rem;
  padding: 0.5rem;

  // @media screen and (min-width: 768px) {
    display: block;
    background: var(--card);
    min-height: 100vh;
    border-radius: 5px;
  // }

  .aside-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 1px solid rgba(0,0,0,.3);

    .card-icon {
      object-fit: cover;
      height: 5rem;
      width: 5rem;
      margin: .5rem;
      border-radius: 50%;
      transition: transform .3s;

      &:hover {
        transform: rotate(360deg);
      }
    }

    .card-title {
      font-size: 1.5rem;
      font-weight: normal;
      font-family: InfoDisplay;
      color: var(--text-primary);
    }
    .card-info {
      color: var(--text-secondary);
    }

    .card-links {
      padding: 1rem 0 .5rem 0;
      i {
        color: black;
        padding: 0.33rem;
      }
    }
  }
  
}
</style>