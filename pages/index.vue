<template>
  <div class="container">
    <div></div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
.container {
  background: wheat;
  margin: 0 auto;
  min-height: 100vh;
  width: 60vw;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  @media (max-width: 768px) {
    width: auto;
  }
}

</style>

