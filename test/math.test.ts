import { expect, test, describe } from "bun:test";

describe("arithmetic", () => {
  test("2 + 2", () => {
    expect(2 + 2).toBe(4);
  });

  test("2 * 2", () => {
    expect(2 * 2).toBe(4);
  });

  test("2 * 2", async () => {
    const result = await Promise.resolve(2 * 2);
    expect(result).toEqual(4);
  });

  test("2 * 2", done => {
    Promise.resolve(2 * 2).then(result => {
      expect(result).toEqual(4);
      done();
    });
  });

  // test("wat", async () => {
  //   const data = await slowOperation();
  //   expect(data).toBe(42);
  // }, 500); // test must run in <500ms
});
