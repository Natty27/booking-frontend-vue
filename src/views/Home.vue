<template>
  <div class="bg-gray-100">
    <Header />
    <SearchBar />
    <FeaturedDestinations />
    <RecommendedStays />
    <Footer />
  </div>
</template>

<script>
import Header from "./../components/Header.vue";
import SearchBar from "./../components/SearchBar.vue";
import FeaturedDestinations from "./../components/FeaturedDestinations.vue";
import RecommendedStays from "./../components/RecommendedStays.vue";
import Footer from "./../components/Footer.vue";

export default {
  components: {
    Header,
    SearchBar,
    FeaturedDestinations,
    RecommendedStays,
    Footer,
  },
};
</script>
