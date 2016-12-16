'use strict'

const Lucid = use('Lucid')

class Dormitory extends Lucid {
    leader () {
        return this.belongsTo('App/Model/Leader')
    }

    applicants () {
        return this.belongsToMany('App/Model/User')
    }
}

module.exports = Dormitory
