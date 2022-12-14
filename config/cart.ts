
import { CartConfig } from '@ioc:Adonis/Addons/Cart'

const CartConfig: CartConfig = {

  /*
  |--------------------------------------------------------------------------
  | VAT
  |--------------------------------------------------------------------------
  |
  | The Cart VAT Amount
  |
  */
  //CAR_VAT: Env.get('CAR_VAT', 20),
  vat: 20,
  /*
  |--------------------------------------------------------------------------
  | Number Format Locale and Options
  |--------------------------------------------------------------------------
  |
  |
  */
  format:{
    locale: 'en-GB',
    options: { style: 'currency', currency: 'GBP' },
  },

}

export default CartConfig
