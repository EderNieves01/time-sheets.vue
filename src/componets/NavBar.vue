<template>
    <div>
  <nav v-if="disableNav()" class="color navbar navbar-expand-lg navbar-light " >
  <div class="container-fluid ">
    <div class="d-flex align-items-center">
          <img class="mx-2 rounded-circle" src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp" alt="User Avatar">
        </div>
    <router-link class="navbar-brand px-4 text-light" to="/">SnowTimeSheets</router-link>
   
<button class="navbar-toggler " type="button" 
    data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" 
    aria-controls="navbarSupportedContent" aria-expanded="false" 
    aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
      
    </button>
     

    <div class="collapse navbar-collapse px-4 " id="navbarSupportedContent">

      <ul class="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-between w-100">

        <li class="nav-item">
          <router-link active-class="active fw-bold" class="nav-link" aria-current="page" to="/">addTimeSheets</router-link>
        </li>

        <li class="nav-item">
          <router-link active-class="active fw-bold" class="nav-link" to="/about">TimeSheets</router-link>
        </li>
           
        <li v-show="!signout" class="nav-item">
          <router-link active-class="active fw-bold" class="nav-link" to="/login" tabindex="-1" aria-disabled="true">Log In</router-link>
        </li>

        <li class="nav-item">
          <router-link active-class="active fw-bold" class="nav-link" to="/profile" tabindex="-1" aria-disabled="true">Profile</router-link>
        </li>

       <li class="nav-item">
       <button @click="signout()" class="btn btn-danger btn-sm" type="button">SingOut</button>
       </li>
      </ul>
     
    </div>
  </div>
</nav>
</div>

    
</template>

<script>
import { signOut, getAuth } from 'firebase/auth';
import { RouterLink } from 'vue-router'
import router from "../router/index"
export default {
  data() {
    return{
      disable: false 
    }
  },
    components: {
        RouterLink
    },
    methods: {
       disableNav(){
     return this.$route.path !== "/login" && this.$route.path !== "/registeruser";
    },
     signout() {
        localStorage.removeItem("user");
        localStorage.removeItem("client");
        router.push('/login');
     }
    }
}
</script>

<style scoped>
.color{
  background-color: rgb(63, 144, 237);
}
img{
  width: 50px;
}
</style>>