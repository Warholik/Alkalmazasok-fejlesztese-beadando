'use strict'

const Dormitory = use('App/Model/Dormitory')
const User = use('App/Model/User')

class ApplicationController {
    * apply(req, res) {
        const dormId = req.param('id')
        const dorm = yield Dormitory.find(dormId)

        yield dorm.applicants().attach([req.currentUser.id])
        res.redirect('/')
    }


    * list(req, res) {

        // a jelenlegi felhasználó melyik kollégiumokba jelentkezett
       // const applications = yield req.currentUser.applications().fetch() // <- Array<Dormitory>
       // const applicationIds = applications.toJSON().map(application => application.id) // <- Array<Number>

       // yield res.sendView('applications', {
       //     dorms: dorms.toJSON(),
       //     applicationIds
       // })

        const users = yield User.all()

        for (const user of users) {
           const applications =  yield user.applications().fetch()
           const applicationIds = applications.toJSON().map(application => application.id)
            console.log(applicationIds)
        }
        //console.log("Az adattagok: "+object.keys(users))
        yield res.sendView('applications.njk', { 
            users: users.toJSON() })
    }

    * cancel(req, res) {
        const dormId = req.param('id')
        const dorm = yield Dormitory.find(dormId)

        yield dorm.applicants().detach([req.currentUser.id])
        res.redirect('/')
    }

    * ajaxApply(req, res) {
        const dormId = req.param('id')
        const dorm = yield Dormitory.find(dormId)

        yield dorm.applicants().attach([req.currentUser.id])
        res.send({ success: true })
    }

    * ajaxCancel(req, res) {
        const dormId = req.param('id')
        const dorm = yield Dormitory.find(dormId)

        yield dorm.applicants().detach([req.currentUser.id])
        res.send({ success: true })
    }
}

module.exports = ApplicationController
