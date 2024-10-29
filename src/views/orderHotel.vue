<template>
    <div class="flex flex-col min-h-screen bg-gray-100">
      <Header />
  
      <main class="flex-grow p-8 mx-auto max-w-7xl">
        <h2 class="text-3xl font-bold mb-6 text-center">Order Confirmation</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Hotel Details Card -->
          <div class="bg-white rounded-lg shadow-lg p-6">
            <h3 class="text-xl font-semibold mb-4">Hotel Details</h3>
            <div class="flex flex-col md:flex-row">
              <img
                :src="`${baseUrl}${image}`"
                alt="Hotel Image"
                class="w-full md:w-1/2 h-48 object-cover rounded-lg mb-4 md:mb-0 md:mr-4"
              />
              <div class="flex-1">
                <h4 class="text-lg font-bold mb-2">{{ hotel.name }}</h4>
                <p><strong>Check-In:</strong> {{ checkIn }}</p>
                <p><strong>Check-Out:</strong> {{ checkOut }}</p>
                <p><strong>Bed Type:</strong> {{ bedType }}</p>
                <p><strong>Duration:</strong> {{ duration }} nights</p>
                <p class="text-xl font-bold text-blue-600">Total Price: ETB{{ bedPrice }}</p>
              </div>
            </div>
          </div>
  
          <!-- Personal Information Card -->
          <div class="bg-white rounded-lg shadow-lg p-6">
            <h3 class="text-xl font-semibold mb-4">Personal Information</h3>
            <form @submit.prevent="submitForm">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block mb-1 font-medium">Full Name</label>
                  <input
                    v-model="fullName"
                    type="text"
                    required
                    class="border rounded-md w-full px-4 py-2"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label class="block mb-1 font-medium">Email</label>
                  <input
                    v-model="email"
                    type="email"
                    required
                    class="border rounded-md w-full px-4 py-2"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label class="block mb-1 font-medium">Phone Number</label>
                  <input
                    v-model="phone"
                    type="tel"
                    required
                    class="border rounded-md w-full px-4 py-2"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label class="block mb-1 font-medium">City</label>
                  <input
                    v-model="city"
                    type="text"
                    required
                    class="border rounded-md w-full px-4 py-2"
                    placeholder="City"
                  />
                </div>
                <div>
                  <label class="block mb-1 font-medium">Kebele</label>
                  <input
                    v-model="kebele"
                    type="text"
                    required
                    class="border rounded-md w-full px-4 py-2"
                    placeholder="Kebele"
                  />
                </div>
              </div>
              <button
                type="submit"
                class="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded-md transition-colors duration-300 hover:bg-blue-600"
              >
                Confirm Order
              </button>
            </form>
          </div>
        </div>
  
        <!-- <div class="text-center mt-6">
          <button @click="goBack" class="text-blue-500 underline hover:text-blue-700">
            Back to Hotels
          </button>
        </div> -->
  
        <!-- Order Details Dialog -->
        <div v-if="showOrderDialog" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div class="bg-white rounded-lg p-6 w-80">
            <h3 class="text-xl font-semibold mb-4">Order Details</h3>
            <p><strong>Order Code:</strong> {{ orderCode }}</p>
            <p><strong>Full Name:</strong> {{ fullName }}</p>
            <p><strong>Email:</strong> {{ email }}</p>
            <p><strong>Phone:</strong> {{ phone }}</p>
            <p><strong>Check-In:</strong> {{ checkIn }}</p>
                <p><strong>Check-Out:</strong> {{ checkOut }}</p>
                <p><strong>Bed Type:</strong> {{ bedType }}</p>
                <p><strong>Duration:</strong> {{ duration }} nights</p>
            <button @click="closeDialog" class="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded-md transition-colors duration-300 hover:bg-blue-600">
              Close
            </button>
          </div>
        </div>
      </main>
  
      <Footer />
    </div>
  </template>
  
  <script>
  import Header from '@/components/Header.vue';
  import Footer from '@/components/Footer.vue';
  import { mapActions } from 'vuex';
  
  export default {
    components: {
      Header,
      Footer,
    },
    data() {
      return {
        hotel: {},
        baseUrl: 'http://localhost:3000/',
        hotelId: '',
        checkIn: '',
        checkOut: '',
        bedType: '',
        duration: 0,
        bedPrice: 0,
        fullName: '',
        email: '',
        phone: '',
        city: '',
        kebele: '',
        isLoggedIn: false,
        image: '',
        showOrderDialog: false,
        orderCode: ''
      };
    },
    async created() {
      const { hotelId, checkIn, checkOut, bedType, duration, bedPrice, image } = this.$route.query;
      this.hotelId = hotelId;
      this.checkIn = checkIn;
      this.checkOut = checkOut;
      this.bedType = bedType;
      this.duration = duration;
      this.bedPrice = bedPrice;
      this.image = image;
  
      // Check if user is logged in
      const userInfo = localStorage.getItem('user');
      if (userInfo) {
        this.isLoggedIn = true;
        const { _id, name, email, phoneNumber, city, kebele } = JSON.parse(userInfo);
        this.userid = _id || '';
        this.fullName = name || '';
        this.email = email || '';
        this.phone = phoneNumber || '';
        this.city = city || '';
        this.kebele = kebele || '';
      } else {
        this.userid = '671cd9b15a166477b6d8dfd2';
      }
    },
    methods: {
      ...mapActions('order', ['addOrder']),
      
      async submitForm() {
        // Generate unique orderCode
        const initials = this.fullName
          .split(' ')
          .map(name => name.charAt(0).toUpperCase())
          .join('');
        const timestamp = Date.now();
        this.orderCode = `${initials}-${timestamp}`;
  
        console.log("Order confirmed with personal information:", {
          hotel: this.hotelId,
          checkIn: this.checkIn,
          checkOut: this.checkOut,
          bedType: this.bedType,
          duration: this.duration,
          bedPrice: this.bedPrice,
          status: 'pending',
          userDetails: {
            user: this.userid,
            fullName: this.fullName,
            email: this.email,
            phone: this.phone,
            city: this.city,
            kebele: this.kebele,
          },
          orderCode: this.orderCode
        });
  
        const response = await this.addOrder({
            orderCode:this.orderCode,
          hotel: this.hotelId,
          checkIn: this.checkIn,
          checkOut: this.checkOut,
          bedType: this.bedType,
          duration: this.duration,
          bedPrice: this.bedPrice,
          status: 'pending',
          userDetails: {
            user: this.userid,
            fullName: this.fullName,
            email: this.email,
            phone: this.phone,
            city: this.city,
            kebele: this.kebele
          }
        });
  
        // Show order details dialog
        this.showOrderDialog = true;
      },
      closeDialog() {
        this.showOrderDialog = false;
        this.goBack();
      },
      goBack() {
        this.$router.push({ path: '/' }); // Redirect to the hotels list page
      },
    },
  };
  </script>
  
  <style scoped>
  /* Additional styling if needed */
  </style>
  