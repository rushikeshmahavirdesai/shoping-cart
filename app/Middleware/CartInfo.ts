import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CartConfig from 'Config/cart'


export default class CartInfo {
  public async handle({ response, session }: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    let cartinfo = {
      shiping: this.getShiping(session),
      getSubtotal: this.getSubtotal(session),
      getVat: this.getVat(session),
      vatnumber: this.getVatNumber(session),
      total: this.getTotal(session),
      totalNumber: this.getTotalNumber(session),
      totalQty: this.getTotalQuantity(session),
    }
    response.send(cartinfo)
    await next()
  }



  getContent(session) {
    let items = session.get('cart.items');
    
    return Object.entries(items)
  }
  getTotalQuantity(session) {
    const items = this.getContent(session);
   
  
    return Object.keys(items).reduce((previous, key) => {
      if (typeof items[key].quantity !== 'undefined') {
        return previous + parseInt(items[key].quantity);
      }
      return previous + 0;
    }, 0);
  }
  
  getSubtotalNumber(session) {
    const items = this.getContent(session);
    const subTotal = Object.keys(items).reduce((previous, key) => {
      if (typeof items[key].quantity !== 'undefined') {
        return previous + parseInt(items[key].quantity) * parseFloat(items[key].price);
      }
      return previous + 0;
    }, 0);
    if (subTotal === 0) {
      return 0;
    }
   
    return subTotal;
  }
 
  getSubtotal(session) {
    return this.formatCurrency(this.getSubtotalNumber(session));
  }
  formatCurrency(number) {
    return new Intl.NumberFormat(CartConfig.format.locale, CartConfig.format.options).format(number);
  }
  getVatNumber(session) {
    const items = this.getContent(session);
    const subTotal = Object.keys(items).reduce((previous, key) => {
      if (typeof items[key].quantity !== 'undefined') {
        return previous + parseInt(items[key].quantity) * parseFloat(items[key].price);
      }
      return previous + 0;
    }, 0);
    if (subTotal === 0) {
      return 0;
    }
    // if (parseInt(CartConfig.vat as string) > 0) {
    //     return (subTotal * (parseInt(CartConfig.vat) / 100));
    // }
    return 0;
  }
  /**
   * Get VAT as formated currency
   * @returns
   */
  getVat(session) {
    return this.formatCurrency(this.getVatNumber(session));
  }
  
  setShippingAmmount(session, shipping) {
    session.put('cart.shippingAmount', shipping);
  }

  getShipingNumber(session) {
    return session.get('cart.shippingAmount');
  }

  getShiping(session) {
    return this.formatCurrency(this.getShipingNumber(session));
  }
 
  getTotalNumber(session) {
    return this.getSubtotalNumber(session) + this.getVatNumber(session) + this.getShipingNumber(session);
  }
  
  getTotal(session) {
    return this.formatCurrency(this.getTotalNumber(session));
  }
}
