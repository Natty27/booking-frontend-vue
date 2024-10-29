import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import SearchResults from "@/views/SearchResults.vue";
import HotelDetails from "@/views/HotelDetails.vue";
import AddHotel from "@/views/addHotel.vue";
import OrderHotel from "@/views/orderHotel.vue";
import OrderList from "@/views/orderList.vue";
import OrderListAdmin from "@/views/orderListAdmin.vue";
import Login from "../views/auth/Login.vue";
import SignUp from "../views/auth/SignUp.vue";
import RegisterAdmin from "@/views/auth/registerAdmin.vue";
import NotAuthorized from "@/views/NotAuthorized.vue"; // Page shown when user lacks authorization

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: { title: "Home" },
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUp,
      meta: { title: "Sign Up" },
    },
    {
      path: "/registerAdmin",
      name: "registerAdmin",
      component: RegisterAdmin,
      meta: { requiresRole: "admin", title: "Register Admin" },
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: { title: "Login" },
    },
    {
      path: "/searchresults",
      name: "searchresults",
      component: SearchResults,
      meta: { title: "Search Results" },
    },
    {
      path: "/orderHotel",
      name: "orderHotel",
      component: OrderHotel,
      meta: { title: "Order Hotel" },
    },
    {
      path: "/orderList",
      name: "orderList",
      component: OrderList,
      meta: { requiresRole: "admin", title: "Order List" },
    },
    {
      path: "/orderListAdmin",
      name: "orderListAdmin",
      component: OrderListAdmin,
      meta: { requiresRole: "admin-hotel", title: "Order List Admin" },
    },
    {
      path: "/hotelDetails/:id",
      name: "hotelDetails",
      component: HotelDetails,
      props: true,
      meta: { title: "Hotel Details" },
    },
    {
      path: "/addHotel",
      name: "addHotel",
      component: AddHotel,
      meta: { requiresRole: "admin", title: "Add Hotel" },
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
      meta: { title: "About Us" },
    },
    {
      path: "/notAuthorized",
      name: "notAuthorized",
      component: NotAuthorized,
      meta: { title: "Not Authorized" },
    },
  ],
});

// Navigation guard to enforce role-based access and update the document title
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")) || {}; // Parse user data safely
  const userRole = user.role || null; // Safely retrieve user role

  // Change document title
  document.title = to.meta.title || 'Default Title';

  // Redirect authenticated users from login page based on role
  if (to.name === "login" && isAuthenticated) {
    if (userRole === "admin") {
      next({ name: "orderList" });
    } else if (userRole === "user") {
      next({ name: "home" });
    } else {
      next(); // Proceed if no specific role route is found
    }
  } else if (to.meta.requiresRole) {
    // If a route has role requirements
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      next({ name: "login" });
    } else if (userRole === to.meta.requiresRole) {
      next(); // Allow access if roles match
    } else {
      next({ name: "notAuthorized" }); // Redirect if user lacks the required role
    }
  } else {
    next(); // Allow access to routes without role restrictions
  }
});

export default router;
