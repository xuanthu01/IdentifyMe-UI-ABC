import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/connections",
    name: "Connection",
    component: () => import("../views/Connection.vue")
  },
  {
    path: "/schemas",
    name: "Schema",
    component: () => import("../views/Schema.vue"),
    children: [
      {
        path: "create",
        component: () => import("../components/Schemas/CreateSchema.vue")
      },
      {
        path: "list",
        component: () => import("../components/Schemas/ListSchemas.vue")
      }
    ]
  },
  {
    path: "/credentials",
    name: "Credential",
    component: () => import("../views/Credential.vue"),
    children: [
      {
        path: "issue",
        component: () => import("../components/Credentials/IssueCredential.vue")
      }
    ]
  },
  {
    path: "/proof",
    name: "Proof",
    component: () => import("../views/Proof.vue"),
    children: [
      {
        path: "list",
        component: () => import("../components/Proof/List/ProofList.vue")
      },
      {
        path: "request",
        component: () => import("../components/Proof/Request/Index.vue")
      }
    ]
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
    children: [
      {
        path: "ssi",
        component: () => import("../components/About/SSI.vue")
      },
      {
        path: "team",
        component: () => import("../components/About/Team.vue")
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../components/Auth/Login.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
