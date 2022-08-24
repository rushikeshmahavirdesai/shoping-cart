import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CartConfig from 'Config/cart';

export default class UpdateCartItem {
  public async handle({session, request, params}: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    let data = request.all();
    
    this.update(session,params.rowid,data)
    
    await next()
  }
  formatCurrency(number) {
    return new Intl.NumberFormat(CartConfig.format.locale, CartConfig.format.options).format(number);
}
  update(session, rowId, data) {
    let currItem = Object.assign({}, session.get(`cart.items.${rowId}`, {}));
    session.forget(`cart.items.${rowId}`);
    for (let [key, value] of Object.entries(data)) {
        //console.log(key, value)
        //console.log('item - ', item[key])
        if (currItem.hasOwnProperty(key)) {
            if (key === 'quantity') {
                currItem[key] = parseInt(value as string);
            }
            else if (key === 'price') {
                currItem[key] = parseInt(value as string);
                currItem['priceFormat'] = this.formatCurrency(value);
            }
            else {
                currItem[key] = value;
            }
        }
    }
    session.put(`cart.items.${rowId}`, currItem);
}


getRowId(attributes) {
  return attributes.image + attributes.color + attributes.size;
}
}
