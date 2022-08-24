<template>
  <div class="container">
    <div class="row" v-for="item in inventory" :key="item.id">
      <div class="col-md-4">
        <img class="img-thumbnail" :src="item.image" />
      </div>
      <div class="col-md-5">
        <h6>{{ item.title }}</h6>
        <p><label>Type:</label> {{ item.category }}</p>
        <p><label>Price:</label> $ {{ item.price }}</p>
        <!-- <label> {{ item.description }}</label> -->
      </div>
      <div class="col-md-2">
        <div class="cell">
          <label>Quantity:</label>
        </div>
        <div class="cell">
          <input type="number" class="form-control" v-model.number="item.quantity" />
        </div>
        <br />
        <button
          @click="addToCart(item, item.title, item.id - 1)"
          class="btn btn-primary btn-block"
        >
          <!-- @click="addToCart(product.title, product.id - 1)" -->
          Add to cart
        </button>
      </div>
  
    </div>
  </div>


</template>
<script>
//import ProductItem from '@/components/ProductItem'
export default {
  name: "HomeComponent",
  props: ["inventory", "addToCart"],
  component: {
    // ProductItem,
  },
};
</script>

