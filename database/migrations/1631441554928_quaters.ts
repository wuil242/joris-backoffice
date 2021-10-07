import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Quaters extends BaseSchema {
  protected tableName = 'quaters'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 255).notNullable()
      table
        .integer('arrondissement_id')
        .unsigned()
        .references('arrondissements.id')
        .notNullable()
        .onDelete('CASCADE')
      table.integer('city_id').unsigned().references('cities.id').notNullable().onDelete('CASCADE')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
