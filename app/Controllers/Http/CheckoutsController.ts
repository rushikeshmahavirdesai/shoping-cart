import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

export default class  CheckoutsController{
    public async checout({ request }: HttpContextContract) {
               let data = request.all()
                
                await Database
                    .table('checkouts')
                    .insert(data)
                return Database.from('checkouts').select('*')
    }
    


}
