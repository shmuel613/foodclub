const express = require("express");
const fetch = require("node-fetch");
let router = express.Router();
const bodyParser = require("body-parser");
const Utilities = require("../../utilities/utilities");

router.use(bodyParser.text());

async function commonHandler(service, url, res) {
  if (Utilities.servicePorts.hasOwnProperty(service)) {
    try {
      const result = await fetch(url);
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
}

/**** GET THE DELIVERY CUSTOMERS OF A SPECIFIC RESTAURANT ****/
router.get("/api/status/:service", async (req, res) => {
  const service = req.params.service;
  const url = `http://app-${service}:${Utilities.servicePorts[service]}/`;
  commonHandler(service, url, res);
});

router.get("/api/:service/:id", async (req, res) => {
  const service = req.params.service;
  const id = req.params.id;
  const url = `http://app-${service}:${Utilities.servicePorts[service]}/${service}/${id}`;
  commonHandler(service, url, res);
});

router.get("/api/:service", async (req, res) => {
  const service = req.params.service;
  const url = `http://app-${service}:${Utilities.servicePorts[service]}/${service}`;
  commonHandler(service, url, res);
});

router.post("/api/:service", async (req, res) => {
  const service = req.params.service;
  if (Utilities.servicePorts.hasOwnProperty(service)) {
    try {
      const result = await fetch(
        `http://app-${service}:${Utilities.servicePorts[service]}/${service}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: req.body
        }
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

router.post("/api/:service/:id", async (req, res) => {
  const service = req.params.service;
  const id = req.params.id;
  if (Utilities.servicePorts.hasOwnProperty(service)) {
    try {
      const result = await fetch(
        `http://app-${service}:${Utilities.servicePorts[service]}/${service}/${id}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: req.body
        }
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
