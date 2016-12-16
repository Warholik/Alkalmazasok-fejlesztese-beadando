'use strict'

const Schema = use('Schema')

class DormitoryUserTableSchema extends Schema {

  up () {
    this.create('dormitory_user', (table) => {
      table.integer('dormitory_id').unsigned().references('id').inTable('dormitories')
      table.integer('user_id').unsigned().references('id').inTable('users')

      table.primary(['dormitory_id', 'user_id'])
    })
  }

  down () {
    this.drop('dormitory_user')
  }

}

module.exports = DormitoryUserTableSchema
