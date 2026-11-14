/**
 * Meta-schema for component schema modules.
 *
 * Every `src/components/<Name>/schema.ts` exports a named `style` object and a
 * component definition. `style` declares which CSS properties and states
 * exist — never any CSS values. The component definition is the component's
 * public JSON Schema.
 *
 * Example:
 *
 *   import Ajv2020 from "ajv/dist/2020.js";
 *   import { componentSchema } from "./component";
 *
 *   const validate = new Ajv2020({ allErrors: true }).compile(componentSchema);
 *   validate(await import("./Button/schema"));
 */

/** Attributes every component accepts; spread into each schema's `properties`. */
export const commonAttributes =
{ id: { type: "string", description: "Unique element identifier." }
, class: { type: "string", description: "CSS class name(s)." }
, "class:list": { description: "Astro class:list value." }
, style: { type: "string", description: "Inline style string." }
, title: { type: "string", description: "Advisory title." }
, lang: { type: "string", description: "Language tag." }
, dir: { type: "string", enum: ["ltr", "rtl", "auto"], description: "Text direction." }
, hidden: { type: "boolean", description: "Hidden from display." }
, tabindex: { type: ["number", "string"], description: "Tab order." }
};

const states =
[ "static"
, "hover"
, "focus"
, "active"
, "disabled"
, "selected"
, "checked"
, "invalid"
, "open"
, "highlighted"
, "pressed"
, "current"
, "loading"
];

export const componentSchema =
{ $schema: "https://json-schema.org/draft/2020-12/schema"
, $id: "https://wacss.dev/schema/component.json"
, title: "WacssComponentSchemaModule"
, description: "The shape of a src/components/<Name>/schema.ts module: a named `style` export and a component definition."
, type: "object"
, required: ["style", "component"]
, additionalProperties: false
, properties:
    { style:
        { title: "ComponentStyle"
        , description: "The CSS properties and states for one component. Declares structure only — never CSS values."
        , type: "object"
        , required: ["properties", "states"]
        , additionalProperties: false
        , properties:
            { properties:
                { type: "array"
                , description:
                    "Every CSS property the component receives. Layer-3 tokens are --<family>-<property>."
                , items:
                    { type: "object"
                    , required: ["property"]
                    , additionalProperties: false
                    , properties:
                        { property:
                            { type: "string"
                            , pattern: "^[a-z][a-z0-9]*(-[a-z0-9]+)*$"
                            , description: "Property stem, e.g. `background`, `padding-inline`."
                            }
                        , states:
                            { type: "array"
                            , uniqueItems: true
                            , description:
                                "States in which this property changes. `static` is implicit and must not be listed."
                            , items: { enum: states.filter((state) => state !== "static") }
                            }
                        }
                    }
                }
            , states:
                { type: "array"
                , minItems: 1
                , uniqueItems: true
                , description: "States the component can be in. Always includes `static`."
                , items: { enum: states }
                }
            }
        }
    , component:
        { title: "ComponentDefinition"
        , description: "The component's public JSON Schema."
        , type: "object"
        , required: ["title", "type", "properties", "additionalProperties"]
        , additionalProperties: false
        , properties:
            { title: { type: "string", minLength: 1 }
            , description: { type: "string" }
            , type: { const: "object" }
            , properties:
                { type: "object"
                , description:
                    "Public props. Every component must declare the shared common attributes."
                , required: Object.keys(commonAttributes)
                , additionalProperties:
                    { title: "ComponentProperty"
                    , description: "A JSON Schema fragment describing one public prop."
                    , type: "object"
                    , additionalProperties: true
                    , properties:
                        { type:
                            { oneOf:
                                [ { type: "string" }
                                , { type: "array", minItems: 1, items: { type: "string" } }
                                ]
                            }
                        , description: { type: "string" }
                        , enum: { type: "array", minItems: 1 }
                        , const: {}
                        , default: {}
                        , items: { type: "object" }
                        , properties: { type: "object" }
                        , required: { type: "array", uniqueItems: true, items: { type: "string" } }
                        , $ref: { type: "string" }
                        , oneOf: { type: "array", minItems: 1, items: { type: "object" } }
                        , anyOf: { type: "array", minItems: 1, items: { type: "object" } }
                        , minimum: { type: "number" }
                        , maximum: { type: "number" }
                        , pattern: { type: "string" }
                        }
                    }
                }
            , additionalProperties: { type: "boolean" }
            , required: { type: "array", uniqueItems: true, items: { type: "string" } }
            , anyOf: { type: "array", minItems: 1, items: { type: "object" } }
            }
        }
    }
}
