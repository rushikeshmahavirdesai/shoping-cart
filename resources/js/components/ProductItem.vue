


<script>
export default {
    name:"ProductItem",
    props:['item'],
    // props: {
    // product: ,
    // },
    data(){
              return {
                
              }
    }
}
</script>


<template>
    <div class="card-title">
              {{item.name}}
            </div>
            <div class="card-body">
              <i class="icofont-10x icofont-carrot"></i>
              <form>
                <div class="row">
                  <div class="cell">
                    <label>Type:</label>
                  </div>
                  <div class="cell">
                    <em> {{item.type}}</em>
                  </div>
                </div>
                <div class="row">
                  <div class="cell">
                    <label>Price:</label>
                  </div>
                  <div class="cell">
                    {{item.price.USD}}
                  </div>
                </div>
                <div class="row">
                  <div class="cell">
                    <label>Quantity:</label>
                  </div>
                  <div class="cell">
                    <input type="number" v-model.number="product.quantity">
                  </div>
                </div>
              </form>
            </div>
            <div class="card-footer">
              <button @click="addToCart(product.name, product.id - 1)" class="btn btn-light">
                Add to cart
              </button>
            </div>
</template>