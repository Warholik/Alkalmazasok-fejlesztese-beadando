'use strict'

const Lucid = use('Lucid')

class Leader extends Lucid {
    managedDormitories () {
        return this.hasMany('App/Model/Dormitory')
    }
}

module.exports = Leader
