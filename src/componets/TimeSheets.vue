<template>
  <div></div>
  <div class="container text-center">
    <div class="title mt-3">
      <h1>Times Sheets</h1>
      <hr />
    </div>
    <form @submit.prevent="createdTimeSheets()">
      <div class="row mt-9">
        <div class="col-12 col-sm-12 col-md-3 mb-3">
          <label for="date"><h5>Date</h5></label>
       <VueDatePicker  v-model="date"></VueDatePicker>
        </div>

        <div class="col-12 col-sm-12 col-md-3 mb-3">
          <label for="time"><h5>TimeSheets</h5></label>
          <input
            id="time"
            v-model.trim="works"
            class="form-control"
            type="number"
            placeholder="0"
            min="0"
            max="50"
            required
          />
        </div>

        <div class="col-12 col-sm-12 col-md-3 mb-3">
          <label for="select"><h5>Project</h5></label>
          <select
            id="select"
            v-model.trim="projectName"
            class="form-select"
            aria-label="form-select-sm example"
            required
          >
            <option value="" disabled selected>Select project</option>
            <option value="Domi Canastas">Domi Canastas</option>
            <option value="Fitpass">Fitpass</option>
            <option value="Vagay">Vagay</option>
            <option value="G Smoke">G Smoke</option>
          </select>
        </div>
        <div class="col-12 col-sm-12 col-md-3 mb-3 mt-4">
          <button
            type="submit"
            class="btn btn-primary text-light "
          >
            Submit
          </button>
        </div>
      </div>
    </form>
      </div>

  <div class="container mt-3">
    <hr />
    <table-timers :projects="projects" />
  </div>
</template>

<script>
import TableTimers from "./TableTimers.vue";
import db from "../firebase";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  onSnapshot
} from "firebase/firestore";

export default {
  data() {
    return {
      projects: [],
      projectsfirebase: [],
      date: null,
      works: null,
      projectName: "",
      uid: "",
      status: false,
      admin: '',
      client: '',
    };
  },
  components: { TableTimers },
  mounted() {
    const user = JSON.parse(localStorage.getItem("user"));
    this.uid = user.uid;
    this.getProfile();
    this.controlAdmin();

  },
  methods: {
      async  getProfile(){
        const uid = JSON.parse(localStorage.getItem('user')).uid; 
        let profileRole = '';
        
             const clients = collection(db, "clients");
      const q = query(clients, where("id", "==", uid));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        
         profileRole = doc.data().role;

         this.admin = profileRole;
         console.log(this.admin)
      }
      );
        },

    createdTimeSheets() {
      this.client = JSON.parse(localStorage.getItem('client')).name;
      console.log(JSON.parse(localStorage.getItem('client')))
      //mandar el objeto a un documento ("todos") ya creado con id a la base de datos
      const docRef = addDoc(collection(db, "projects"), {
        client: this.client,
        date: this.date,
        works: this.works,
        projects: this.projectName,
        uid: this.uid,
        status: false,
      });
      console.log("estoy entrando");

      //reset form
      this.date = "";
      this.date2 = "";
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
  });
},

     queryDoc() {
      const todosRef = collection(db, "projects");
      const q = query(todosRef, where("uid", "==", this.uid));
       this.projects = [];
      onSnapshot(q, (querySnapshot) => {
       querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        const objectTimer = {
          id: doc.id,
          date: doc.data().date,
          date2: doc.data().date2,
          projects: doc.data().projects,
          status: doc.data().status,
          works: doc.data().works,
        };
        this.projects.push(objectTimer);
      }
      );
      });
    },

     controlAdmin(){
      const admin = this.uid;
       if(admin === "2ca0Pr8KZTUTJpohiqJYHdWqx7C2"){
        return this.getDoc();
       }else{
        return this.queryDoc();
       }
    },
  },
};
</script>