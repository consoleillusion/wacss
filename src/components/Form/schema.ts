import { commonAttributes } from "../component";

export const style =
{ properties: [{ property: "gap" }, { property: "columns-min" }]
, states: ["static"]
} as const;

export const component =
{ title: "Form"
, description:
    "Renders a complete form from a JSON Schema, inferring the right control for every field."
, type: "object"
, properties:
    { ...commonAttributes
    , jsonschema:
        { type: "object"
        , description: "JSON Schema describing the form fields."
        , additionalProperties: true
        }
    , schema: { type: "object", description: "Alias for jsonschema.", additionalProperties: true }
    , values:
        { type: "object"
        , description: "Controlled form values. Defaults are derived from the schema."
        , additionalProperties: true
        }
    , uiSchema:
        { type: "object"
        , description:
            "Per-field presentation overrides keyed by dot path (for example \"address.street\")."
        , additionalProperties:
            { oneOf:
                [ { type: "string" }
                , { type: "object"
                  , properties:
                      { widget: { type: "string" }
                      , label: { type: "string" }
                      , help: { type: "string" }
                      , placeholder: { type: "string" }
                      , autocomplete: { type: "string" }
                      , order: { type: "number" }
                      , hidden: { type: "boolean" }
                      , disabled: { type: "boolean" }
                      , readonly: { type: "boolean" }
                      , columns: { type: "number", enum: [1, 2, 3] }
                      }
                  }
                ]
            }
        }
    , errors:
        { type: "object"
        , description: "Server field errors keyed by dot path."
        , additionalProperties: { type: "string" }
        }
    , action: { type: "string", description: "Native form action URL." }
    , method: { type: "string", enum: ["get", "post", "dialog"], default: "post" }
    , target: { type: "string", description: "Native form target." }
    , enctype: { type: "string" }
    , autocomplete: { type: "string" }
    , novalidate: { type: "boolean", default: false }
    , id: { type: "string" }
    , name: { type: "string" }
    , columns: { type: "number", enum: [1, 2, 3], default: 1 }
    , nameFormat:
        { type: "string"
        , enum: ["dot", "bracket"]
        , default: "dot"
        , description: "How nested field names are serialized for native submission."
        }
    , submitLabel: { type: "string", default: "Submit" }
    , submitVariant:
        { type: "string"
        , enum: ["default", "secondary", "outline", "ghost", "destructive", "link"]
        , default: "default"
        }
    , showSubmit: { type: "boolean", default: true }
    , resetLabel: { type: "string", default: "Reset" }
    , showReset: { type: "boolean", default: false }
    , disabled: { type: "boolean", default: false }
    , readonly: { type: "boolean", default: false }
    , storageKey: { type: "string", default: "wacss:form" }
    , persist: { type: "boolean", default: true }
    , onSubmit:
        { type: "function"
        , description: "Called with (values, event). Prevents native submission when provided."
        }
    , onReset: { type: "function", description: "Called after values are reset to defaults." }
    }
, anyOf: [{ required: ["jsonschema"] }, { required: ["schema"] }]
, additionalProperties: true
} as const;
