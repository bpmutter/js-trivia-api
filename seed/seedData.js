const LanguageModels = require('../models/LanguageModels')
const mongoose = require('mongoose')
const supportedLanguages = require('../supportedLanguages')


mongoose.connect(process.env.REMOTE_DB_URL, {
    useUnifiedTopology: true
})


supportedLanguages.forEach((lang, i) => {
    const questions = require(`../questions/${lang}/${lang}.json`)

    LanguageModels[i].collection.insertMany(questions, (err, result) => {
        if (err) return console.error(err)
        else console.log(result)
    })


})
