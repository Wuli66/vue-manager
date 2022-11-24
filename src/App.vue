<template>
  <div id="app">
    <router-view></router-view>
</div>
</template>

<script>
import Main from './view/Main.vue'
export default {
  name: 'App',
  components: {
    Main
  }
}
</script>

<style lang="less">
  body , p, h1, h3{
    margin: 0;
    padding: 0;
  }

</style>
