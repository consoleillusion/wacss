import { commonAttributes } from "../component";

export const meta =
{ name: "nav"
, cssProperties: ["trigger-color", "content-background", "content-border", "content-radius", "content-shadow", "content-padding", "link-color", "link-description-color"]
, roles: ["standard"]
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
