<template>
  <Header />
  <section class="flex flex-col min-h-screen bg-gradient-to-b from-blue-600 to-blue-400">
    <div class="flex-grow flex items-center justify-center">
      <div class="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full transition-transform transform hover:scale-105 duration-300"> <!-- Increased width -->
        <h2 class="text-3xl font-bold mb-8 text-center text-blue-600">Sign Up</h2>

        <form @submit.prevent="handleSubmit">
          <div class="flex flex-wrap -mx-2 mb-4">
            <div class="flex flex-col w-1/2 px-2">
              <label class="font-bold mb-1">Name</label>
              <input
                v-model="name"
                type="text"
                placeholder="Your Name"
                class="border px-4 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 w-full" 
                required
              />
            </div>
            <div class="flex flex-col w-1/2 px-2">
              <label class="font-bold mb-1">Email</label>
              <input
                v-model="email"
                type="email"
                placeholder="Your Email"
                class="border px-4 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 w-full" 
                required
              />
            </div>
          </div>
          <div class="flex flex-wrap -mx-2 mb-4">
            <div class="flex flex-col w-1/2 px-2">
              <label class="font-bold mb-1">Password</label>
              <input
                v-model="password"
                type="password"
                placeholder="Your Password"
                class="border px-4 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 w-full" 
                required
              />
            </div>
            <div class="flex flex-col w-1/2 px-2">
              <label class="font-bold mb-1">Confirm Password</label>
              <input
                v-model="confirmPassword"
                type="password"
                placeholder="Your Password"
                class="border px-4 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 w-full" 
                required
              />
            </div>
          </div>
          <div class="flex flex-wrap -mx-2 mb-4">
            <div class="flex flex-col w-1/2 px-2">
              <label class="font-bold mb-1">City</label>
              <input
                v-model="city"
                type="text"
                placeholder="Your City"
                class="border px-4 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 w-full" 
                required
              />
            </div>
            <div class="flex flex-col w-1/2 px-2">
              <label class="font-bold mb-1">Kebele</label>
              <input
                v-model="kebele"
                type="text"
                placeholder="Your Kebele"
                class="border px-4 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 w-full" 
                required
              />
            </div>
          </div>
          <div class="flex flex-wrap -mx-2 mb-4">
            <div class="flex flex-col w-1/2 px-2">
              <label class="font-bold mb-1">Phone Number</label>
              <input
                v-model="phoneNumber"
                type="tel"
                placeholder="Your Phone Number"
                class="border px-4 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 w-full" 
                required
              />
            </div>
          </div>
          <button
            type="submit"
            class="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 w-full"
          >
            Sign Up
          </button>
        </form>
        <p class="mt-4 text-center">
          Already have an account? 
          <RouterLink to="/login" class="text-blue-500 underline">Login</RouterLink>
        </p>

        <!-- Alternative Login Options -->
        <div class="mt-6 text-center">
          <p class="text-gray-600">Or login with:</p>
          <div class="flex justify-center space-x-4 mt-2">
            <button
              class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300 flex items-center"
              @click="signupWithGoogle"
            >
              <span class="mr-2">
                <i class="mdi mdi-google"></i> <!-- Google Icon -->
              </span>
              Google
            </button>
            <button
              class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 flex items-center"
              @click="signupWithFacebook"
            >
              <span class="mr-2">
                <i class="mdi mdi-facebook"></i> <!-- Facebook Icon -->
              </span>
              Facebook
            </button>
            <button
              class="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors duration-300 flex items-center"
              @click="signupWithApple"
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
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import { mapActions } from 'vuex';

export default {
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      city: "",           // New field for city
      kebele: "",         // New field for kebele
      phoneNumber: "",    // New field for phone number
      errorMessage: "",   // To hold error messages
    };
  },
  methods: {
    ...mapActions('auth', ['register']),

    async handleSubmit() {
      this.errorMessage = ""; // Reset error message
      console.log("Sign Up:", this.name, this.email, this.password, this.city, this.kebele, this.phoneNumber);
      try {
        await this.register({
          name: this.name,
          email: this.email,
          password: this.password,
          city: this.city,             // Include city in registration
          kebele: this.kebele,         // Include kebele in registration
          phoneNumber: this.phoneNumber, // Include phone number in registration
          role : 'user' // Default role is 'user'
        });
        this.$router.push("/"); // Redirect to home page after successful registration
      } catch (error) {
        console.error('Registration failed:', error);
        this.errorMessage = error.response?.data?.message || 'Registration failed. Please try again.'; // Set error message
      }
    },

    signupWithGoogle() {
      console.log("Sign up with Google");
      // Add Google signup logic here
    },
    signupWithFacebook() {
      console.log("Sign up with Facebook");
      // Add Facebook signup logic here
    },
    signupWithApple() {
      console.log("Sign up with Apple");
      // Add Apple signup logic here
    }
  },
};
</script>

<style scoped>
.error-message {
  color: red; /* Change this style as per your design */
  margin-top: 10px;
  text-align: center;
}
</style>
