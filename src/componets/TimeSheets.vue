<template>
  <div class="container mt-3 text-center">
    <div class="title">
      <h1>Times Sheets</h1>
      <hr />
    </div>
    <form @submit.prevent="createdTimeSheets()" class="row mt-4 g-3">
      <div class="col-md-6 mb-3">
        <label for="date" class="form-label"><h5>Date</h5></label>
        <VueDatePicker
          v-model.value="date"
          range
          range-max="4"
          :max-date="new Date()"
          required
        ></VueDatePicker>
      </div>

      <div class="col-md-3 mb-3">
        <label for="time" class="form-label"><h5>TimeSheets</h5></label>
        <input
          id="time"
          v-model.trim="works"
          class="form-control"
          type="number"
          placeholder="0"
          min="1"
          required
        />
      </div>

      <div class="col-md-3 mb-3">
        <label for="select" class="form-label"><h5>Project</h5></label>
        <select
          id="select"
          v-model.trim="projectName"
          class="form-select"
          aria-label="Select Project"
          required
        >
          <option value="" disabled>Select project</option>
          <option value="Domi Canastas">Domi Canastas</option>
          <option value="Fitpass">Fitpass</option>
          <option value="Vagay">Vagay</option>
          <option value="G Smoke">G Smoke</option>
        </select>
      </div>

      <div class="col-12 mt-4">
        <button type="submit" class="btn btn-primary text-light">Submit</button>
      </div>
    </form>

    <div class="container mt-3">
      <hr />
      <table-timers :projects="projects" />
    </div>
  </div>
</template>

<script>
import TableTimers from "./TableTimers.vue";
import db from "../firebase";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

export default {
  data() {
    return {
      projects: [],
      date: "",
      date1: undefined,
      works: null,
      projectName: "",
      uid: "",
      status: false,
      admin: "",
      client: "",
      total: "",
    };
  },
  components: { TableTimers, VueDatePicker },
  mounted() {
    const user = JSON.parse(localStorage.getItem("user"));
    this.uid = user.uid;
    this.getProfile();
    this.controlAdmin();
  },
  methods: {
    async getProfile() {
      const uid = JSON.parse(localStorage.getItem("user")).uid;
      let profileRole = "";
      const clients = collection(db, "clients");
      const q = query(clients, where("id", "==", uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        profileRole = doc.data().role;
        this.admin = profileRole;
        // console.log(this.admin);
      });
    },

    async createdTimeSheets() {
      this.client = JSON.parse(localStorage.getItem("client")).name;
      console.log(JSON.parse(localStorage.getItem("client")));
      console.log(new Date(this.date * 1000).toDateString());
      //mandar el objeto a un documento ("todos") ya creado con id a la base de datos
      const docRef = await addDoc(collection(db, "projects"), {
        uid: this.uid,
        client: this.client,
        date: this.date[0],
        date2: this.date[1],
        works: this.works,
        projects: this.projectName,
        status: false,
      });
      // console.log(docRef);
      //reset form
      this.date = null;
      this.works = null;
      this.projectName = "";
    },

    async getDoc() {
      const projectsCollection = collection(db, "projects");

      onSnapshot(projectsCollection, (querySnapshot) => {
        // Limpiar el array antes de actualizarlo para evitar duplicados
        this.projects = [];

        querySnapshot.forEach((doc) => {
          const todo = {
            id: doc.id,
            date: doc.data().date,
            date2: doc.data().date2,
            projects: doc.data().projects,
            status: doc.data().status,
            works: doc.data().works,
            client: doc.data().client,
          };
          this.projects.push(todo);
        });
        // this.total = this.projects.reduce(
        //   (element, element1) => element + element1.works,
        //   0
        // );
        // console.log(this.total);
        // const result2 = this.projects.filter(
        //   (element) => element.status === true
        // );
        // console.log(result2);
      });
    },

    queryDoc() {
      const todosRef = collection(db, "projects");
      const q = query(todosRef, where("uid", "==", this.uid));
      this.projects = [];
      onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // console.log(doc.id, " => ", doc.data());
          const objectTimer = {
            id: doc.id,
            date: doc.data().date,
            projects: doc.data().projects,
            status: doc.data().status,
            works: doc.data().works,
          };
          this.projects.push(objectTimer);
        });
      });
    },

    controlAdmin() {
      const admin = this.uid;
      if (admin === "2ca0Pr8KZTUTJpohiqJYHdWqx7C2") {
        return this.getDoc();
      } else {
        return this.queryDoc();
      }
    },
  },
};
</script>