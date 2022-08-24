import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CartSessionsController {
    public async add({ session }: HttpContextContract) {
        console.log(session.get('cart'))
         return session.get('cart');
    }
    public async getCartItems({session}:HttpContextContract){
       return session.get('cart.items');
    }
    public async removeCartItem({session}){
        return session.get(`cart.items`)
    }
    public async UpdateCartItem(){
        return "Item Updated From cart"
    }
    public async ClearCart(){
        return "All Items Removed From cart"
    }
    public async CartInfo(){

    }


}
