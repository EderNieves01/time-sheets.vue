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
          <input
            id="date"
            v-model.trim="date"
            class="form-control"
            type="date"
            required
          />
        </div>
        <div class="col-12 col-sm-12 col-md-3 mb-3">
          <label for="date2"><h5>Until</h5></label>
          <input
            id="date2"
            v-model.trim="date2"
            class="form-control"
            type="date"
            required
          />
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
        <div class="col mt-2">
          <button
            type="submit"
            class="btn btn-primary col-sm-12 col-md-3 col-12 text-light"
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
      date: "",
      date2: "",
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
   
   const arrayPrueba = [
     {
      precio: 250,
      marca: "samsung",
      modelo: "ewfsda",
      color: "rojo",
      cantidad: 2
    },
     {
      precio: 500,
      marca: "iphone",
      modelo: "ewfsda",
      color: "amarillo",
      cantidad: 3
    },
     {
      precio: 400,
      marca: "nokia",
      modelo: "ewfsda",
      color: "verde",
      cantidad: 4
    },
     {
      precio: 300,
      marca: "xiaomi",
      modelo: "ewfsda",
      color: "azul",
      cantidad: 5
    }
   ];
  const result = arrayPrueba.filter((price) => price.precio === 500);
  console.log(result)
  // const total = arrayPrueba.reduce((acumulador, actual) => acumulador + actual.precio, 0);
  
  // const totalCantidad = arrayPrueba.reduce((acumulador, actual) => {
  //   const precioXcantidad = acumulador + actual.cantidad;
  //   return acumulador + precioXcantidad}, 0);

  // const totalTodo = total * totalCantidad;
  // console.log(totalCantidad)
  // console.log("total: " + total + ' ' + "cantidad: " + " " + totalCantidad + " " + "total Todo: " + totalTodo);
//   const totalTodo = arrayPrueba.reduce((acumulador, actual) => {
//   const precioPorCantidad = actual.precio * actual.cantidad;
//   return acumulador + precioPorCantidad;
// }, 0);
arrayPrueba.map(cantidad => {
  console.log((cantidad.precio * cantidad.cantidad) + ' ' + cantidad.marca + ' ' + cantidad.cantidad + ' ' + cantidad.precio)
});
arrayPrueba.forEach((Element) => 
console.log(Element.precio * Element.cantidad));
const totalTodo = arrayPrueba.reduce((acumulador, { precio, cantidad }) => acumulador + (precio * cantidad), 0);

console.log("total Todo: " + totalTodo);

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
        date2: this.date2,
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