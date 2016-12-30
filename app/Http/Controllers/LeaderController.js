'use strict'


const Leader = use('App/Model/Leader')
const Dormitory = use('App/Model/Dormitory')

class LeaderController {
    * registration(request, response) {
        const isLoggedIn = yield request.auth.check()
        if (isLoggedIn) {

        const leaders = yield Leader
            .query()
            .fetch()


            yield response.sendView('leader', {
                leaders: leaders.toJSON()
            })
        }

    }

    * doRegister(request, response) {
        const registerData = request.except('_csrf');
        const leader = new Leader()

        leader.name = registerData.name;
        //dormitory.leiras = registerData.leiras;

        yield leader.save()

        response.redirect('/')
    }

    
        * doDelete (req, res) {
        const leader = yield Leader.find(req.param('id'))
        const dormitories = yield Dormitory.all()
        for ( const dorm of dormitories){
            if(dorm.leader_id === leader.id){
                dorm.leader_id = null
                yield dorm.save()
            }
        }

        yield leader.delete()

        res.redirect('/leader')
    }

    * ajaxDelete (req, res) {
        const leader = yield Leader.find(req.param('id'))

        yield leader.delete()

        res.ok({
            success: true
        })
    }
}





module.exports = LeaderController
