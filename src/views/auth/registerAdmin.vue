<template>
  <Header />
  <section class="flex flex-col min-h-screen bg-gradient-to-b from-blue-600 to-blue-400">
    <div class="flex-grow flex items-center justify-center">
      <div class="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full transition-transform transform hover:scale-105 duration-300"> <!-- Increased width -->
        <h2 class="text-3xl font-bold mb-8 text-center text-blue-600">Register Admin</h2>

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

          <div class="flex flex-wrap -mx-2 mb-4">
            <div class="flex flex-col w-1/2 px-2">
              <label class="font-bold mb-1">Role</label>
              <select
        id="role"
        v-model="role"
        required
        class="mt-1 p-2 border border-gray-300 rounded-md w-full shadow-sm focus:ring focus:ring-blue-300 transition duration-200 ease-in-out"
      >
        <option value="" disabled>Select a role</option>
        <option value="admin">Admin</option>
        <option value="admin-hotel">Admin-Hotel</option>
      </select>
            </div>
          </div>

          <div v-if="role== 'admin-hotel' " class="flex flex-wrap -mx-2 mb-4">
            <div class="flex flex-col w-1/2 px-2">
              <label class="font-bold mb-1">Hotel</label>
              <select
                        v-model="hotel"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 sm:text-sm transition-shadow duration-300 ease-in-out"
                        :required="role === 'admin-hotel'"
                      >
                        <option value="" disabled>Select Hotel</option>
                        <option
                          v-for="hotel in hotels"
                          :key="hotel._id"
                          :value="hotel._id"
                        >
                          {{ hotel.name }}
                        </option>
                      </select>
            </div>
          </div>
          <button
            type="submit"
            class="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 w-full"
          >
            Register
          </button>
        </form>
        <!-- <p class="mt-4 text-center">
          Already have an account? 
          <RouterLink to="/login" class="text-blue-500 underline">Login</RouterLink>
        </p> -->

      </div>
    </div>
    <Footer />
  </section>
</template>



<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import { mapActions, mapGetters } from 'vuex';
import hotel from "@/store/hotel";

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
      role:'',
      hotel: '',         // To hold the selected hotel for admin-hotel role 
      hotels: [],        // To hold all hotels for admin-hotel role
      errorMessage: "",   // To hold error messages
    };
  },
  async created(){
    await this.fetchData();
  },

  computed:{
    ...mapGetters('hotel',['getHotels'])
      
    },

  methods: {
    ...mapActions('auth', ['register']),
    ...mapActions('hotel', ['fetchHotels']),


async fetchData() {
try {
  this.loading = true;
  await this.fetchHotels();
  this.hotels = this.getHotels.hotels;
} catch (error) {
  console.error('Failed to fetch hotels:', error);
} finally {
  this.loading = false;
}
},

    async handleSubmit() {
      this.errorMessage = ""; // Reset error message
      try {
        await this.register({
          name: this.name,
          email: this.email,
          password: this.password,
          city: this.city,             // Include city in registration
          kebele: this.kebele,         // Include kebele in registration
          phoneNumber: this.phoneNumber, // Include phone number in registration
          role : this.role, // Default role is 'user'
          hotel: this.hotel // Include hotel for admin-hotel role
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
