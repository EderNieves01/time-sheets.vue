<template>
  <div class="container mt-5">
    <form @submit.prevent="send" class="shadow-lg p-4 bg-light rounded">
      <div class="text-center mb-4">
        <img src="../assets/img/user2.png" width="100" alt="User Image" />
        <h3 class="mt-3 text-muted">Complete Your Registration</h3>
      </div>

      <div class="row mb-3">
        <div class="col-md-6">
          <div class="mb-3">
            <label for="firstName" class="form-label">First Name</label>
            <input
              v-model.trim="firstName"
              class="form-control"
              type="text"
              id="firstName"
              placeholder="Enter your first name"
              required
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="mb-3">
            <label for="lastName" class="form-label">Last Name</label>
            <input
              v-model.trim="lastName"
              class="form-control"
              type="text"
              id="lastName"
              placeholder="Enter your last name"
              required
            />
          </div>
        </div>
      </div>

      <div class="mb-3">
        <label for="phone" class="form-label">Phone Number</label>
        <input
          v-model="phone" 
          class="form-control"
          type="tel"
          id="phone"
          maxlength="10"
          placeholder="Enter your phone number"
        />
      </div>

      <div class="text-center">
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
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
      firstName: "",
      lastName: "",
      phone: '',
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
try {
   //send document
      await addDoc(collection(db, "clients"), {
        id: JSON.parse(localStorage.getItem("user")).uid,
        name: this.firstName,
        lastName: this.lastName,
        phone: this.phone,
      });
} catch (e) {
  console.log(e)
}
      //reset form
      this.firstName = "";
      this.lastName = "";
      this.phone = "";
      router.push('/')
    },
  }
}
</script>