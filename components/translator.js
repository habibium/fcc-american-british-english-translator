const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");

class Translator {
  /**
   * @type {['american-to-british', 'british-to-american']}
   */
  static LOCALES = ["american-to-british", "british-to-american"];

  toBritish(text) {
    // TODO
    return text;
  }

  toAmerican(text) {
    // TODO
    return text;
  }

  toBritishHighlighted(text) {
    // TODO
    return text;
  }

  toAmericanHighlighted(text) {
    // TODO
    return text;
  }

  translate(text, locale) {
    // TODO
    return text;
  }
}

module.exports = Translator;
