import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Vaga from "../views/Vaga/Index.vue";
import EditVaga from "../views/Vaga/Update.vue";
import Candidato from "../views/Candidato/Index.vue";
import EditCandidato from "../views/Candidato/Update.vue";
import ViewCandidato from "../views/Candidato/View.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/vaga",
    component: Vaga,
  },
  {
    path: "/candidato",
    component: Candidato,
  },
  {
    path: "/vaga/editar",
    component: EditVaga,
  },
  {
    path: "/candidato/editar",
    component: EditCandidato,
  },
  {
    path: "/candidato/view",
    component: ViewCandidato,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
