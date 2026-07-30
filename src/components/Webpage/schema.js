import components from './components.js'
import meta from './meta.js'

/*
import $RefParser from "@apidevtools/json-schema-ref-parser"
import jsf from 'json-schema-faker'
jsf.option({useDefaultValue: true, alwaysFakeOptionals: true})
*/

export const Webpage =
{ title: "Webpage"
, description: "Webpage Serialization Schema Validation"
, type: "object"
, additionalProperties: false
, required: ["meta","blocks","global"]
, properties:
  { meta: {$ref: '#/$defs/meta'}
  , blocks:
    { type: "array"
    , items: {oneOf: Object.keys(components).map(k => ({ $ref: `#/$defs/components/${k}` }))}
    }
  , global:
    { type: "array"
    , description: "A List of Global Components"
    , default: [{title: "Navbar"},{title: "Footer"}]
    }
  }
, $defs:
  { components
  , meta
  }
}

export default Webpage

//console.log(JSON.stringify(Webpage))
/*
const res = jsf.generate(await $RefParser.dereference(Webpage))
console.log(JSON.stringify(res))
*/
