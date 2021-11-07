import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Temoignages extends BaseSchema {
  protected tableName = 'temoignages'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('message').notNullable()
      table.string('photo').defaultTo('/uploads/images/default/temoignage_default.png')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
