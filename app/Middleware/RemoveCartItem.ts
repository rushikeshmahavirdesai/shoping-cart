import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RemoveCartItem {
  public async handle({ session, params }: HttpContextContract, next: () => Promise<void>) {
    console.log(session.get(`cart.items.${params.rowid}`))
    this.removeByRowId(session, params.rowid);
    console.log(session.get(`cart.items.${params.rowid}`))
    await next()
  }
  removeByRowId(session,rowId) {
    session.forget(`cart.items.${rowId}`);
  }
}
