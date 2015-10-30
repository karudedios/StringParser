import assert from 'assert';
import { nothing } from '../lib/findInObject';
import { compose, id } from 'functional-programming-utilities';
import { nextArgument, validateHex, stringParser } from '../src/StringParser';

describe("String Parser", () => {
  describe("Utilities - nextArgument", () => {
    it("should work even if no arguments are provide", () => {
      let returnSecond = compose(nextArgument, id);
      assert.equal(returnSecond(), undefined, "Should have returned the second argument");
    });

    it("should skip an argument and return the next one", () => {
      let returnSecond = compose(nextArgument, id);
      assert.equal(returnSecond(1, 2), 2, "Should have returned the second argument");
    });
  });

  describe("Utilities - validateHex", () => {
    it("should return provided string for a valid HexString", () => {
      let str = '00abcdef';
      assert.equal(str, validateHex(str), "Should return provided string when valid HexString");
    });

    it("should return nothing for a invalid HexString", () => {
      let str = '00abcdeg';
      assert.equal(nothing, validateHex(str), "Should return nothing when invalid HexString");
    });
  });

  describe("Parser", () => {
    const template = "This is a string with {{ ab49fd20.key_1 }}, including {{ 9822df87.another_key }} and also {{ ab49fd20.key_2 }}.";
    const feedTemplateWith = stringParser(template);

    it("should yield nothing for falsey templates", () => {
      let r1 = stringParser("")();
      let r2 = stringParser(null)();
      let r3 = stringParser(undefined)();

      assert.equal(r1, r2, `${r1} should be equal to ${r2}`);
      assert.equal(r2, r3, `${r2} should be equal to ${r3}`);
    });

    it("should replace matched object in template", () => {
      let seedB = {
        'ab49fd20': {
          key_1: 'once again, some data',
          key_2: 'something new'
        },
        '9822df87': {
          another_key: 'once again, big data'
        }
      };

      let r = feedTemplateWith(seedB);
      let expected = `This is a string with ${seedB['ab49fd20'].key_1}, including ${seedB['9822df87'].another_key} and also ${seedB['ab49fd20'].key_2}.`;

      assert.equal(expected, r, "Should yield same string");
    });

    it("should replace unmatched object with <nothing>", () => {
      let seedA = {
        'ab49fd20': {
          key_1: 'some data'
        },
        '9822df87': {
          another_key: 'big data',
          yet_another_key: 'small data'
        }
      };

      let r = feedTemplateWith(seedA);
      let expected = `This is a string with ${seedA['ab49fd20'].key_1}, including ${seedA['9822df87'].another_key} and also ${nothing}.`;

      assert.equal(expected, r, "Should yield same string");
    });

    it("should replace nothing if no match", () => {
      let r = feedTemplateWith({});
      let expected = `This is a string with ${nothing}, including ${nothing} and also ${nothing}.`;

      assert.equal(expected, r, "Should yield same string");
    });
  });
});
