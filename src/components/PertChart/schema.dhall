let P = ../prelude.dhall

in  { title = "PertChart"
    , type = "object"
    , description =
        "A PERT chart of tasks, durations and dependencies, with the critical path."
    , variants = [ "secondary" ]
    , states = [ "static" ]
    , cssProperties =
      [ "background"
      , "color"
      , "border-color"
      , "border-width"
      , "border-radius"
      , "font-size"
      , "gap"
      ]
    , structure.static = { display = "block", overflow = "auto" }
    , arguments =
          P.commonAttributes
      //  { tasks =
            { type = "array"
            , description = "Tasks and the tasks each one depends on."
            , items =
              { type = "object"
              , properties =
                { id = P.string
                , name = P.string
                , duration = P.number
                , dependsOn = { type = "array", items = P.string }
                }
              , required = [ "id", "name", "duration" ]
              }
            }
          , direction = P.choice [ "horizontal", "vertical" ] "horizontal"
          }
    , required = [ "tasks" ]
    }
