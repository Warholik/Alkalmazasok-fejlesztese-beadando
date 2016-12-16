'use strict'

const Schema = use('Schema')

class LeadersTableSchema extends Schema {

  up () {
    this.create('leaders', (table) => {
      table.increments()
      table.string('name', 256).notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('leaders')
  }

}

module.exports = LeadersTableSchema
