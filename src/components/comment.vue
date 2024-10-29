<template>
    <div class="w-full flex flex-col relative">
      <!-- Comments Section -->
      <div class="flex-1 mb-4 overflow-hidden">
        <h2 class="text-lg font-bold mb-2">Comments</h2>
        <div class="max-h-36 overflow-y-auto scrollbar" v-if="filteredComments.length > 0">
          <div
            v-for="(item, index) in filteredComments.slice(0, 3)" 
            :key="index"
            class="mb-2 p-2 border-b border-gray-200 flex items-center"
          >
            <!-- Avatar and Name -->
            <img
              src="./../assets/avatar.png"
              alt="User Avatar"
              class="w-10 h-10 rounded-full mr-3"
            />
            <div class="flex-1">
              <div class="flex items-center justify-between">
                <p class="font-semibold">{{ item.user.name }}</p>
                <!-- Uncomment to add like button -->
                <!-- <button
                  @click="toggleLike(item._id)"
                  class="text-gray-600 hover:text-gray-900"
                >
                  <span
                    class="material-icons"
                    :class="{ 'text-blue-500': item.liked }"
                  >
                    {{ item.liked ? "thumb_up" : "thumb_up_off_alt" }}
                  </span>
                </button> -->
              </div>
              <p class="text-sm text-gray-600 mt-1">{{ item.comment }}</p>
            </div>
          </div>
        </div>
        <div v-else>
          <p class="text-gray-600">No comments available.</p>
        </div>
      </div>
  
      <!-- Add Comment Section -->
      <div class="mt-4 flex items-center" v-if="user">
        <textarea
          v-model="comment"
          class="flex-grow p-2 border border-gray-300 rounded-md"
          rows="2"
          placeholder="Write a comment..."
        ></textarea>
        <button
          @click="submitComment"
          class="ml-2 text-blue-500 hover:text-blue-700"
        >
          <span class="material-icons">send</span>
        </button>
      </div>
      <div v-else class="mt-4 p-2 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded-md">
        <p>Please <a href="/login" class="text-blue-500 underline">log in</a> to add comments.</p>
      </div>
    </div>
  </template>
  
  
  <script>
  import { mapActions, mapGetters } from "vuex";
  
  export default {
    props: {
      id: {
        type: String,
        required: true,
      },
    },
  
    data() {
      return {
        comment: "",
        filteredComments: [],
        comments: [], // Holds all comments
        user: JSON.parse(localStorage.getItem("user")),
      };
    },
  
    created() {
      this.fetchData();
    },
  
    computed: {
      ...mapGetters("comment", ["getComments"]),
    },
  
    methods: {
      ...mapActions("comment", [
        "addComment",
        "fetchComments",
        "toggleCommentLike", // Add action to toggle like
      ]),
  
      async fetchData() {
        try {
          await this.fetchComments(); // Call the Vuex action to fetch comments
          this.comments = this.getComments; // Update comments with fetched data
          this.filterComments(); // Filter comments based on hotel ID
        } catch (error) {
          console.error('Failed to fetch comments:', error);
        }
      },
  
      submitComment() {
        if (this.comment.trim() === "") {
          alert("Comment cannot be empty!");
          return;
        }
        this.addComment({
          hotel: this.id,
          user: this.user._id,
          comment: this.comment,
        }).then(() => {
          this.fetchData(); // Fetch comments again to update the list
          this.comment = ""; // Clear the comment input
        });
      },
  
      filterComments() {
        this.filteredComments = this.comments.filter(
          (c) => c.hotel._id === this.id // Filter comments based on hotel ID
        );
      },
    },
  };
  </script>
  
  <style scoped>
  .scrollbar {
    scrollbar-width: thin;
    scrollbar-color: #cbd5e1 transparent;
  }
  
  .scrollbar::-webkit-scrollbar {
    width: 8px;
  }
  
  .scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .scrollbar::-webkit-scrollbar-thumb {
    background-color: #cbd5e1;
    border-radius: 4px;
  }
  </style>
  