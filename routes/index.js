import express from "express";
import survaiders from "../models";

const router = express.Router();

/* GET ALL USERS */
router.get("/", (req, res, next) => {
  survaiders.find((err, peopleDetails) => {
    if (err) return next(err);
    res.json(peopleDetails);
  });
});

/* GET SINGLE USER BY ID */
router.get("/:id", (req, res, next) => {
  console.log(req.params);
  survaiders.findById(req.params.id, (err, peopleDetails) => {
    if (err) return next(err);
    res.json(peopleDetails);
  });
});

/* SAVE USER */
router.post("/", (req, res, next) => {
  survaiders.create(req.body, (err, peopleDetails) => {
    if (err) return next(err);
    res.json(peopleDetails);
  });
});

/* UPDATE USER */
router.put("/:id", (req, res, next) => {
  survaiders.findByIdAndUpdate(req.params.id, req.body, (err, peopleDetails) => {
    if (err) return next(err);
    res.json(peopleDetails);
  });
});

/* DELETE USER */
router.delete("/:id", (req, res, next) => {
  survaiders.findByIdAndRemove(req.params.id, req.body, (err, peopleDetails) => {
    if (err) return next(err);
    res.json(peopleDetails);
  });
});

module.exports = router;
