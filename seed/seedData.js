const LanguageModels = require('../models/LanguageModels')
const mongoose = require('mongoose')
const supportedLanguages = require('../supportedLanguages')
require("dotenv").config();
const remoteURl = "mongodb+srv://js-trivia:jstrivia1!@cluster0.m6q07.mongodb.net/jstrivia_app?retryWrites=true&w=majority";

mongoose.connect(remoteURl, {
    useUnifiedTopology: true
})


supportedLanguages.forEach((lang, i) => {
    const questions = require(`../questions/${lang}/${lang}.json`)
    LanguageModels[i].collection.remove({});
    LanguageModels[i].collection.insertMany(questions, (err, result) => {
        if (err) return console.error(err)
        else console.log(result)
    })


})
