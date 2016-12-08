'use strict'

const Schema = use('Schema')

class NeveloTableSchema extends Schema {

  up () {
    this.create('nevelo', (table) => {
      table.increments()
      table.string('nev',256).notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('nevelo')
  }

}

module.exports = NeveloTableSchema
