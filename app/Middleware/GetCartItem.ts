import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GetCartItem {
  public async handle({}: HttpContextContract, next: () => Promise<void>) {
   await next()
  }
  getContent(session) {
    let items = session.get('cart.items');
    //console.log(items)
    return Object.entries(items)
  }
}
