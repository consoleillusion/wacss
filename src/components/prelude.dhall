-- Shared building blocks for every component schema.dhall.
-- A schema starts with:  let P = ../prelude.dhall in { ... }

let string = { type = "string" }

let boolean = { type = "boolean" }

let number = { type = "number" }

let integer = { type = "integer" }

let object = { type = "object", additionalProperties = True }

let stringWith = \(default : Text) -> { type = "string", default }

let booleanWith = \(default : Bool) -> { type = "boolean", default }

let numberWith = \(default : Double) -> { type = "number", default }

let integerWith = \(default : Natural) -> { type = "integer", default }

let choice =
      \(enum : List Text) ->
      \(default : Text) ->
        { type = "string", enum, default }

let described = \(description : Text) -> { type = "string", description }

let commonAttributes = { id = string, class = string }

in  { string
    , boolean
    , number
    , integer
    , object
    , stringWith
    , booleanWith
    , numberWith
    , integerWith
    , choice
    , described
    , commonAttributes
    }
