<template>
  <div class="container mt-3 ">
    <form @submit.prevent="send()" class="form-control shadow-4">
      <div>
        <div class="user container-center text-center mb-3">
          <img src="../assets/img/user2.png" width="200px" alt="" srcset="" />
          <h3 class="text-muted">Complete Your <span class="badge bg-warning text-dark"> Register </span></h3>
    
        </div>
      </div>
      <div class="row">
        <div class="col col-sm-6">
          <input
            v-model.trim="firstName"
            class="form-control"
            type="text"
            placeholder="FirstName"
            aria-label="default input example"
            required
          />
        </div>
        <div class="co col-sm-6">
          <input
            v-model.trim="lastName"
            class="form-control"
            type="text"
            placeholder="LastName"
            aria-label="default input example"
            required
          />
        </div>
      </div>
      <select
        v-model="role"
        class="form-select form-select-sm mt-3"
        aria-label=".form-select-sm example"
        required
      >
        <option selected>Role</option>
        <option value="Admin">Admin</option>
        <option value="Client">Client</option>
      </select>
      <div class="co col-sm-12 mt-3 pb-3">
        <input
          v-model.trim="phone"
          class="form-control"
          type="number"
          placeholder="Phone"
          aria-label="default input example"
        />
      </div>
      <div class="text-center mb-2">
        <button class="btn-sm btn-primary px-3">Send</button>
      </div>
      <input type="file" id="myfile" name="myfile"><br><br>
    </form>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import db from "../firebase";
import router from "../router/index"
import { addDoc, doc, collection } from "firebase/firestore";
export default {
  data() {
    return {
      arrUser: [],
      firstName: "",
      lastName: "",
      role: "",
      phone: /^\d{1,10}$/,
      img: null,
    };
  },
  mounted(){
    Swal.fire({
              title: "Please continue your register",
              text: "you are one step away from completing the registration",
              icon: "success",
              confirmButtonText: "Ok",
            });
  },
  methods: {
    async send() {

      //send document
      await addDoc(collection(db, "clients"), {
        id: JSON.parse(localStorage.getItem("user")).uid,
        name: this.firstName,
        lastName: this.lastName,
        role: this.role,
        phone: this.phone,
      });

      //reset form
      this.firstName = "";
      this.lastName = "";
      this.role = "";
      this.phone = "";
      router.push('/')
    },
  },
};
</script>