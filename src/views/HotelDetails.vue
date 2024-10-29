<template>
  <div class="min-h-screen flex flex-col">
    <Header />
    <div class="container mx-auto p-4 md:p-8 flex-grow">
      <div class="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h1 class="text-3xl font-bold mb-4">{{ hotel.name }}</h1>
        <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
          <div class="w-full md:w-1/2">
            <div class="relative">
              <img
                :src="activeImage"
                alt="Hotel Image"
                class="w-full h-64 object-cover rounded-lg mb-4 transition-transform duration-300 transform hover:scale-105"
              />
              <div class="absolute bottom-0 left-0 flex space-x-2 p-2">
                <img
                  v-for="(image, index) in hotel.galleryImages"
                  :key="index"
                  :src="`${baseUrl}${image}`"
                  class="w-16 h-16 object-cover cursor-pointer rounded-md hover:opacity-80 transition-opacity duration-300"
                  @click="setActiveImage(image)"
                  :class="{'border-4 border-blue-500': activeImage === image}"
                />
              </div>
            </div>
          </div>

          <div class="w-full md:w-1/2 space-y-4">
            <p class="text-gray-600">
     
     <span v-for="star in maxStars" :key="star" class="text-yellow-500">
       <i v-if="star <= hotel.star" class="mdi mdi-star"></i>
       <i v-else class="mdi mdi-star-outline"></i>
     </span>
   </p>
            <p><strong>Contact:</strong> {{ hotel.contact }}</p>
            <p v-if="hotel.breakfastIncluded"><strong>Includes Breakfast</strong></p>
            <p><strong>Location:</strong> {{ hotel.location }}</p>
          </div>
        </div>
      </div>

      <div class="bg-gray-100 p-6 rounded-lg mb-8">
        <h2 class="text-2xl font-bold mb-4">Amenities</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div v-for="(available, amenity) in hotel.amenities" :key="amenity" class="flex items-center space-x-2">
            <span :class="available ? 'mdi mdi-check-circle text-green-500 text-xl' : 'mdi mdi-close-circle text-red-500 text-xl'"></span>
            <span>{{ formatAmenityName(amenity) }}</span>
          </div>
        </div>
      </div>

      <div class="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 class="text-2xl font-bold mb-4">Room Types</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="room in hotel.bedTypes" :key="room.type" class="bg-gray-50 p-4 rounded-lg flex justify-between">
            <div>
              <h3 class="font-semibold">{{ room.type }}</h3>
              <p>Capacity: {{ room.capacity }}</p>
            </div>
            <p class="font-bold">ETB {{ room.price }} per night</p>
          </div>
        </div>
      </div>

      <div class="flex flex-col md:flex-row space-x-0 md:space-x-4 mb-8">
        <div class="bg-gray-100 p-6 rounded-lg w-full md:w-1/2">
          <h2 class="text-2xl font-bold mb-4">Location</h2>
          <div class="w-full h-64 rounded-lg overflow-hidden">
            <div>
    <div id="map" class="map-container"></div>
    <div v-if="hotel.latitude && hotel.longitude" class="coordinates">

    </div>
  </div>
          </div>
        </div>

        <div class="bg-white shadow-lg rounded-lg p-6 w-full md:w-1/2">
          <comment :id="this.id" />
        </div>
      </div>
      
    </div>
    <Footer />
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import comment from "@/components/comment.vue";
import { mapActions, mapGetters } from "vuex";
import L from 'leaflet';

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  components: {
    Header,
    Footer,
    comment,
  },
  data() {
    return {
      baseUrl: 'http://localhost:3000/',
      hotel: {},
      activeImage: "",
      map: null,
      marker: null,
      maxStars: 5, 
    };
  },
  async created() {
    await this.getHotelById(this.id);
    this.hotel = this.selectedHotel.hotel;

    // Check if latitude and longitude exist before initializing map
    if (this.hotel.latitude && this.hotel.longitude) {
      this.initMap();
    } else {
      console.error("Latitude and/or longitude not defined for hotel.");
    }

    // Set the initial active image to the first one in the gallery
    if (this.hotel.galleryImages && this.hotel.galleryImages.length > 0) {
      this.activeImage = this.baseUrl + this.hotel.galleryImages[0];
    }
  },
  watch: {
    'hotel.profileImage': function(newImage) {
      if (newImage) {
        this.activeImage = this.baseUrl + newImage;
      }
    }
  },
  computed: {
    ...mapGetters('hotel', {
      selectedHotel: 'getHotelById', // Map getter to local computed property
    }),
  },
  methods: {
    ...mapActions('hotel', ['getHotelById']),
    setActiveImage(image) {
      this.activeImage = this.baseUrl + image;
    },
    formatAmenityName(amenity) {
      return amenity.replace(/([A-Z])/g, ' $1') // Add space before capital letters
                    .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
    },

    initMap() {
      const mapContainer = document.getElementById('map');
      if (!mapContainer) {
        console.error("Map container not found.");
        return;
      }

      // Initialize map with specific coordinates
      this.map = L.map(mapContainer).setView([this.hotel.latitude, this.hotel.longitude], 7); // Adjust zoom level as necessary

      // Add OpenStreetMap tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

      // Add a marker at the initial coordinates
      this.marker = L.marker([this.hotel.latitude, this.hotel.longitude]).addTo(this.map);

      // Optional: Add click event to update coordinates and marker
      this.map.on('click', (e) => {
        this.setMarker(e.latlng);
      });
    },
    
    setMarker(latlng) {
      // Move or place marker
      if (this.marker) {
        this.marker.setLatLng(latlng);
      } else {
        // If marker does not exist, create one
        this.marker = L.marker(latlng).addTo(this.map);
      }

      // Update coordinates in hotel object
      this.hotel.latitude = latlng.lat;
      this.hotel.longitude = latlng.lng;
    }
  }
};
</script>

<style>
.map-container {
  width: 100%;
  height: 400px; /* Ensure this has a defined height */
}
.coordinates {
  margin-top: 10px;
}
</style>