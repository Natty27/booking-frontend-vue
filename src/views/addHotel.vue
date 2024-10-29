<template>
    <Header />
    <div class="container mx-auto my-8 p-6 border border-gray-300 rounded-lg shadow-md bg-white">
      <h1 class="text-3xl font-bold mb-6 text-blue-500">Add New Hotel</h1>
      <form @submit.prevent="submitForm" class="space-y-6">
        <!-- Hotel Name and Location Side by Side -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Hotel Name</label>
            <input
              type="text"
              id="name"
              v-model="hotel.name"
              required
              class="mt-1 p-2 border border-gray-300 rounded-md w-full shadow-sm focus:ring focus:ring-blue-300"
            />
          </div>
          <div class="flex-grow">
            <label for="name" class="block text-sm font-medium text-gray-700">Hotel Star</label>
      <select
        id="star"
        v-model="hotel.star"
        required
        class="mt-1 p-2 border border-gray-300 rounded-md w-full shadow-sm focus:ring focus:ring-blue-300 transition duration-200 ease-in-out"
      >
        <option value="" disabled>Select star</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="0">0</option>
      </select>
    </div>
          <div>
    <label for="location" class="block text-sm font-medium text-gray-700">Location (City)</label>
    <select
      id="location"
      v-model="hotel.location"
      required
      class="mt-1 p-2 border border-gray-300 rounded-md w-full shadow-sm focus:ring focus:ring-blue-300"
    >
        <option value="" disabled>Select a city</option>
        <option value="Mekelle">Mekelle</option>
        <option value="Adigrat">Adigrat</option>
        <option value="Axum">Axum</option>
        <option value="Shire">Shire</option>
        <option value="Alamata">Alamata</option>
        <option value="Wukro">Wukro</option>
        <option value="Korem">Korem</option>
        <option value="Adwa">Adwa</option>
        <option value="Maychew">Maychew</option>
        <option value="Hawzen">Hawzen</option>
        <option value="Endabaguna">Endabaguna</option>
        <option value="Zana">Zana</option>
        <option value="Deda">Deda</option>
        <option value="Hagereselam">Hagereselam</option>
    </select>
</div>

        </div>
  
        <!-- Kebele and Breakfast Included Side by Side -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="kebele" class="block text-sm font-medium text-gray-700">Kebele</label>
            <input
              type="text"
              id="kebele"
              v-model="hotel.kebele"
              required
              class="mt-1 p-2 border border-gray-300 rounded-md w-full shadow-sm focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Breakfast Included?</label>
            <select v-model="hotel.breakfastIncluded" class="mt-1 p-2 border border-gray-300 rounded-md w-full shadow-sm focus:ring focus:ring-blue-300">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>
  
       <!-- Bed Types -->
<div>
  <label class="block text-sm font-medium text-gray-700">Bed Types</label>
  <div v-for="(bed, index) in hotel.bedTypes" :key="index" class="flex items-center mb-4">
    <div class="flex-grow">
      <select
        id="bed-type"
        v-model="bed.type"
        required
        class="mt-1 p-2 border border-gray-300 rounded-md w-full shadow-sm focus:ring focus:ring-blue-300 transition duration-200 ease-in-out"
      >
        <option value="" disabled>Select a bed type</option>
        <option value="Single Bed">Single Bed</option>
        <option value="Double Bed">Double Bed</option>
        <option value="Queen Bed">Queen Bed</option>
        <option value="King Bed">King Bed</option>
        <option value="Twin Beds">Twin Beds</option>
        <option value="Sofa Bed">Sofa Bed</option>
      </select>
    </div>

    <div class="flex-grow ml-4">
      <input
              type="text"
              id="price"
              placeholder="price"
              v-model="bed.price"
              required
              class="mt-1 p-2 border border-gray-300 rounded-md w-full shadow-sm focus:ring focus:ring-blue-300"
            />
    </div>

    <div class="flex-grow ml-4">
      <input
              type="text"
              id="capacity"
              placeholder="capacity"
              v-model="bed.capacity"
              required
              class="mt-1 p-2 border border-gray-300 rounded-md w-full shadow-sm focus:ring focus:ring-blue-300"
            />
    </div>
    
    <div class="flex items-center ml-4">
      <input
        type="checkbox"
        v-model="bed.available"
        class="h-5 w-5 text-blue-500 border-gray-300 rounded focus:ring focus:ring-blue-300 transition duration-200 ease-in-out"
      />
      <span class="ml-2 text-sm">Available</span>
    </div>
    
    <button type="button" @click="removeBedType(index)" class="ml-4 text-red-600 hover:underline transition duration-200 ease-in-out">
      Remove
    </button>
  </div>
  
  <button type="button" @click="addBedType" class="mt-2 bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200 ease-in-out">
    Add Bed Type
  </button>
</div>

  
        <!-- Amenities -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Amenities</label>
          <div class="flex items-center mb-2">
            <input type="checkbox" v-model="hotel.amenities.spa" class="h-5 w-5 text-blue-500 border-gray-300 rounded focus:ring focus:ring-blue-300" />
            <span class="ml-2">SPA</span>
          </div>
          <div class="flex items-center mb-2">
            <input type="checkbox" v-model="hotel.amenities.swimmingPool" class="h-5 w-5 text-blue-500 border-gray-300 rounded focus:ring focus:ring-blue-300" />
            <span class="ml-2">Swimming Pool</span>
          </div>
          <div class="flex items-center mb-2">
            <input type="checkbox" v-model="hotel.amenities.parking" class="h-5 w-5 text-blue-500 border-gray-300 rounded focus:ring focus:ring-blue-300" />
            <span class="ml-2">Parking</span>
          </div>
          <div class="flex items-center mb-2">
            <input type="checkbox" v-model="hotel.amenities.wifi" class="h-5 w-5 text-blue-500 border-gray-300 rounded focus:ring focus:ring-blue-300" />
            <span class="ml-2">Free Wi-Fi</span>
          </div>
          <div class="flex items-center mb-2">
            <input type="checkbox" v-model="hotel.amenities.gym" class="h-5 w-5 text-blue-500 border-gray-300 rounded focus:ring focus:ring-blue-300" />
            <span class="ml-2">Gym</span>
          </div>
        </div>


        <div>
    <h2>Select a Location</h2>
    <div id="map" class="map-container"></div>
    <div v-if="hotel.latitude && hotel.longitude" class="coordinates">
      <p>Latitude: {{ hotel.latitude }}</p>
      <p>Longitude: {{ hotel.longitude }}</p>
    </div>
  </div>
  
        <!-- Contact Number -->
        <div>
          <label for="contact" class="block text-sm font-medium text-gray-700">Contact Number</label>
          <input
            type="tel"
            id="contact"
            v-model="hotel.contact"
            required
            class="mt-1 p-2 border border-gray-300 rounded-md w-full shadow-sm focus:ring focus:ring-blue-300"
          />
        </div>

        
  
  
        <!-- Profile Picture Upload -->
        <div>
          <label for="profileImage" class="block text-sm font-medium text-gray-700">Upload Profile Picture</label>
          <input
            type="file"
            id="profileImage"
            @change="onProfileImageChange"
            accept="image/*"
            required
            class="mt-1 p-2 border border-gray-300 rounded-md w-full shadow-sm focus:ring focus:ring-blue-300"
          />
          <img v-if="profileImagePreview" :src="profileImagePreview" alt="Profile Preview" class="mt-2 w-32 h-32 object-cover rounded-md border border-gray-200" />
        </div>
  
        <!-- Gallery Images Upload -->
        <div>
          <label for="galleryImages" class="block text-sm font-medium text-gray-700">Upload Gallery Images</label>
          <input
            type="file"
            id="galleryImages"
            @change="onGalleryImagesChange"
            accept="image/*"
            multiple
            class="mt-1 p-2 border border-gray-300 rounded-md w-full shadow-sm focus:ring focus:ring-blue-300"
          />
          <div class="grid grid-cols-3 gap-4 mt-2">
            <img v-for="(img, index) in galleryImagePreviews" :key="index" :src="img" alt="Gallery Image Preview" class="w-24 h-24 object-cover rounded-md border border-gray-200" />
          </div>
        </div>
  
        <button type="submit" class="mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition">
          Add Hotel
        </button>
      </form>
    </div>
    <Footer />
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  import Header from '../components/Header.vue';
  import Footer from '../components/Footer.vue';
  import L from "leaflet"; 
  
  export default {
    components: {
        Header,
        Footer,
      },
    data() {
      return {
        map: null,
      marker: null,
      
        hotel: {
          name: '',
          location: '',
          kebele: '',
          breakfastIncluded: 'yes',
          bedTypes: [{ type: '', price: '', capacity:'', available: false }], // Start with one bed type
          amenities: {
            spa: false,
            swimmingPool: false,
            parking: false,
            wifi: false,
            gym: false,
          },
          contact: '',
          longitude:'',
          latitude:'',
          star:'',
          cancellationPolicy: '',
        },
        profileImagePreview: null, // For profile image preview
        galleryImagePreviews: [], // Array for gallery image previews
      };
    },
    mounted() {
    this.initMap();
  },
    methods: {
      ...mapActions('hotel', ['addHotels']),
      onProfileImageChange(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.profileImagePreview = e.target.result;
      };
      this.hotel.profileImage = file; // Store the file for submission
      reader.readAsDataURL(file);
    }
  },
      onGalleryImagesChange(event) {
    this.galleryImagePreviews = [];
    this.hotel.galleryImages = []; // Store files for submission
    const files = Array.from(event.target.files);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.galleryImagePreviews.push(e.target.result);
      };
      this.hotel.galleryImages.push(file); // Add file to array for submission
      reader.readAsDataURL(file);
    });
  },
      addBedType() {
        this.hotel.bedTypes.push({ type: '', price:'', available: false }); // Add new bed type entry
      },
      removeBedType(index) {
        this.hotel.bedTypes.splice(index, 1); // Remove a bed type entry
      },
      async submitForm() {
  const formData = new FormData();

  // Append basic hotel data
  formData.append('name', this.hotel.name);
  formData.append('location', this.hotel.location);
  formData.append('kebele', this.hotel.kebele);
  formData.append('breakfastIncluded', this.hotel.breakfastIncluded);
  formData.append('contact', this.hotel.contact);
  formData.append('longitude', this.hotel.longitude);
  formData.append('latitude', this.hotel.latitude);
  formData.append('star', this.hotel.star);

  // Append amenities and bed types
  formData.append('amenities', JSON.stringify(this.hotel.amenities));
  formData.append('bedTypes', JSON.stringify(this.hotel.bedTypes));

  // Append profile image file
  if (this.hotel.profileImage) {
    formData.append('profileImage', this.hotel.profileImage);
  }

  // Append gallery images (remove array index notation)
  if (this.hotel.galleryImages && this.hotel.galleryImages.length) {
    this.hotel.galleryImages.forEach((file) => {
      formData.append('galleryImages', file); // Just use 'galleryImages' for each file
    });
  }

  // Call the action to send the data to the server
  try {
    await this.addHotels(formData);
    
    this.resetForm(); // Uncomment to reset the form after successful submission
    this.$router.push({ name: 'home' });
  } catch (error) {
    console.error("Error adding hotel: ", error);
  }
},
initMap() {
      // Initialize the map and set a default view
      this.map = L.map("map").setView([14.8833, 39.0000], 7); // Default to London

      // Load and display tile layer from OpenStreetMap
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

      // Add click event to get coordinates
      this.map.on("click", (e) => {
        this.setMarker(e.latlng);
      });
    },
    setMarker(latlng) {
      // Place or move marker
      if (this.marker) {
        this.marker.setLatLng(latlng);
      } else {
        this.marker = L.marker(latlng).addTo(this.map);
      }

      // Update coordinates
      this.hotel.latitude = latlng.lat;
      this.hotel.longitude = latlng.lng;
    },

  // Reset form after submission
  resetForm() {
    this.hotel = {
      name: '',
      location: '',
      kebele: '',
      breakfastIncluded: 'yes',
      bedTypes: [{ type: '', price:'', capacity:'', available: false }],
      amenities: {
        spa: false,
        swimmingPool: false,
        parking: false,
        wifi: false,
        gym: false,
      },
      contact: '',
      latitude:'',
      longitude:'',
      star:'',
      cancellationPolicy: '',
      profileImage: null,  // Reset the profile image file
      galleryImages: []    // Reset the gallery image files
    };
    this.profileImagePreview = null;
    this.galleryImagePreviews = [];
  }
    },
  };
  </script>
  
  <style scoped>
  /* Add any additional styles here */
  .bg-blue-500 {
    background-color: #3B82F6; /* Tailwind's blue color */
  }
  
  .text-blue-500 {
    color: #3B82F6; /* Tailwind's blue color */
  }
  .map-container {
  width: 100%;
  height: 400px; /* Ensure this has a defined height */
}
.coordinates {
  margin-top: 10px;
}
  </style>
  