<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <div class="flex-grow">
      <div class="flex flex-col md:flex-row p-8 mx-auto max-w-7xl">
        <aside class="w-full md:w-1/4 bg-gray-100 p-6 border-r rounded-lg">
          <h2 class="text-xl font-bold mb-4">Filters</h2>

          <div class="mb-4">
            <h3 class="font-semibold">Price Range</h3>
            <input
              type="range"
              v-model="priceRange"
              min="0"
              max="20000"
              step="10"
              class="w-full"
            />
            <p class="text-sm">Max Price: ${{ priceRange }}</p>
          </div>

          <div class="mb-4">
            <h3 class="font-semibold">Star Rating</h3>
            <div v-for="star in [1, 2, 3, 4, 5]" :key="star">
              <label class="flex items-center mb-1">
                <input type="checkbox" v-model="selectedStars" :value="star" class="mr-2" />
                {{ star }} Star
              </label>
            </div>
          </div>

          <div class="mb-4">
            <h3 class="font-semibold">Breakfast Included</h3>
            <label class="flex items-center mb-1">
              <input type="checkbox" v-model="includeBreakfast" class="mr-2" />
              Yes
            </label>
          </div>

          <div class="mb-4">
            <h3 class="font-semibold">Amenities</h3>
            <div>
              <label class="flex items-center mb-1">
                <input type="checkbox" v-model="selectedAmenities" value="wifi" class="mr-2" />
                Free Wi-Fi
              </label>
              <label class="flex items-center mb-1">
                <input type="checkbox" v-model="selectedAmenities" value="parking" class="mr-2" />
                Parking
              </label>
              <label class="flex items-center mb-1">
                <input type="checkbox" v-model="selectedAmenities" value="swimmingPool" class="mr-2" />
                Swimming Pool
              </label>
              <label class="flex items-center mb-1">
                <input type="checkbox" v-model="selectedAmenities" value="gym" class="mr-2" />
                Gym
              </label>
              <label class="flex items-center mb-1">
                <input type="checkbox" v-model="selectedAmenities" value="spa" class="mr-2" />
                Spa
              </label>
            </div>
          </div>
        </aside>

        <main class="w-full md:w-3/4 p-6 mx-auto">
          <h2 class="text-2xl font-bold mb-4">Available Hotels</h2>
          <div v-if="loading" class="text-center">
            <span>Loading...</span>
          </div>
          <div v-else-if="filteredHotels.length > 0" class="flex flex-col space-y-6">
            <div
              v-for="hotel in filteredHotels"
              :key="hotel._id"
              class="bg-white rounded-lg shadow-md p-4 cursor-pointer flex items-start space-x-4 relative"
              @click="goToDetails(hotel._id)"
            >
              <div class="w-1/3 relative">
                <img
                  :src="`${baseUrl}${hotel.profileImage}`"
                  alt="Hotel Image"
                  class="w-full h-48 object-cover rounded-md mb-2"
                />
              </div>
              <div class="flex-1">
                <h3 class="text-lg font-semibold">{{ hotel.name }}</h3>
                <p class="text-gray-600">
                  <span v-for="star in maxStars" :key="star" class="text-yellow-500">
                    <i v-if="star <= hotel.star" class="mdi mdi-star"></i>
                    <i v-else class="mdi mdi-star-outline"></i>
                  </span>
                </p>
                <span v-if="getBedTypePrice(hotel.bedTypes, bedType)">
                  ${{ getBedTypePrice(hotel.bedTypes, bedType) * duration }}
                </span>
                <p class="text-gray-600">Duration: {{ duration }}</p>
                <p class="text-gray-600">Breakfast Included: {{ hotel.breakfastIncluded ? 'Yes' : 'No' }}</p>
                <p class="text-gray-600" v-if="bedType">Bed Preference: {{ bedType }}</p>
                <button
                  @click.stop="orderHotel(hotel._id, (getBedTypePrice(hotel.bedTypes, bedType) * duration), hotel.profileImage )"
                  class="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md transition-colors duration-300 hover:bg-blue-600"
                >
                  Order
                </button>
              </div>
            </div>
          </div>
          <div v-else>
            No hotels found. Please try a different search.
          </div>
        </main>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      priceRange: 20000,
      selectedStars: [],
      includeBreakfast: false,
      bedPreference: '',
      selectedAmenities: [],
      favoriteHotels: [],
      hotels: [],
      location: '',
      loading: true,
      baseUrl: 'http://localhost:3000/',
      bedType: '',
      bedPrice: null,
      maxStars: 5,
    };
  },
  async created() {
    await this.fetchData();
    const { location, checkIn, checkOut, bedType, duration } = this.$route.query;
    this.location = location;
    this.checkIn = checkIn;
    this.checkOut = checkOut;
    this.bedType = bedType;
    this.duration = duration;
  },
  computed: {
    ...mapGetters('hotel', ['getHotels']),

    filteredHotels() {
      return this.hotels.filter((hotel) => {
        const matchesLocation = hotel.location === this.location;
        const matchesBedType = !this.bedType || hotel.bedTypes.some(bed => bed.type === this.bedType);
        const bedTypePrice = this.bedType ? Number(this.getBedTypePrice(hotel.bedTypes, this.bedType) * this.duration) : null;
        const maxPrice = Number(this.priceRange);
        const matchesPriceRange = bedTypePrice === null || bedTypePrice <= maxPrice;

        const matchesBreakfast = !this.includeBreakfast || hotel.breakfastIncluded;
        const matchesAmenities = this.selectedAmenities.every(amenity => hotel.amenities[amenity]);
        const matchesStars = !this.selectedStars.length || this.selectedStars.includes(parseInt(hotel.star, 10));

        return matchesLocation && matchesBedType && matchesPriceRange && matchesBreakfast && matchesAmenities && matchesStars;
      });
    },
  },
  methods: {
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
    getBedTypePrice(bedTypes, selectedType) {
      const bed = bedTypes.find(bed => bed.type === selectedType);
      return bed ? bed.price : null;
    },
    goToDetails(id) {
      this.$router.push(`/hotelDetails/${id}`);
    },
    orderHotel(hotelId, bedPrice, image) {
      this.$router.push({
        path: "/orderHotel",
        query: {
          hotelId: hotelId,
          checkIn: this.checkIn,
          checkOut: this.checkOut,
          bedType: this.bedType,
          duration: this.duration,
          bedPrice: bedPrice,
          image: image,
        },
      });
    },
  },
};
</script>

<style scoped>
/* Add any necessary styles */
</style>
