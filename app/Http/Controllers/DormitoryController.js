'use strict'

const Dormitory = use('App/Model/Dormitory')
const Leader = use('App/Model/Leader')

class DormitoryController {
    * list(req, res) {
        // kollégiumok lekérdezése a vezetőkkel együtt
        const dorms = yield Dormitory
            .query()
            .with('leader')
            .fetch()
        if (req.currentUser === null) {
            console.log("az user null")

            yield res.sendView('main', {
                dorms: dorms.toJSON()
            })
        } else {
            // a jelenlegi felhasználó melyik kollégiumokba jelentkezett
            const applications = yield req.currentUser.applications().fetch() // <- Array<Dormitory>
           
            const applicationIds = applications.toJSON().map(application => application.id) // <- Array<Number>
            yield res.sendView('main', {
                dorms: dorms.toJSON(),
                applicationIds
            })
            
        }



    }

    * registration(request, response) {
        const isLoggedIn = yield request.auth.check()
        if (isLoggedIn) {

            const leader = yield Leader
                .query()
                .fetch()
                console.log(leader.toJSON())
            yield response.sendView('dormitory', {
                leader: leader.toJSON()
            })
        }

    }

    * doRegister(request, response) {
        const registerData = request.except('_csrf');
        const dormitory = new Dormitory()

        dormitory.name = registerData.name;
        //dormitory.leiras = registerData.leiras;
        dormitory.leader_id = registerData.vezeto;

        yield dormitory.save()

        response.redirect('/')
    }

        * doDelete (req, res) {
        const dormitory = yield Dormitory.find(req.param('id'))

        yield dormitory.delete()

        res.redirect('/')
    }

    * ajaxDelete (req, res) {
        const dormitory = yield Dormitory.find(req.param('id'))

        yield dormitory.delete()

        res.ok({
            success: true
        })
    }

    * edit (req, res) {
        const dormitory = yield Dormitory.find(req.param('id'))
        const leader = yield Leader.all()

        yield res.sendView('dormedit', {
            dormitory: dormitory.toJSON(),
            leader: leader.toJSON()
        })
    }

    * doEdit (req, res) {
        const dormitory = yield Dormitory.find(req.param('id'))

        if (dormitory === null) {
            res.notFound('Bocsika, nincs ilyen koli!')
            return
        }

        // 1. input
        const registerData = req.all()


        //dormitory.leiras = registerData.leiras;
        dormitory.leader_id = registerData.vezeto;

        yield dormitory.save()

        res.redirect('/')
    }




}

module.exports = DormitoryController
