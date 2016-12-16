'use strict'

const Dormitory = use('App/Model/Dormitory')

class DormitoryController {
    * list (req, res) {
        // kollégiumok lekérdezése a vezetőkkel együtt
        const dorms = yield Dormitory
            .query()
            .with('leader')
            .fetch()
        
        // a jelenlegi felhasználó melyik kollégiumokba jelentkezett
        const applications = yield req.currentUser.applications().fetch() // <- Array<Dormitory>
        const applicationIds = applications.toJSON().map(application => application.id) // <- Array<Number>

        yield res.sendView('main', {
            dorms: dorms.toJSON(),
            applicationIds
        })
    }
}

module.exports = DormitoryController
