<template>
  <section class="py-16">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold mb-8 text-center">Featured Destinations</h2>

      <!-- Carousel -->
      <div class="flex space-x-4 overflow-x-scroll">
        <div
          v-for="destination in destinations"
          :key="destination.name"
          class="w-80 bg-white rounded-lg shadow-lg"
        >
          <div class="rounded-t-lg overflow-hidden">
            <template v-if="destination.isVideo">
              <video
                :src="destination.image"
                class="w-full"
                muted
                autoplay
                loop
              ></video>
            </template>
            <template v-else>
              <img
                :src="destination.image"
                :alt="destination.name"
                class="rounded-t-lg"
              />
            </template>
          </div>
          <div class="p-4">
            <h3 class="text-xl font-bold">{{ destination.name }}</h3>
            <p class="text-gray-500">{{ destination.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import mekelleImage from "../assets/mekelle.mp4"; // Correctly import the local video
import shireImage from "../assets/shire.mp4"; // Correctly import the local image 
import axumImage from "../assets/axum.mp4"; 
import adigratImage from "../assets/adigrat.mp4"; 

export default {
  data() {
    return {
      destinations: [
        {
          name: "Mekelle",
          image: mekelleImage, // Use the imported video
          description: "Explore the Big Apple",
          isVideo: true, // Mark this destination as a video
        },
        {
          name: "Shire",
          image: shireImage,
          description: "City of Light",
          isVideo: true, // Mark this destination as an image
        },
        {
          name: "Axum",
          image: axumImage,
          description: "A blend of tradition and modernity",
          isVideo: true, // Mark this destination as an image
        },
        {
          name: "Adigrat",
          image: adigratImage,
          description: "City of Peace",
          isVideo: true, // Mark this destination as an image
        },
      ],
    };
  },
};
</script>
