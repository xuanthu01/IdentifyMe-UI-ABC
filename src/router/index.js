import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/connections",
    name: "Connection",
    component: () => import("../views/Connection.vue"),
    meta: {
      requiresAuth: true
    }
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
      },
      {
        path: "create-definition",
        component: () => import("../components/Schemas/CreateCredDef.vue")
      }
    ],
    meta: {
      requiresAuth: true,
      is_admin: true
    }
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
    ],
    meta: {
      requiresAuth: true,
      is_admin: true
    }
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
    ],
    meta: {
      requiresAuth: true,
      is_admin: true
    }
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
    component: () => import("../components/Auth/Login.vue"),
    meta: {
      guest: true
    }
  },
  {
    path: "/access-deny",
    name: "Unauthorized",
    component: () => import("../views/401.vue"),
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  try {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (localStorage.getItem("user") === null) {
        next({
          name: "Login",
          path: "/login",
          params: { nextUrl: to.fullPath }
        });
      } else {
        let user = JSON.parse(localStorage.getItem("user"));
        if (to.matched.some(record => record.meta.is_admin)) {
          if (user.role === "admin") {
            next();
          } else {
            next({ name: "Unauthorized" });
          }
        } else {
          next();
        }
      }
    } else if (to.matched.some(record => record.meta.guest)) {
      if (localStorage.getItem("user") === null) {
        next();
      } else {
        next({ name: "home" });
        console.log("goto home");
      }
    } else {
      // next({
      //   path:"/access-deny"
      // });
      next();
      console.log("else next");
    }
  } catch (error) {
    console.log(error);
  }
});

export default router;
