<template>
  <!-- <div class="container">
     <div class="row">
    <div class="col-md-6">
    <div id="list-example" class="list-group">
       <div class="list-group-item list-group-item-action" v-for="(item, key) in cart" :key="item">
           <div class="row">
               <div class="col-md-3">
                  <img class="card-image" :src="getImage(key)" />
               </div>
               <div class="col-md-5">
                  <h6>Name: {{ key }}</h6>
                  <h6>Price: {{ getPrice(key) }}</h6>
                  <h6>Qty: {{ item }}</h6>
                  <h6>Total: $ {{ item * getPrice(key) }}</h6>
                  <button @click="remove(key)" class="btn btn-danger cart-remove">
                   &times;
                  </button>
               </div>
               <div class="col-md-3">
                  <input type="number" :value="item" @change="(e)=>someHandler(key,e.target.value)"> 
               </div>
           </div>
       </div>
  
     </div>
      
    </div>
    <div class="col-md-2">
       Checkout Total
    </div>
  </div>
   </div> -->

  <div class="container">
    <div v-if="cartItems.length === 0">Empty</div>
    <div class="row" v-if="cartItems.length != 0">
      <div class="col-md-10">
        <div id="list-example" class="list-group">
          <div
            class="list-group-item list-group-item-action"
            v-for="(item, key) in cartItems"
          >
            <div class="row">
              <div class="col-md-3">
                <img class="card-image" :src="item.attributes.image" />
              </div>
              <div class="col-md-5">
                <h6>Name: {{ item.name }}</h6>
                <h6>Price: {{ item.price }}</h6>
                <h6>Qty: {{ item.quantity }}</h6>
                <h6>Total: $ {{ item.quantity * item.price }}</h6>
                <!-- @click="remove(key)" -->
                <button @click="removeCart(item, key)" class="btn btn-danger cart-remove">
                  &times;
                </button>
              </div>
              <div class="col-md-3">
                <input
                  type="number"
                  :value="item.quantity"
                  class="form-control"
                  @change="(e) => updateCart(item, key, e.target.value)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-2">
        <div class="card">
          <h3>Checkout</h3>
          <label>Total Proucts:- {{ this.totalQtyNav }}</label>
          <label>Total Amount: {{ this.totalAmount }}</label>
          <label>Address:</label>
          <input type="text" class="formcontrol" />
          <br />
       <br />
       
          <button class="btn btn-primary btn-block mt-1">Checkout</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "CartComponent",
  props: [
    "toggle",
    "cart",
    "inventory",
    "remove",
    "someHandler",
    "loadDataCart",
    "totalQtyNav",
  ],
  data() {
    return {
      cartItems: [],
      totalAmount: 0,
    };
  },

  computed: {},
  mounted() {
    this.loadData();
    this.getCartInfo();
  },

  methods: {
    loadData() {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch("/cart", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          this.cartItems = result;
          this.totalQty();
          console.log(result);
        })
        .catch((error) => console.log("error", error));
    },
    getCartInfo() {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch(`/cart/cartinfo`, requestOptions)
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    },
    updateCart(item, id, value) {
      console.log(item, id, value);
      item.quantity = value;
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify(item);
      console.log(raw);
      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
      };

      fetch(`/cart/${id}`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          this.loadDataCart();
          this.totalQty();
        })
        .catch((error) => console.log("error", error));
    },
    totalQty() {
      let products = Object.values(Array.of(this.cartItems)[0]);
      console.log("products", products, this.cartItems);
      this.totalAmount = products.reduce((total, currentValue, currentIndex, arr) => {
        return total + currentValue.price * currentValue.quantity;
      }, 0);
      console.log(this.totalAmount);
    },
    removeCart(item, id) {
      console.log("---------", id, item);
      var requestOptions = {
        method: "DELETE",
      };

      fetch(`/cart/${id}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          this.cartItems = result;
          this.loadDataCart();
          this.totalQty();
        })
        .catch((error) => console.log("error", error));
    },

    cartTotal() {},
  },
};
</script>
