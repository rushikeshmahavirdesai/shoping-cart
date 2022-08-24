import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ClearCart {
  public async handle({session}: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    session.forget(`cart`);
    await next()
  }
}
