<template>
  <NavbarComponent :totalQtyNav="totalQtyNav"/>
  <router-view
    :getTotalQty="getTotalQty"
    :inventory="inventory"
    :addToCart="addToCart"
    :cart="cart"
    :someHandler="someHandlerMethod"
    :remove="removeItem"
    :loadDataCart="loadData"
    :totalQtyNav="totalQtyNav"
  ></router-view>
</template>

<script>
import food from "./food.json";
import NavbarComponent from "./components/Navbar";
export default {
  name: "App",
  components: {
    NavbarComponent,
  },
  data() {
    return {
      showSidebar: false,
      inventory: [],
      cart: {},
      totalQtyNav:0,
      allProductsInCart:[]
    };
  },
  mounted() {
    this.inventory = food;
    console.log(this.inventory);
    this.loadData()
  },
  computed: {
    getTotalQty() {
      const total = Object.values(this.cart).reduce((acc, item) => {
        return acc + item;
      }, 0);
      return total;
    },
  },
  methods: {
    removeItem(name) {
      delete this.cart[name];
    },
    someHandlerMethod(name,value){
       this.cart[name]=parseInt(value);
      
    },
    totalQty(){
      
      let products = Object.values(Array.of(this.allProductsInCart)[0])
      this.totalQtyNav = products.reduce((total, currentValue, currentIndex, arr )=>{
        console.log("currentValue", currentValue)
         return total + currentValue.quantity;
          
      },0)
      
    },
    addToCart(item, title2, index) {
      console.log("called")
      let { id, title, price, quantity, image } = item;
      let product = {
        id,
        name: title,
        price,
        priceFormat: "£" + price,
        quantity,
        attributes: {
          image,
          color: "red",
          size: "X",
        },
      };

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify(product);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("/cart", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          this.allProductsInCart=result.items;
          console.log(result.items);
          this.totalQty();
        })
        .catch((error) => console.log("error", error));
      
      if (!this.cart[title]) this.cart[title] = 0;
      this.cart[title] += this.inventory[index].quantity;
      this.inventory[index].quantity = 0;
      console.log(this.cart);
    },
    loadData() {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch("/cart", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          this.allProductsInCart=result;
          console.log(result);
          this.totalQty();
        })
        .catch((error) => console.log("error", error));
    },
    toggleSideBar() {
      this.showSidebar = !this.showSidebar;
    },
  },
};
</script>

<style></style>
