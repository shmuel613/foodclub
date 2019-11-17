const express = require("express");
const fetch = require("node-fetch");
let router = express.Router();
const bodyParser = require("body-parser");
const Utilities = require("../../utilities/utilities");

/**** GET THE DELIVERY CUSTOMERS OF A SPECIFIC RESTAURANT ****/
router.get("/api/status/:service", async (req, res) => {
  if (Utilities.servicePorts.hasOwnProperty(req.params.service)) {
    const service = req.params.service;
    try {
      const result = await fetch(
        `http://app-${service}:${Utilities.servicePorts[service]}/`
      );
      const resultJSON = await result.json();
      res.json(resultJSON);
    } catch (err) {
      res.status(500);
      res.json({ status: JSON.stringify(err) });
    }
  } else {
    res.json({
      status: `${service} status not found`
    });
  }
});

router.get("/api/:service/:id", async (req, res) => {
  const service = req.params.service;
  const id = req.params.id;
  if (Utilities.servicePorts.hasOwnProperty(service)) {
    try {
      const result = await fetch(
        `http://app-${service}:${Utilities.servicePorts[service]}/${service}/${id}`
      );
      const resultJSON = await result.json();
      res.json(resultJSON);
    } catch (err) {
      res.status(500);
      res.json(err);
    }
  } else {
    res.json({
      status: `${service} service not found`
    });
  }
});

router.get("/api/:service", async (req, res) => {
  const service = req.params.service;
  if (Utilities.servicePorts.hasOwnProperty(service)) {
    try {
      const result = await fetch(
        `http://app-${service}:${Utilities.servicePorts[service]}/${service}`
      );
      const resultJSON = await result.json();
      res.json(resultJSON);
    } catch (err) {
      res.status(500);
      res.json(err);
    }
  } else {
    res.json({
      status: `${service} service not found`
    });
  }
});

module.exports = router;
