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
    <div class="row">
      <div class="col-md-6">
      <div v-if="cartItems.length === 0">
          Empty
      </div>
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
             
         </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "CartComponent",
  props: ["toggle", "cart", "inventory", "remove", "someHandler"],
  data() {
    return {
      cartItems: [],
    };
  },

  computed: {},
  mounted() {
    this.loadData();
    this.getCartInfo()
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
          console.log(result);
        })
        .catch((error) => console.log("error", error));
    },
    getCartInfo() {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch(`http://127.0.0.1:3333/cart/cartinfo`, requestOptions)
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    },
    updateCart(item, id, value) {
      console.log(item, id, value)
      item.quantity = value;
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify(item);
      console.log(raw)
      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
       
      };

      fetch(`http://127.0.0.1:3333/cart/${id}`, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    },
    removeCart(item, id) {
      console.log("---------", id, item);
      var requestOptions = {
        method: "DELETE",
       
      };

      fetch(`http://127.0.0.1:3333/cart/${id}`, requestOptions)
        .then((response) => response.json())
        .then((result) =>  this.cartItems = result)
        .catch((error) => console.log("error", error));
     
    },

    cartTotal() {},
  },
};
</script>
