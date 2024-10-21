"use strict";

const Translator = require("../components/translator.js");

module.exports = function (app) {
  const translator = new Translator();

  app.route("/api/translate").post((req, res) => {
    const { text, locale } = req.body;

    if (!text || !locale)
      return res.json({
        error: "Required field(s) missing",
      });

    if (!Translator.LOCALES.includes(locale))
      return res.json({
        error: "Invalid value for locale field",
      });

    return res.json({
      text: req.body.text,
      translation: translator.translate(req.body.text, req.body.locale),
    });
  });
};
