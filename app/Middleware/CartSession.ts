import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CartConfig from 'Config/cart';

export default class CartSession {
  public async handle({ request, session}: HttpContextContract, next: () => Promise<void>) {
    // const existingCart = session.get('cart')
   
    // session.put("cart", existingCart + request.all())
    this.add(request, session)
    await next()
  }
  initCart(session) {
    session.put('cart', {
        shippingAmount: 0,
        vatAmount: 0,
        subTotal: 0,
        totalAmount: 0,
        totalItems: 0,
        items: {},
    });
}
  add(request, session) {
   
    if(!session.get('cart')){
      this.initCart(session);
    }

    let data = request.all();
    let rowId = this.getRowId(data.attributes)
     
     if (this.has(session,rowId)) {
          this.update(session,rowId, this.buildItem(data));
     }
     else {
       session.put(`cart.items.${rowId}`, this.buildItem(data));
        
   }
}
has(session,rowId) {
  const cartItems = session.get('cart.items', {});
  const item = Object.keys(cartItems).find((key) => key === rowId);
  return typeof item !== 'undefined';
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

formatCurrency(number) {
  return new Intl.NumberFormat(CartConfig.format.locale, CartConfig.format.options).format(number);
}
getRowId(attributes) {
  return btoa(JSON.stringify(attributes));
}
  buildItem(data) {
    return {
        id: data.id,
        price: data.price,
        priceFormat: data.price,
        name: data.name,
        quantity: data.quantity,
        attributes: data.attributes,
    }
  }
}
