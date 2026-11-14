import { commonAttributes } from "../component";

export const style =
{ properties:
    [ { property: "trigger-color", states: ["active"] }
    , { property: "content-background" }
    , { property: "content-border" }
    , { property: "content-radius" }
    , { property: "content-shadow" }
    , { property: "content-padding" }
    , { property: "link-color" }
    , { property: "link-description-color" }
    ]
, states: ["static", "active"]
} as const;

export const component =
{ title: "NavigationMenu"
, description: "A navigation menu with links and dropdown content, built on bits-ui NavigationMenu."
, type: "object"
, properties:
    { ...commonAttributes
    , items:
        { type: "array"
        , description: "Navigation items with optional dropdown links."
        , items:
            { type: "object"
            , properties:
                { label: { type: "string" }
                , href: { type: "string" }
                , links:
                    { type: "array"
                    , items:
                        { type: "object"
                        , properties:
                            { href: { type: "string" }
                            , label: { type: "string" }
                            , description: { type: "string" }
                            }
                        , required: ["href", "label"]
                        }
                    }
                }
            , required: ["label"]
            }
        }
    }
, additionalProperties: true
} as const;
