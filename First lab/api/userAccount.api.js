const { Router } = require('express');
const { UserAccount } = require('../models/userAccount');
const { v4: uuidv4 } = require('uuid');

const router = Router();

router.post("/users/registration", async (req, res) => {
 const { login, password } = req.body;
 try {
  const user = new UserAccount({ login, password });
  const doc = await user.save();
  return res.status(200).send(doc);
 } catch (err) {
  console.error(err);
  res.status(400).send({ message: err.toString() });
 }
});

router.get("/users/login", async (req, res) => {
 const { login, password } = req.query;
 if (!login) {
  return res.status(400).send({ message: 'Parameter login is required' });
 }
 if (!password) {
  return res.status(400).send({ message: 'Parameter password is required' });
 }

 const user = await UserAccount.findOne({ login, password });
 if (!user) {
  return res.status(400).send({ message: 'User with such login and password was not found' });
 }

 const token = uuidv4();

 await UserAccount.findOneAndUpdate(
  { login, password },
  {
   $push: { tokens: token },
   $set: { lastLoginAt: new Date() }
  }
 );

 return res.send({ token });
});

module.exports = { router };