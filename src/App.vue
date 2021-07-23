<template>
  <div>
      <router-view></router-view>
      <Loading />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Loading from './components/partitials/Loading'

export default {
  name: 'App',
  mounted() {
    this.$store.commit("setErrors", {});
    if (localStorage.getItem("authToken")) {
        this.getUserData();
    }
  },
  components:{
    Loading,
  },
  methods: {
    ...mapActions("auth", ["getUserData"]),
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
