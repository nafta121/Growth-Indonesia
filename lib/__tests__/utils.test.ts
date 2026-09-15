import { describe, it } from "node:test"
import assert from "node:assert/strict"
import { cn } from "../utils.ts"

describe("cn utility function", () => {
  it("merges simple class names", () => {
    assert.equal(cn("foo", "bar"), "foo bar")
  })

  it("handles conditional class names with objects and booleans", () => {
    assert.equal(cn("foo", true && "bar", false && "baz"), "foo bar")
    assert.equal(cn({ foo: true, bar: false, baz: true }), "foo baz")
  })

  it("handles arrays and nested class lists", () => {
    assert.equal(cn(["foo", "bar"], "baz"), "foo bar baz")
    assert.equal(cn(["foo", ["bar", { baz: true }]]), "foo bar baz")
  })

  it("handles falsy values like null, undefined, false, 0", () => {
    assert.equal(cn("foo", null, undefined, false, 0, "bar"), "foo bar")
  })

  it("resolves conflicting Tailwind utility classes using tailwind-merge", () => {
    assert.equal(cn("px-2 py-1", "p-4"), "p-4")
    assert.equal(cn("bg-red-500", "bg-blue-500"), "bg-blue-500")
    assert.equal(cn("text-sm text-red-500", "text-lg"), "text-red-500 text-lg")
  })

  it("returns empty string when given no inputs or all falsy values", () => {
    assert.equal(cn(), "")
    assert.equal(cn(null, undefined, false), "")
  })
})
