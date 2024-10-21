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
    const americanOnlyRegex = new RegExp(
      Object.keys(americanOnly)
        .sort((a, b) => b.length - a.length)
        .join("|"),
      "gi"
    );
    const americanToBritishSpellingRegex = new RegExp(
      Object.keys(americanToBritishSpelling)
        .sort((a, b) => b.length - a.length)
        .join("|"),
      "gi"
    );
    const americanToBritishTitlesRegex = new RegExp(
      Object.keys(americanToBritishTitles)
        .sort((a, b) => b.length - a.length)
        .join("|"),
      "gi"
    );

    text = text.replace(
      americanToBritishSpellingRegex,
      (m) => americanToBritishSpelling[m.toLowerCase()]
    );

    text = text.replace(americanToBritishTitlesRegex, (m) => {
      const british = americanToBritishTitles[m.toLowerCase()];
      return british[0].toUpperCase() + british.slice(1);
    });

    text = text.replace(
      americanOnlyRegex,
      (m) => americanOnly[m.toLowerCase()]
    );

    text = text.replace(/([0-9]{1,2}):([0-9]{1,2})/g, "$1.$2");
    return text;
  }

  toAmerican(text) {
    // TODO
    return text;
  }

  highlight(before, after) {
    before = before.split(" ");
    after = after.split(" ");
    const diff = after.map((word, i) =>
      word !== before[i] ? `<span class="highlight">${word}</span>` : word
    );
    return diff.join(" ");
  }

  toBritishHighlighted(text) {
    return this.highlight(text, this.toBritish(text));
  }

  toAmericanHighlighted(text) {
    // TODO
    return text;
  }

  translate(text, locale) {
    let result;

    switch (locale) {
      case Translator.LOCALES[0]:
        result = this.toBritishHighlighted(text);
        return result !== text ? result : "Everything looks good to me!";
      case Translator.LOCALES[1]:
        result = this.toBritishHighlighted(text);
        return result !== text ? result : "Everything looks good to me!";
      default:
        return "Invalid value for locale field";
    }
  }
}

module.exports = Translator;
