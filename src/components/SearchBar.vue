<template>
  <section class="bg-blue-500 py-16">
    <div class="container mx-auto text-center text-white">
      <h1 class="text-4xl font-bold mb-4">Find the Perfect Stay</h1>
      <p class="mb-8">Search from hundreds of properties around the world</p>

      <div class="bg-white p-6 rounded-lg shadow-lg inline-block text-gray-800">
        <form
        @submit.prevent="search"
          class="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4"
        >
          <div class="flex flex-col">
            <label class="font-bold">Location</label>
            <select
      id="location"
      v-model="location"
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
          <div class="flex flex-col">
            <label class="font-bold">Check-in</label>
            <input
              v-model="checkIn"
              type="date"
              class="border px-4 py-2 rounded-md w-full"
            />
          </div>
          <div class="flex flex-col">
            <label class="font-bold">Check-out</label>
            <input
              v-model="checkOut"
              type="date"
              class="border px-4 py-2 rounded-md w-full"
            />
          </div>
          <div class="flex flex-col">
            <label class="font-bold">Bed Type</label>
            <select
        id="bed-type"
        v-model="bedType"
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
          <div class="flex flex-col">
            <label class="font-bold text-color-white"> `</label>
          <button
            type="submit"
            class="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
          >
            Search
          </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      location: "",
      checkIn: "",
      checkOut: "",
      bedType:"",
    };
  },
  computed: {
    // computed properties can be used to dynamically calculate values based on the data in the component
    dateInterval() {
      if (this.checkIn && this.checkOut) {
        const checkInDate = new Date(this.checkIn);
        const checkOutDate = new Date(this.checkOut);
        const timeDifference = checkOutDate - checkInDate;

        // Convert the difference from milliseconds to days
        return timeDifference > 0 ? timeDifference / (1000 * 60 * 60 * 24) : 0;
      }
      return 0;
    },
  },
  methods: {
    search() {
      this.$router.push({
        path: "/searchresults",
        query: {
          location: this.location,
          checkIn: this.checkIn,
          checkOut: this.checkOut,
          bedType: this.bedType,
          duration: this.dateInterval,
        },
      });
    },
  },
};
</script>
