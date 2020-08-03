const express = require("express");
const fs = require("fs");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

const supportedLangs = ["en", "es", "fr", "de"];

//redirect generic queries to English results
router.get("/", (req, res) => {
  return res.redirect('/en')
});
router.get("/:id(\\d+)", (req, res) => {
  const id = parseInt(req.params.id);
  return res.redirect(`/en/${id}`);
});


router.get("/:lang", asyncHandler(async(req, res) => {
    const lang = req.params.lang;
    try{
      if(supportedLangs.indexOf(lang)<0) throw new Error("Language not supported")
      const questions = require(`../questions/${lang}/${lang}.json`);
      res.send({ questions });
    }catch(err){
      console.error(err);
      res
        .status(404)
        .send({
          error: `Language identifier '${lang}' is not supported.`,
          status: 404,
        });
    }
    
}));
router.get("/:lang/:id(\\d+)", asyncHandler(async(req, res) => {
    const lang = req.params.lang;
    const id = parseInt(req.params.id);
    try{
      if (supportedLangs.indexOf(lang) < 0)
        return res.status(404).send({
          error: `Language identifier '${lang}' is not supported.`,
          status: 404,
        });
      const questions = require(`../questions/${lang}/${lang}.json`);
      const question = questions[id - 1];
      if (question) return res.send({ question });
      else{
        return res.status(404).send({
          error: `The requested resource ID ${id} could not be found.`,
          status: 404,
        });
      }
      
    }catch(err){
      console.error(err);
      res.status(500).send({ error: "An unexpected server error occurred.", status: 500 });
    }
    
}));

module.exports = router;