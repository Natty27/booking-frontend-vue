<template>
  <section class="py-16 bg-gray-50">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold mb-8 text-center">Recommended Stays</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <RouterLink
          v-for="hotel in displayedHotels"
          :key="hotel.name"
          :to="`/hotelDetails/${hotel._id}`"
          class="bg-white rounded-lg shadow-lg"
        >
          <div class="w-full h-48 overflow-hidden">
            <img
              :src="`${baseUrl}${hotel.profileImage}`"
              :alt="hotel.name"
              class="rounded-t-lg w-full h-full object-cover" 
            />
          </div>

          <div class="p-4">
            <h3 class="text-xl font-bold">{{ hotel.name }}</h3>
            <p class="text-gray-500">{{ hotel.description }}</p>
            <div class="mt-4">
              <span class="text-lg font-bold text-blue-500">{{
                hotel.location
              }}</span>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      hotels: [],
      displayedHotels: [],
      baseUrl: 'http://localhost:3000/',
    };
  },

  async created() {
    await this.fetchData();
  },

  computed: {
    ...mapGetters('hotel', ['getHotels'])
  },

  methods: {
    ...mapActions('hotel', ['fetchHotels']),

    async fetchData() {
      try {
        this.loading = true;
        await this.fetchHotels();
        this.hotels = this.getHotels.hotels;

        // Randomly select up to 4 hotels
        this.displayedHotels = this.getRandomHotels(this.hotels, 4);
      } catch (error) {
        console.error('Failed to fetch hotels:', error);
      } finally {
        this.loading = false;
      }
    },

    getRandomHotels(hotelsArray, count) {
      // Shuffle the array and return a slice of the first 'count' hotels
      const shuffled = hotelsArray.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    },
  }
};
</script>
