const { Router } = require("express");
const { Users } = require("../models/users");

const router = Router();

router.get("/users", async (req, res) => {
  const { name, email } = req.query;

  const dbQuery = {};

  if (name) {
    dbQuery.name = {$eq:name};
  }

  if (email) {
    dbQuery.email = {$eq:email};
  }

  const docs = await Users.find(dbQuery);

  return res.status(200).send(docs);
});

module.exports = { router };
