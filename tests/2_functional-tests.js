const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server.js");
const Translator = require("../components/translator.js");

chai.use(chaiHttp);

suite("Functional Tests", () => {
  suite("POST /api/translate", () => {
    test("Translation with text and locale fields", (done) => {
      testTranslation({
        text: "Mangoes are my favorite fruit.",
        locale: "american-to-british",
        translation:
          'Mangoes are my <span class="highlight">favourite</span> fruit.',
        done,
      });
    });

    test("Translation with text and invalid locale field", (done) => {
      testTranslation({
        text: "Mangoes are my favorite fruit.",
        locale: "whtoiwhefbnwboewhfsna",
        translation:
          'Mangoes are my <span class="highlight">favourite</span> fruit.',
        done,
      });
    });

    test("Translation with missing text field", (done) => {
      testTranslation({
        locale: "american-to-british",
        done,
      });
    });

    test("Translation with missing locale field", (done) => {
      testTranslation({
        text: "Mangoes are my favorite fruit.",
        done,
      });
    });

    test("Translation with empty text", (done) => {
      testTranslation({
        text: "",
        locale: Translator.LOCALES[0],
        done,
      });
    });

    test("Translation with text that needs no translation", (done) => {
      testTranslation({
        text: "Mangoes are my favourite fruit.",
        locale: Translator.LOCALES[1],
        translation: "Everything looks good to me!",
        done,
      });
    });
  });
});

function testTranslation({ text, locale, translation, done }) {
  chai
    .request(server)
    .post("/api/translate")
    .send({
      text,
      locale,
    })
    .end((err, res) => {
      assert.equal(res.status, 200);

      if (!Translator.LOCALES.includes(locale)) {
        assert.property(res.body, "error");
        assert.equal(res.body.error, "Invalid value for locale field");
        done();
      }

      if (!text || !locale) {
        assert.property(res.body, "error");
        assert.equal(res.body.error, "Required field(s) missing");
        done();
      }

      assert.property(res.body, "text");
      assert.property(res.body, "translation");
      assert.equal(res.body.text, text);
      assert.equal(res.body.translation, translation);
      done();
    });
}
