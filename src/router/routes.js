const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "home",
        meta: {
          requiredAuth: false,
        },
        component: () => import("pages/IndexPage.vue"),
      },
      {
        path: "/todo",
        name: "todo",
        meta: {
          requiredAuth: true,
        },
        component: () => import("pages/ToDo.vue"),
      },
      {
        path: "/profile",
        name: "profile",
        meta: {
          requiredAuth: true,
        },
        component: () => import("pages/MyProfile.vue"),
      },
      {
        path: "/auth",
        name: "auth",
        meta: {
          requiredAuth: false,
        },
        component: () => import("pages/AuthPage.vue"),
      },
      {
        path: "/recipe/:id",
        name: "recipe",
        meta: {
          requiredAuth: false,
        },
        component: () => import("pages/RecipePage.vue"),
      },
      {
        path: "/reset-password",
        name: "reset",
        meta: {
          requiredAuth: false,
        },
        component: () => import("pages/ResetPassword.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
