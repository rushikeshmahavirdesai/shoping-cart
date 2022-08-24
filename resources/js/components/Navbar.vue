<template>
    <!-- <header class="top-bar spread">
        <nav class="top-bar-nav">
          <a href="../app.html" class="top-bar-link">
            <i class="icofont-spoon-and-fork"></i>
            <span>Home</span>
          </a>
          <a href="products.html" class="top-bar-link">
            <span>Products</span>
          </a>
          <a href="past-orders.html" class="top-bar-link">
            <span>Past Orders</span>
          </a>
        </nav>
        <a href="#" class="top-bar-cart-link">
          <i class="icofont-cart-alt icofont-1x"></i>
          <span>Cart (0)</span>
        </a>
      </header> -->
      <nav class="navbar navbar-default">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="#">Session Cart</a>
    </div>
    <ul class="nav navbar-nav">
      <!-- <li class="active"><a href="#">Home</a></li>
      <li><a href="#">Page 1</a></li>
      <li><a href="#">Page 2</a></li>
      <li><a href="#">Page 3</a></li> -->
       <li> <router-link to="/">Products</router-link> </li>
       <li> <router-link to="/cart">Cart {{totalQtyNav}}</router-link> </li>
    </ul>
  </div>
</nav>
</template>
<script>
export default {
    name:"NavbarComponent",
    props:["totalQtyNav"],
     data() {
        return {
            
        }
     },
}
</script>