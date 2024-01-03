<template>
  <div v-if="projects.length > 0">
    <h3>pendiente: hacer progresive bar</h3>

    <table class="table table-responsive">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Date</th>
          <th scope="col">Until</th>
          <th scope="col">Hours</th>
          <th scope="col">Project</th>
          <th scope="col">Status</th>
          <th v-show="client" scope="col">client</th>
        </tr>
      </thead>
      <tbody v-for="(works, id) in projects" :key="id">
        <tr>
          <th scope="row">{{ id + 1 }}</th>
          <td>{{ works.date }}</td>
          <td>{{ works.date2 }}</td>
          <td>{{ works.works }}</td>
          <td>{{ works.projects }}</td>
         
          <td
            @click="changeState(works.id)"
            :class="works.status ? 'text-success' : 'text-danger'"
          >
            {{ works.status ? "Pagado" : "Pendiente" }}
          </td> 
          <td v-show="client">{{ works.client }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else class="text-center mt-5">
    <h1 class="text-muted">Aun no tienes horas trabajadas</h1>
    <h2 class="text-muted">por favor registar las tuyas</h2>
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
    };
  },
  props: {
    projects: {
      type: Array,
      default: () => [],
    },
  },
  mounted(){
    if(JSON.parse(localStorage.getItem("user")).uid === '2ca0Pr8KZTUTJpohiqJYHdWqx7C2'){
      this.client = true;
    }
  },
  methods: {
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