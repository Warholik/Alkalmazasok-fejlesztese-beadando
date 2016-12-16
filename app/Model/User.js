'use strict'

const Lucid = use('Lucid')

class User extends Lucid {

  apiTokens () {
    return this.hasMany('App/Model/Token')
  }

  applications () {
    return this.belongsToMany('App/Model/Dormitory')
  }

}

module.exports = User
