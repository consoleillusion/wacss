import { commonAttributes } from "../component";

export const meta =
{ name: "nav"
, cssProperties:
    [ "trigger-color"
    , "content-background"
    , "content-border-color"
    , "content-border-radius"
    , "content-box-shadow"
    , "content-padding"
    , "link-color"
    , "link-description-color"
    , "navigation-menu-list-gap"
    , "navigation-menu-trigger-font-size"
    , "navigation-menu-trigger-font-weight"
    , "navigation-menu-trigger-min-height"
    , "navigation-menu-link-gap"
    , "navigation-menu-link-padding"
    , "navigation-menu-link-border-radius"
    , "navigation-menu-link-font-size"
    , "navigation-menu-link-line-height"
    , "navigation-menu-link-transition"
    , "span-font-size"
    , "navigation-menu-content-border-width"
    , "ul-gap"
    , "ul-inline-size"
    , "navigation-menu-viewport-border-width"
    , "div-inline-size"
    , "div-block-size"
    , "div-border-width"
    , "div-border-start-start-radius"
    , "div-border-start-end-radius"
    ]
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
