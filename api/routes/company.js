var express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

var router = express.Router();

const verif = "https://www.verif.com/societe/";

router.get("/:companyName/:companySiren", function (req, res, next) {
  let company_object = {};

  try {
    axios(
      verif + req.params.companyName + "-" + req.params.companySiren + "/"
    ).then((response) => {
      const $ = cheerio.load(response.data);

      $("td").each((i, data) => {
        if ($(data).text().trim().includes("Raison sociale")) {
          company_object.name = $(data).next().text().trim();
        } else if ($(data).text().trim().includes("Téléphone")) {
          company_object.phone = $(data).next().text().trim();
        } else if ($(data).text().trim().includes("Date de création")) {
          company_object.creation_date = $(data).next().text().trim();
        } else if ($(data).text().trim().includes("Capital Social")) {
          company_object.share = $(data).next().text().trim();
        } else if ($(data).text().trim().includes("SIREN")) {
          company_object.siren = $(data).next().text().trim();
        }
      });

      if (Object.keys(company_object).length === 0) {
        res.send({ message: "Could not find the company." });
      } else {
        res.send(company_object);
      }
    });
  } catch (error) {
    console.log(error, error.message);
    res.status(404).send({ message: "There was a server error." });
  }
});

module.exports = router;
