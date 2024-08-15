import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import DashboardView from "../src/views/Dashboard.vue";
import HomePage from "../src/views/HomePage.vue";
import LoginView from "../src/views/LoginView.vue";
import SignupView from "../src/views/SignupVeiw.vue"; // Corrected typo

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardView,
    meta: { requiresAuth: true } // Add meta field to indicate authentication is required
  },
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/signup",
    name: "Signup",
    component: SignupView,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(), 
      (user) => {
        removeListener();
        resolve(user);
      },

      reject 
    )
  })
};


// Navigation guard to check authentication
router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Route requires authentication
    if (await getCurrentUser()) {
      next(); // User is authenticated, allow access
    } else {
      next('/login'); // Redirect to login page
    }
  } else {
    next(); // Route does not require authentication
  }
});

export default router;
