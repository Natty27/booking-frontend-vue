<template>
  <header class="bg-white shadow-lg">
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
      <!-- Logo -->
      <div class="text-2xl font-bold text-blue-500">
        <RouterLink to="/">Medeb</RouterLink>
      </div>

      <!-- Search Bar -->
      <!-- <div class="flex space-x-4">
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Search location..."
          class="border rounded-md px-4 py-2 w-80"
        />
        <button
          class="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
          @click="searchLocation"
        >
          Search
        </button>
      </div> -->

      <!-- User Options -->
      <div v-if="!user" class="space-x-4">
        <RouterLink to="/login" class="text-gray-600 hover:text-blue-500">Login</RouterLink>
        <RouterLink to="/signup" class="text-gray-600 hover:text-blue-500">Sign up</RouterLink>
      </div>

      <div v-if="user" class="relative">
        <div @click="toggleDropdown" class="flex items-center cursor-pointer">
          <img 
            v-if="user" 
            :src="avatar" 
            alt="User Icon" 
            class="w-8 h-8 rounded-full border border-gray-300" 
          />
        </div>

        <!-- Dropdown Menu -->
        <div v-if="dropdownVisible" class="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          <div class="flex items-center p-2">
            
            <span class="ml-2 font-bold">{{ user.name }}</span>
          </div>
          <button 
          v-if="user.role === 'admin'" 
            @click="addHotel" 
            class="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100"
          >
            Add Hotel
          </button>
          <button 
          v-if="user.role === 'admin'" 
            @click="viewOrder" 
            class="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100"
          >
            View Order
          </button>
          <button 
          v-if="user.role === 'admin-hotel'" 
            @click="viewOrderAdmin" 
            class="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100"
          >
            View Order
          </button>
          <button 
          v-if="user.role === 'admin'" 
            @click="registerAdmin" 
            class="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100"
          >
            Register Admin
          </button>
          <button 
            @click="logoutHandler" 
            class="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100"
          >
            Logout
          </button>
          
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import avatar from "./../assets/avatar.png"; 
export default {
  data() {
    return {
      searchTerm: "",
      user: null,
      dropdownVisible: false, // State to manage dropdown visibility
      user : JSON.parse(localStorage.getItem('user'))
    };
  },
  created() {
    // Get user data from local storage
    const userData = localStorage.getItem('user');
    this.user = userData ? JSON.parse(userData) : null;

    // Add event listener for clicks outside of the dropdown
    document.addEventListener('click', this.handleClickOutside);
    this.avatar = avatar; // Set avatar image
  },
  beforeDestroy() {
    // Clean up the event listener when the component is destroyed
    document.removeEventListener('click', this.handleClickOutside);
  },
  computed: {
    ...mapGetters('auth', ['getUser']),
  },
  methods: {
    ...mapActions('auth', ['logout', 'getCurrentUser']),

    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    },

    handleClickOutside(event) {
      // Check if the clicked element is outside the dropdown and user icon
      const dropdown = this.$el.querySelector('.absolute');
      const userIcon = this.$el.querySelector('.cursor-pointer');

      if (dropdown && !dropdown.contains(event.target) && !userIcon.contains(event.target)) {
        this.dropdownVisible = false; // Close the dropdown
      }
    },

    addHotel() {
      this.$router.push('/addHotel'); // Navigate to add hotel page
    },
    viewOrder() {
      this.$router.push('/orderList'); // Navigate to add hotel page
    },
    viewOrderAdmin() {
      this.$router.push('/orderListAdmin'); // Navigate to add hotel page
    },
    registerAdmin() {
      this.$router.push('/registerAdmin'); // Navigate to add hotel page
    },

    logoutHandler() {
      this.logout();
      this.dropdownVisible = false; // Close dropdown after logout
      this.user = null;

    },
  
    searchLocation() {
      console.log("Searching for:", this.searchTerm);
      // Logic for handling search
    },
  },
};
</script>

<style scoped>
/* Optional styles for better dropdown appearance */
.dropdown {
  transition: opacity 0.2s ease-in-out;
}
</style>
