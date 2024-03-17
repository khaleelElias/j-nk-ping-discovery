const express = require('express')

module.exports = function() {


    const router = express.Router()

    router.get("/contact", function(request, response) {
        response.render("contact.hbs")
    })

    return router
}