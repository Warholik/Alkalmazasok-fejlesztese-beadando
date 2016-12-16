'use strict'

const Dormitory = use('App/Model/Dormitory')

class ApplicationController {
    * apply (req, res) {
        const dormId = req.param('id')
        const dorm = yield Dormitory.find(dormId)

        yield dorm.applicants().attach([req.currentUser.id])
        res.redirect('/')
    }

    * cancel (req, res) {
        const dormId = req.param('id')
        const dorm = yield Dormitory.find(dormId)

        yield dorm.applicants().detach([req.currentUser.id])
        res.redirect('/')
    }

    * ajaxApply (req, res) {
        const dormId = req.param('id')
        const dorm = yield Dormitory.find(dormId)

        yield dorm.applicants().attach([req.currentUser.id])
        res.send({ success: true })
    }

    * ajaxCancel (req, res) {
        const dormId = req.param('id')
        const dorm = yield Dormitory.find(dormId)

        yield dorm.applicants().detach([req.currentUser.id])
        res.send({ success: true })
    }
}

module.exports = ApplicationController
