const { Router } = require("express");
const { Sessions } = require("../models/sessions");

const router = Router();

router.get("/sessions", async (req, res) => {
  const { user_id } = req.query;

  const dbQuery = {};

  if (user_id) {
    dbQuery.user_id = { $eq: user_id };
  }

  const docs = await Sessions.find(dbQuery);

  return res.status(200).send(docs);
});

module.exports = { router };
