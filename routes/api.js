const express = require("express");
const fs = require("fs");
const asyncHandler = require("../utils/asyncHandler");
const questionsEN = require("../questions/en-EN/en.json");
console.log(questionsEN);

const router = express.Router();


//redirect generic queries to English results
router.get("/", (req, res) => {
  return res.redirect('/en')
});
router.get("/:id(\\d+)", (req, res) => {
  const id = parseInt(req.params.id);
  return res.redirect(`/en/${id}`);
});


router.get("/en", asyncHandler(async(req, res) => {
    
    res.send({questions})
}));
router.get("/en/:id(\\d+)", asyncHandler(async(req, res) => {
    const id = parseInt(req.params.id);
    
    const question = questionsEN[id-1];
    if(question) res.send({question});
    else res
           .status(404)
           .send({
             error: `The requested resource ID ${id} could not be found.`,
             status: 404
           });
}));

module.exports = router;