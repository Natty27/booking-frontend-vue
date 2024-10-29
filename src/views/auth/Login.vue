<template>
  <Header />
  <section class="flex flex-col min-h-screen bg-gradient-to-b from-blue-600 to-blue-400">
    <div class="flex-grow flex items-center justify-center">
      <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full transition-transform transform hover:scale-105 duration-300">
        <h2 class="text-3xl font-bold mb-8 text-center text-blue-600">Login</h2>

        <form @submit.prevent="handleLogin">
          <div class="flex flex-col mb-4">
            <label class="font-bold mb-1">Email</label>
            <input
              v-model="email"
              type="email"
              placeholder="Your Email"
              class="border px-4 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div class="flex flex-col mb-4">
            <label class="font-bold mb-1">Password</label>
            <input
              v-model="password"
              type="password"
              placeholder="Your Password"
              class="border px-4 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            class="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 w-full"
          >
            Login
          </button>
        </form>
        <p class="mt-4 text-center">
          Don't have an account? 
          <RouterLink to="/signup" class="text-blue-500 underline">Sign Up</RouterLink>
        </p>
        <!-- Alternative Login Options -->
        <div class="mt-6 text-center">
          <p class="text-gray-600">Or login with:</p>
          <div class="flex justify-center space-x-4 mt-2">
            <button
              class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300 flex items-center"
              @click="loginWithGoogle"
            >
              <span class="mr-2">
                <i class="mdi mdi-google"></i> <!-- Google Icon -->
              </span>
              Google
            </button>
            <button
              class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 flex items-center"
              @click="loginWithFacebook"
            >
              <span class="mr-2">
                <i class="mdi mdi-facebook"></i> <!-- Facebook Icon -->
              </span>
              Facebook
            </button>
            <button
              class="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors duration-300 flex items-center"
              @click="loginWithApple"
            >
              <span class="mr-2">
                <i class="mdi mdi-apple"></i> <!-- Apple Icon -->
              </span>
              Apple
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "", // Added for error handling
    };
  },
  methods: {
    ...mapActions('auth', ['login']),

    async handleLogin() {
      this.errorMessage = ""; // Reset error message
      console.log("Login:", this.email, this.password);
      try {
        await this.login({ email: this.email, password: this.password });

        // Get user data from localStorage
        const user = JSON.parse(localStorage.getItem('user')); // Adjust this based on how you store user data
        if (user) {
          // Redirect based on user role
          if (user.role === "admin") {
            this.$router.push("/orderList");
          } else if (user.role === "user") {
            this.$router.push("/");
          }
          else if (user.role === "admin-hotel") {
            this.$router.push("/orderListAdmin");
          }
        }
      } catch (error) {
        console.error('Login failed:', error);
        this.errorMessage = error.response?.data?.message || 'Login failed. Please try again.'; // Set error message
      }
    },
    loginWithGoogle() {
      console.log("Login with Google");
      // Add Google login logic here
    },
    loginWithFacebook() {
      console.log("Login with Facebook");
      // Add Facebook login logic here
    },
    loginWithApple() {
      console.log("Login with Apple");
      // Add Apple login logic here
    }
  },
};
</script>
