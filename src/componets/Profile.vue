<template>
    <div class="text-center mt-3">
        <img src="../assets/img/snoworiginal.png" class="rounded-circle mb-3" style="width: 150px;"
  alt="Avatar" />

<h1 class="mb-2"><strong>{{ name }}</strong></h1>
<h2>{{lastName}}</h2>
<p class="text-muted">{{ role }} <span class="badge bg-primary">PRO</span></p>
    
    
    </div>
</template>

<script>
import { doc, getDocs, collection,query, where } from "firebase/firestore";
import db from "../firebase";
export default {
    data(){
        return{
         name: "",
         lastName: "",
         phone: "",
         role: ""
         }
    },
    mounted(){
      this.getProfile();
    },
    methods: {
      async  getProfile(){
        const uid = JSON.parse(localStorage.getItem('user')).uid; 
             const clients = collection(db, "clients");
      const q = query(clients, where("id", "==", uid));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        const clientsFire = {
          id: doc.id,
          name: doc.data().name,
          lastName: doc.data().lastName,
          phone: doc.data().phone,
          role: doc.data().role,
        };
     localStorage.setItem('client',JSON.stringify(clientsFire));  
        // this.projects.push(objectTimer);
        // console.log(clientsFire)
        this.name = clientsFire.name;
        this.lastName = clientsFire.lastName;
        this.phone = clientsFire.phone;
        this.role = clientsFire.role;
      }
      );
        }
    }
}
</script>