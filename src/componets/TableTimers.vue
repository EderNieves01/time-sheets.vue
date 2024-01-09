<template>
  <div v-if="projects.length > 0">
    <div class="table-responsive">
      <table class="table table-striped table-hover">
        <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Date</th>
            <th scope="col">Until</th>
            <th scope="col">Hours</th>
            <th scope="col">Project</th> 
            <th v-show="client" scope="col">Developer</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(works, id) in projects" :key="id">
            <th scope="row">{{ id + 1 }}</th>
            <td>{{ format(works.date) }}</td>
            <td>{{ format(works.date2) }}</td>
           <td>{{ works.works }}</td>
            <td>{{ works.projects }}</td> 
             <td v-show="client">{{ works.client }}</td>
            <td
              @click="changeState(works.id)"
              :class="works.status ? 'text-success' : 'text-danger'"
            >
              {{ works.status ? "Pagado" : "Pendiente" }}
            </td>
           
          </tr>
        </tbody>
      </table>
      <h1>Horas: {{total}}</h1>
      <h1>Monto a pagar pagar:{{total * 58}} </h1>
    </div>
  </div>
  <div v-else class="text-center mt-5">
    <h1 class="text-muted">Aún no tienes horas trabajadas</h1>
    <h2 class="text-muted">Por favor, registra las tuyas</h2>
  </div>
</template>

<script>
import { doc, updateDoc } from "firebase/firestore";
import db from "../firebase";

export default {
  data() {
    return {
      numeroPendiente: 0,
      client: false,
      total: Number,
    };
  },
  props: {
    projects: {
      type: Array,
      default: () => [],
    },
     total: {
      type: Number,
      default: () => 0,
    },
  },
  mounted() {
    if (
      JSON.parse(localStorage.getItem("user")).uid ===
      "2ca0Pr8KZTUTJpohiqJYHdWqx7C2"
    ) {
      this.client = true;
    }
  //  const total = this.projects.map((total) => total.works);
  //  const result = total.reduce((acumulator, currentAcumulator) => acumulator + currentAcumulator);
  //  console.log(result)
  // const result = this.projects.map((Element) =>  Element);
  // console.log(result)
  //  this.total = total.reduce((acumulator, currentAcumulator) => acumulator + currentAcumulator, 0);
   },
  methods: {
    format(seconds) {
      if (seconds) {
        const date = new Date(seconds.seconds * 1000);
        return date.toLocaleDateString();
      } else {
        return "";
      } // Puedes personalizar el formato según tus preferencias
    },

    async changeState(id) {
      const admin = JSON.parse(localStorage.getItem("user")).uid;
      console.log(admin);

      if (admin === "2ca0Pr8KZTUTJpohiqJYHdWqx7C2") {
        const projectRef = doc(db, "projects", id);
        await updateDoc(projectRef, {
          status: true,
        });
        // this.projects[id].status = !this.projects[id].status;
      }
    },
  },
};
</script>