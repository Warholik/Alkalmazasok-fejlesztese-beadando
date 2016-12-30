'use strict'


const Leader = use('App/Model/Leader')

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
}





module.exports = LeaderController
