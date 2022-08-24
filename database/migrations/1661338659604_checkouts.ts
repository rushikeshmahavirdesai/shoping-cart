import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'checkouts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('username',50),
      table.string('address',50),
      table.bigInteger("totalAmount"),
      table.bigInteger("totalProducts")

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
