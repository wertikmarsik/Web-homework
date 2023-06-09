const { Router } = require("express");
const { Theaters } = require("../models/theaters");

const router = Router();

router.get("/theaters", async (req, res) => {
  const {
    theaterId,
    location_address_city,
    location_address_zipcode,
    location_geo_coordinates_0,
    location_geo_coordinates_1,
  } = req.query;

  const dbQuery = {};

  if (theaterId) {
    dbQuery.theaterId = theaterId;
  }

  if (location_address_city) {
    dbQuery["location.address.city"] = location_address_city;
  }

  if (location_geo_coordinates_0) {
    dbQuery["location.geo.coordinates.0"] = location_geo_coordinates_0;
  }

  if (location_geo_coordinates_1) {
    dbQuery["location.geo.coordinates.1"] = location_geo_coordinates_1;
  }

  if (location_address_zipcode) {
    dbQuery["location.address.zipcode"] = location_address_zipcode;
  }

  const docs = await Theaters.find(dbQuery);

  return res.status(200).send(docs);
});

module.exports = { router };
