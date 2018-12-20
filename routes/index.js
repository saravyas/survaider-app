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
  survaiders.findByIdAndUpdate(
    req.params.id,
    req.body,
    (err, peopleDetails) => {
      if (err) return next(err);
      res.json(peopleDetails);
    },
  );
});

/* DELETE USER */
router.delete("/:id", (req, res, next) => {
  survaiders.findByIdAndRemove(
    req.params.id,
    req.body,
    (err, peopleDetails) => {
      if (err) return next(err);
      res.json(peopleDetails);
    },
  );
});

const aggergation = groupByValue => {
  router.get(`/chart/${groupByValue}`, (req, res, next) => {
    const agg = [
      {
        $group: {
          _id: `$${groupByValue}`,
          count: { $sum: 1 },
        },
      },
    ];
    survaiders.aggregate(agg, (err, peopleChartDetails) => {
      if (err) return next(err);
      res.json(peopleChartDetails);
    });
  });
};

aggergation("relationship");
aggergation("sex");

module.exports = router;
