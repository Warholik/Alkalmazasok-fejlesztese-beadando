'use strict'

const Schema = use('Schema')

class DormitoriesTableSchema extends Schema {

  up () {
    this.create('dormitories', (table) => {
      table.increments()
      table.string('name', 50).notNullable().unique()
      table.string('description', 5000).notNullable()
      table.integer('leader_id').unsigned().references('id').inTable('dormitories')
      table.timestamps()
    })
  }

  down () {
    this.drop('dormitories')
  }

}

module.exports = DormitoriesTableSchema
