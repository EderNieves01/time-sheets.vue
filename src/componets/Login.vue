<template >
  <div
    class="container ms-4 align-middle"
    :class="{ active: container }"
    id="container"
  >
    <div class="form-container sign-up">
      <form @submit.prevent="register(this.emailRegister, this.passwordRegister)">
        <h1>Create Account</h1>
        <div class="social-icons">
          <img src="../assets/img/snoworiginal.png" alt="" srcset="" />
        </div>
        <span>or use your email for registeration</span>
        <input
          required="true"
          v-model="emailRegister"
          type="email"
          placeholder="Email"
        />
        <input
          required="true"
          v-model="passwordRegister"
          type="password"
          placeholder="password"
          min="7"
          max="10"
        />
        <input
          required="true"
          v-model="repassword"
          type="password"
          placeholder="rePassword"
          min="7"
          max="10"
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
    <div class="form-container sign-in">
      <form @submit.prevent="login(this.email, this.password)">
        <h1>Sign In</h1>
        <div class="social-icons">
          <img src="../assets/img/snoworiginal.png" alt="" srcset="" />
        </div>
        <span>or use your email password</span>
        <input
          required="true"
          v-model="email"
          type="email"
          placeholder="Email"
        />

        <input
          required="true"
          v-model="password"
          type="password"
          placeholder="Password"
          minlength="6"
          maxlength="10"
        />
        
        <a href="#">Forget Your Password?</a>
        <button type="submit">Sign In</button>
      </form>
    </div>
    <div class="toggle-container">
      <div class="toggle">
        <div class="toggle-panel toggle-left">
          <h1>Welcome Back!</h1>
          <p>Enter your personal details to use all of site features</p>
          <button @click="activeRegister" class="hidden" id="login">
            Sign In
          </button>
        </div>
        <div class="toggle-panel toggle-right">
          <h1>Hello, Friend!</h1>
          <p>Register with your personal details to use all of site features</p>
          <button @click="activeRegister" class="hidden" id="register">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import router from "../router/index";

export default {
  data() {

    return {

      email: "",
      password: "",
      emailRegister: "",
      passwordRegister: "",
      repassword: "",
      errorMessage: "",
      container: false,

    };
  },
  methods: {
    activeRegister() {

      this.container = !this.container;

    },
    register(email, password) {

      const auth = getAuth();

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {

          if (this.passwordRegister === this.repassword) {
            const user = userCredential.user;
            console.log("¡Registrado!", user);
            localStorage.setItem("user", JSON.stringify(user));
             
            this.emailRegister = "";
            this.passwordRegister = "";
            this.repassword = "";
            router.push("/registeruser");

          } else {

            Swal.fire({
              title: "Error!",
              text: "Passwords do not match",
              icon: "error",
              confirmButtonText: "Ok",
            });

          }
        })
        .catch((error) => {
          const errorCode = error.code;
          this.errorMessage = error.message;
          console.log(this.errorMessage);

          // ..
        });
      console.log("entrando");
    },

    login(email, password) {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("¡Sesión iniciada!");
          // Signed in
          const user = userCredential.user;
          // ...
          localStorage.setItem("user", JSON.stringify(user));
          console.log(user);
          console.log(user.uid);
          this.email = "";
          this.password = "";
          router.push("/");
        })
        .catch((error) => {
            Swal.fire({
              title: "Error!",
              text: "check your email or password again",
              icon: "error",
              confirmButtonText: "Ok",
            });

          const errorCode = error.code;
          this.errorMessage = error.message;
          console.log(this.errorMessage);
        });
      console.log("entrando login");
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Lato&family=Montserrat:wght@700&display=swap");
.container {
  font-family: "Lato", sans-serif;
  font-family: "Montserrat", sans-serif;
  justify-items: center;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
}

body {
  background-color: #c9d6ff;
  background: linear-gradient(to right, #e2e2e2, #c9d6ff);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
}
img {
  width: 100px;
  height: 100px;
}
.active {
  display: block;
}
#pError {
  font-size: 10px;
}
.container {
  background-color: #fff;
  border-radius: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.35);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
}

.container p {
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.3px;
  margin: 20px 0;
}

.container span {
  font-size: 12px;
}

.container a {
  color: #333;
  font-size: 13px;
  text-decoration: none;
  margin: 15px 0 10px;
}

.container button {
  background: linear-gradient(to right, #daed5e, #ecd046);
  color: #1d1a1a;
  font-size: 15px;
  padding: 10px 45px;
  border: 1px solid transparent;
  border-radius: 8px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-top: 10px;
  cursor: pointer;
}

.container button.hidden {
  background: linear-gradient(to right, #daed5e, #ecd046);
  border-color: #f2f0f0;
}

.container form {
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  height: 100%;
}

.container input {
  background-color: #eee;
  border: none;
  margin: 8px 0;
  padding: 10px 15px;
  font-size: 13px;
  border-radius: 8px;
  width: 100%;
  outline: none;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in {
  left: 0;
  width: 50%;
  z-index: 2;
}

.container.active .sign-in {
  transform: translateX(100%);
}

.sign-up {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.container.active .sign-up {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: move 0.6s;
}

@keyframes move {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }
  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}

.social-icons {
  margin: 20px 0;
}

.social-icons a {
  border: 1px solid #ccc;
  border-radius: 20%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 3px;
  width: 40px;
  height: 40px;
}

.toggle-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: all 0.6s ease-in-out;
  border-radius: 150px 0 0 100px;
  z-index: 1000;
}

.container.active .toggle-container {
  transform: translateX(-100%);
  border-radius: 0 100px 100px 0;
}

.toggle {
  background-color: #8e8e84;
  height: 100%;
  background: linear-gradient(to right, #daed5e, #ecd046);
  color: #222020;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: all 0.6s ease-in-out;
}

.container.active .toggle {
  transform: translateX(50%);
}

.toggle-panel {
  position: absolute;
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 30px;
  text-align: center;
  top: 0;
  transform: translateX(0);
  transition: all 0.6s ease-in-out;
}

.toggle-left {
  transform: translateX(-200%);
}

.container.active .toggle-left {
  transform: translateX(0);
}

.toggle-right {
  right: 0;
  transform: translateX(0);
}

.container.active .toggle-right {
  transform: translateX(200%);
}
</style>