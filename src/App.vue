<template>
  <div>
    <nav-bar/>
    <router-view />
  </div>
</template>


<script>
import {RouterView} from 'vue-router'
import NavBar from './componets/NavBar.vue'
export default {
  components: { RouterView, NavBar },
  methods: {
   
  }
}
</script>
