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
    <center>
      <div v-if="!showCart" class="custom-badge">
         <img class="empty-cart" src="https://cdn-icons-png.flaticon.com/512/102/102661.png"/>
        <h4>Cart Is Empty</h4>
      </div>
    </center>

    <div class="row" v-if="showCart">
      <div class="col-md-8">
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
                <button @click="removeCart(item, key)" class="remove-button">
                  Remove 
                </button>
              </div>
              <div class="col-md-3">
                <div class="row">
                  <div class="col-md-2">
                    <label>Qty</label>
                  </div>
                  <div class="col-md-10">
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
        </div>
      </div>
      <div class="col-md-4">
        <div class="card">
          <h3>Checkout</h3>
          <ul class="list-group">
            <li class="list-group-item">Total Proucts:- {{ this.totalQtyNav }}</li>
            <li class="list-group-item">Total Amount:- {{ this.totalAmount }}</li>
            <li class="list-group-item">
               <label>User Name:-</label>
               <input type="text" class="form-control" />
            </li>
            <li class="list-group-item">
               <label>Address:-</label>
               <input type="text" class="form-control" />
            </li>
          </ul>

          
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
      showCart: false,
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
      let products2 = Object.values(Array.of(this.cartItems)[0]);
      console.log("showCart", products2);
      if (products2.length > 0) {
        this.showCart = true;
      } else {
        this.showCart = false;
      }
      console.log(this.showCart);
    },
    removeCart(item, id) {
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
<style>
  .remove-button{
    outline:none;
    border:none;
    background:none;
    color:red;
    margin-left:-5px;
  }
  .custom-badge{
      color:red;
      font-weight:bold;

  }
  .empty-cart{
    width:150px;
    height:150px
  }
</style>
