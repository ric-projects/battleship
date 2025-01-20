import { describe, expect, test } from "@jest/globals";
import { Ship } from "./objectFactories.js";
// describe("sum module", () => {
//   test("adds 1 + 2 to equal 3", () => {
//     expect(sum(1, 2)).toBe(3);
//   });
// });

const testShip = new Ship(5);

test("Test Ship", () => {
  expect(testShip.hits).toBe(0);
  expect(testShip.hit()).toBe(undefined);
  expect(testShip.hits).toBe(1);
  expect(testShip.isSunk()).toBe(false);
});
