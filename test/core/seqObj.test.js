"use strict";

suite("Parsimmon.seqObj", function() {
  test("does not accept duplicate keys", function() {
    assert.throws(function() {
      Parsimmon.seqObj(
        ["a", Parsimmon.of(1)],
        ["b", Parsimmon.of(2)],
        ["a", Parsimmon.of(3)]
      );
    });
  });

  test("requires at least one key", function() {
    assert.throws(function() {
      Parsimmon.seqObj();
    });
  });

  test("every key is present in the result object", function() {
    var parser = Parsimmon.seqObj(
      ["a", Parsimmon.of(1)],
      ["b", Parsimmon.of(2)],
      ["c", Parsimmon.of(3)]
    );
    var result = parser.tryParse("");
    assert.deepStrictEqual(result, {
      a: 1,
      b: 2,
      c: 3
    });
  });

  test("every parser is used", function() {
    var parser = Parsimmon.seqObj(
      ["a", Parsimmon.of(1)],
      ["b", Parsimmon.of(2)],
      ["c", Parsimmon.fail("oopsy")]
    );
    var result = parser.parse("");
    assert.strictEqual(result.status, false);
  });

  test("every parser is used", function() {
    var parser = Parsimmon.seqObj(
      Parsimmon.string("a"),
      ["b", Parsimmon.string("b")],
      Parsimmon.string("c"),
      ["d", Parsimmon.string("d")],
      Parsimmon.string("e")
    );
    var result = parser.tryParse("abcde");
    assert.deepStrictEqual(result, {
      b: "b",
      d: "d"
    });
  });

  test("named parser arrays are formed properly", function() {
    assert.throws(function() {
      Parsimmon.seqObj([]);
    });
    assert.throws(function() {
      Parsimmon.seqObj(["a", Parsimmon.of(1), "oops extra"]);
    });
    assert.throws(function() {
      Parsimmon.seqObj([123, Parsimmon.of(1)]);
    });
    assert.throws(function() {
      Parsimmon.seqObj(["cool", "potato"]);
    });
    assert.throws(function() {
      Parsimmon.seqObj(0);
    });
  });
});
