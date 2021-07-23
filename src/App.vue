<template>
  <div id="app" class="container">
      <div class="row">
          <Login v-if="!user"/>
      </div>
      <!-- <Loading /> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Login from './components/auth/Login';

export default {
  name: 'App',
  components: {
    Login,
  },
  mounted() {
    this.$store.commit("setErrors", {});
  },
  computed: {
    ...mapGetters("auth", ["user"])
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}


</style>
