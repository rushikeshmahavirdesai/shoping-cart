/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'
Route.post('/', async ({ session, request }) => {
  console.log(request.body())
  session.put("cart",request.body())
  
  return session.get('cart');
})




Route
  .post('/cart', 'CartSessionsController.add')
  .middleware('cart') 
Route
  .delete('/cart/:rowid', 'CartSessionsController.removeCartItem')
  .middleware('RemoveCartItem')   

Route
   .put("/cart/:rowid",'CartSessionsController.UpdateCartItem')
   .middleware("UpdateCartItem")
Route
   .delete("/cart",'CartSessionsController.ClearCart')
   .middleware("ClearCart")
Route
.get("/cart/cartinfo","CartSessionsController.CartInfo")
.middleware("CartInfo")   
Route.get("/cart",'CartSessionsController.getCartItems')

Route.any('*', async ({ view }) => {
  return view.render('index')
})


