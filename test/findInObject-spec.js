import assert from 'assert';
import { nothing, findInObject } from '../lib/findInObject';

describe("Find in Object", () => {
  let ob = { pathA: { pathA2: 3 }};

  it("should match a string against an object and return value if found", () => {
    let three = findInObject(ob)("pathA.pathA2");
    assert.equal(three, 3);
  });

  it("should return <nothing> if path is not found", () => {
    let not = findInObject(ob)("pathA.pathB");
    assert.equal(not, nothing);
  });

  it("should return <nothing> if object is empty", () => {
    let not = findInObject({})("pathA.pathB");
    assert.equal(not, nothing);
  });

  it("should return <nothing> if path is empty", () => {
    let not = findInObject(ob)("");
    assert.equal(not, nothing);
  });
});
