const express = require('express')

module.exports = function() {


    const router = express.Router()

    router.get("/about", function(request, response) {
        response.render("about.hbs")
    })


    return router
}