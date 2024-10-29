<template>
    <div class="min-h-screen flex flex-col">
      <!-- Header -->
      <Header />
      <main class="flex-1 bg-gray-100 p-4 sm:p-6">
  
        <!-- Search Input and Add Order Button in one row -->
        <div class="flex mb-4 space-x-4 items-center w-full">
          <!-- Search Input -->
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by any field..."
            class="flex-grow px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <!-- Add Order Button -->
          <!-- <button
            @click="routeToOrder"
            class="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md whitespace-nowrap"
          >
            Add Order
          </button> -->
        </div>
  
        <!-- Data Table -->
        <div class="overflow-x-auto">
          <table class="min-w-full table-auto bg-white shadow-lg rounded-lg border border-gray-200">
            <thead class="bg-gray-200 border-b-2 border-gray-400">
              <tr>
                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wide">Order Code</th>
                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wide">Hotel</th>
                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wide">Bed Type</th>
                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wide">Check In</th>
                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wide">Check Out</th>
                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wide">Duration</th>
                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wide">Full Name</th>
                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wide">Phone</th>
                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wide">Price</th>
                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wide">Status</th>
                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wide">Action</th>
              </tr>
            </thead>
            <tbody>
              <!-- Skeleton Loading Rows -->
              <tr v-if="loading">
                <td colspan="6">
                  <div class="skeleton-table">
                    <div class="skeleton-row" v-for="n in 5" :key="n">
                      <div class="skeleton-cell"></div>
                      <div class="skeleton-cell"></div>
                      <div class="skeleton-cell"></div>
                      <div class="skeleton-cell"></div>
                      <div class="skeleton-cell"></div>
                      <div class="skeleton-cell"></div>
                      <div class="skeleton-cell"></div>
                      <div class="skeleton-cell"></div>
                      <div class="skeleton-cell"></div>
                      <div class="skeleton-cell"></div>
                    </div>
                  </div>
                </td>
              </tr>
  
              <!-- Actual Data Rows -->
              <tr v-for="order in paginatedData" :key="order.id" v-if="!loading" class="odd:bg-white even:bg-gray-50 hover:bg-blue-50 cursor-pointer transition duration-200 ease-in-out border-b border-gray-200">
                <td class="px-6 py-4 text-sm text-gray-900">{{ order.orderCode }}</td>
                <td class="px-6 py-4 text-sm text-gray-900">{{ order.hotel?.name }}</td>
                <td class="px-6 py-4 text-sm text-gray-900">{{ order.bedType }}</td>
                <td class="px-6 py-4 text-sm text-gray-900">{{ order.checkIn.split('T')[0] }}</td>

                <td class="px-6 py-4 text-sm text-gray-900">{{ order.checkOut.split('T')[0] }}</td>
                <td class="px-6 py-4 text-sm text-gray-900">{{ order.duration }}</td>
                <td class="px-6 py-4 text-sm text-gray-900">{{ order.userDetails.fullName }}</td>
                <td class="px-6 py-4 text-sm text-gray-900">{{ order.userDetails.phone }}</td>
                <td class="px-6 py-4 text-sm text-gray-900">{{ order.bedPrice }}</td>
                <td class="px-6 py-4 text-sm text-gray-900">{{ order.status }}</td>
                <td class="px-6 py-4 text-sm text-gray-900">
                  <button v-if="order.status === 'pending'" @click.stop="payOrder(order)" class="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 text-sm rounded-md shadow-sm transition-transform transform hover:scale-105">Pay</button>
                  <button v-if="order.status === 'paid'" @click.stop="completeOrder(order)" class="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 text-sm rounded-md shadow-sm transition-transform transform hover:scale-105">Complete</button>
                  <button v-if="order.status != 'completed' && order.status != 'cancelled' " @click.stop="cancelOrder(order)" class="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 text-sm rounded-md shadow-sm transition-transform transform hover:scale-105 ml-2">Cancel</button>
                </td>
              </tr>
  
              <tr v-if="paginatedData.length === 0 && !loading">
                <td colspan="10" class="px-6 py-4 text-center text-gray-500">No matching data found</td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <!-- Delete Confirmation Dialog -->
        <div v-if="dialogDelete" class="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div class="bg-white rounded-lg p-4 sm:p-6 max-w-lg w-full">
            <h3 class="text-lg sm:text-xl font-bold mb-4">Are you sure you want to delete this item?</h3>
            <div class="flex justify-end space-x-2">
              <button @click="closeDelete" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-md">Cancel</button>
              <button @click="deleteItemConfirm" class="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md">OK</button>
            </div>
          </div>
        </div>
  
        <!-- Pagination and Dropdown -->
        <div class="mt-6 flex justify-between items-center">
          <!-- Previous Button -->
          <button @click="currentPage--" :disabled="currentPage === 1" class="text-blue-500 disabled:opacity-50">
            <i class="mdi mdi-chevron-left text-4xl"></i>
          </button>
  
          <!-- Showing Results and Items per Page Dropdown -->
          <div class="flex items-center space-x-2 text-sm text-gray-600">
            <span>Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to {{ Math.min(currentPage * itemsPerPage, filteredData.length) }} of {{ filteredData.length }} results</span>
            <select v-model="itemsPerPage" class="px-3 py-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
              <option v-for="n in [10, 15, 20, 25, 50, 100]" :key="n" :value="n">Show {{ n }} per page</option>
            </select>
          </div>
  
          <!-- Next Button -->
          <button @click="currentPage++" :disabled="currentPage >= totalPages" class="text-blue-500 disabled:opacity-50">
            <i class="mdi mdi-chevron-right text-4xl"></i>
          </button>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  import { mapActions, mapGetters } from "vuex";
  import Header from "@/components/Header.vue";
  
  export default {
    components: {
      Header,
    },
    data() {
      return {
        searchQuery: "",
        currentPage: 1,
        itemsPerPage: 10,
        loading: true,
        dialogDelete: false,
        editedItem: null, // Initialize editedItem for deletion confirmation
        orders: [],
      };
    },
    created() {
      this.fetchData();
    },
    computed: {
      ...mapGetters("order", ["getOrders"]),
      
      filteredData() {
        const searchText = this.searchQuery.toLowerCase();
        return this.orders.filter((order) => order.orderCode.toString().includes(searchText)) ||
        this.orders.filter((order) => order.checkIn.toString().includes(searchText)) ||
        this.orders.filter((order) => order.checkOut.toString().includes(searchText)) || 
        this.orders.filter((order) => order.userDetails.fullName.toLowerCase().includes(searchText)) ;
      },
      paginatedData() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = this.currentPage * this.itemsPerPage;
        return this.filteredData.slice(start, end);
      },
      totalPages() {
        return Math.ceil(this.filteredData.length / this.itemsPerPage);
      },
    },
    methods: {
      ...mapActions("order", ["fetchOrders", "updateOrder", "deleteOrder"]),
      
      async fetchData() {
        try {
          this.loading = true;
          await this.fetchOrders(); // Fetch hotels correctly
          this.orders = this.getOrders; // Set the fetched orders
        } catch (error) {
          console.error('Failed to fetch orders:', error);
        } finally {
          this.loading = false;
        }
      },
      routeToOrder() {
        this.$router.push(`/order/addOrder`);
      },
      deleteItem(item) {
        this.editedItem = item;
        this.dialogDelete = true;
      },
      async deleteItemConfirm() {
        try {
          if (!this.editedItem) return; // Ensure there is an item to delete
          await this.deleteOrder(this.editedItem._id); // Attempt to delete the order
          this.orders = this.orders.filter(order => order._id !== this.editedItem._id); // Update local orders
          this.closeDelete();
        } catch (error) {
          console.error("Error deleting order:", error);
        }
      },
      async payOrder(item) {
  try {
    this.loading = true; // Start loading
    const id = item._id;
    const updatedOrder = { ...item, status: "paid" }; // Create a new order with status as paid

    // Wait for the updateOrder action to complete
    await this.updateOrder({ id, updatedOrder }); 

    // Call fetchData only after the update is successful
    await this.fetchData(); 
  } catch (error) {
    console.error('Failed to pay order:', error);
  } finally {
    this.loading = false; // End loading
  }
},

async completeOrder(item) {
  try {
    this.loading = true; // Start loading
    const id = item._id;
    const updatedOrder = { ...item, status: "completed" }; // Create a new order with status as paid

    // Wait for the updateOrder action to complete
    await this.updateOrder({ id, updatedOrder }); 

    // Call fetchData only after the update is successful
    await this.fetchData(); 
  } catch (error) {
    console.error('Failed to pay order:', error);
  } finally {
    this.loading = false; // End loading
  }
},

async cancelOrder(item) {
  try {
    this.loading = true; // Start loading
    const id = item._id;
    const updatedOrder = { ...item, status: "cancelled" }; // Create a new order with status as paid

    // Wait for the updateOrder action to complete
    await this.updateOrder({ id, updatedOrder }); 

    // Call fetchData only after the update is successful
    await this.fetchData(); 
  } catch (error) {
    console.error('Failed to pay order:', error);
  } finally {
    this.loading = false; // End loading
  }
},

      closeDelete() {
        this.dialogDelete = false;
        this.editedItem = null; // Reset editedItem
      },
    },
    watch: {
      searchQuery() {
        this.currentPage = 1; // Reset the current page if search changes
      },
    },
  };
  </script>
  
  <style scoped>
  table {
    border-collapse: collapse;
  }
  
  .skeleton-table {
    width: 100%;
  }
  
  .skeleton-row {
    display: flex;
    padding: 10px 20px;
  }
  
  .skeleton-cell {
    height: 20px;
    flex: 1;
    background-color: #e0e0e0;
    margin-right: 10px;
    border-radius: 4px;
    animation: pulse 1.5s infinite ease-in-out;
  }
  
  .skeleton-cell:last-child {
    margin-right: 0;
  }
  
  @keyframes pulse {
    0% {
      background-color: #e0e0e0;
    }
    50% {
      background-color: #f0f0f0;
    }
    100% {
      background-color: #e0e0e0;
    }
  }
  </style>