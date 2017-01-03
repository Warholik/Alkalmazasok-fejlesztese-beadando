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
        const dorms = yield Dormitory
            .query()
            .with('applicants')
            .fetch()

        console.log("-------------------------------------------------------------------------")
        console.log(dorms.toJSON())
        console.log("-------------------------------------------------------------------------")
        //console.log(applicantstomb)
        console.log("-------------------------------------------------------------------------")

        for (const user of users) {
            //yield user.related('applications').load()
            const applications = yield user.applications().fetch()
            const applicationIds = applications.toJSON().map(application => application.id)
            console.log("Az " + user.id + " user ide jelentkezett: " + applicationIds)
        }
        var jelentkezok = []
        var jelentkezesek = new Set();

        var myMap = new Map();

        for (const dorm of dorms) {
            console.log("Valami:::: " + dorm.applicants.user_id)
            const applications = yield dorm.applicants().fetch()
            const applicatIds = applications.toJSON().map(applicant => applicant.id)
            console.log("A " + dorm.id + " koliba jelentkezett: " + applicatIds)
            jelentkezok.push(applicatIds);

            var dormid = dorm.id;
            for (var i = 0; i < applicatIds.length; i++) {
                var o = {dormid: applicatIds[i] }
                jelentkezesek.add(o);
                jelentkezesek.add(dormid);
                myMap.set(dormid, applicatIds[i]);
                //jelentkezesek.add({ dormid: applicatIds[i] });
            }
        }
        console.log("-------------------------------------------------------------------------")
        console.log(jelentkezesek)
        console.log("-------------------------------------------------------------------------")
        console.log(myMap)


        yield res.sendView('applications.njk', {
            users: users.toJSON(),
            dorms: dorms.toJSON(),
            jelentkezok,
            myMap
        })
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
