import {Webpage} from '../Webpage/schema.js'
import $RefParser from "@apidevtools/json-schema-ref-parser"
import {meta} from '../Webpage/meta.js'
import {components} from '../Webpage/components.js'
//import jsf from 'json-schema-faker'
//jsf.option({useDefaultValue: true, alwaysFakeOptionals: true})
//import {base} from './base.js'

    /*
import $RefParser from "@apidevtools/json-schema-ref-parser"
import {glob} from 'glob'
import {resolve} from 'path'
const componentSchemas = await Z.pipeSync(
  [ glob 
  , Z.map($RefParser.dereference)
  , Z.promiseAll
  ]) (resolve(import.meta.dirname , '../* /config.yaml'))

const ComponentList =
  { type: 'array'
  , items: { anyOf: componentSchemas }
  }

export const Website = await $RefParser.dereference(
  { ...base
  , global: {items: ComponentList}
  , "$defs":
    { ...Z.indexBy(Z.prop('title'))(componentSchemas)
    , ComponentList
    }
  })


import $RefParser from "@apidevtools/json-schema-ref-parser"
    */

export const Website =
{ title: "Website"
, description: "Website Serialization Schema Validation"
, type: "object"
, additionalProperties: false
, required: ["meta","pages","global"]
, properties:
  { meta: {$ref: '#/$defs/meta'}
  , pages: 
    { type: "object"
    , additionalProperties: false
    , description: "A set of pages for the website. The property name is the path. Each one needs a title, an array of blocks, and optionally metadata."
    , minProperties: 1
    , default: {"/": {meta:{title: "home"}, blocks: []}}
    , examples:
      [ { "/": {meta:{title: "home"}, blocks: []}, "/about": {meta:{title: "about"}, blocks: []}, "/blog": {meta:{title: "blog"}, blocks: []}, "/contact": {meta:{title: "contact"}, blocks: []}}
      , { "/": {meta:{title: "home"}, blocks: []}, "/about": {meta:{title: "about"}, blocks: []}, "/services": {meta:{title: "services"}, blocks: []}, "/contact": {meta:{title: "contact"}, blocks: []}, "/products": {meta:{title: "products"}, blocks: []}}
      ]
    , patternProperties: { "^/(?:[a-z0-9\\-_.~]+(?:/[a-z0-9\\-_.~]+)*)?$": {$ref:"#/$defs/Webpage"}}
    }
  , global:
    { type: "array"
    , description: "A List of Global Components"
    , default: [{component: "Navbar"},{component: "Footer"}]
//    , items: ComponentList
    }
  }
  , $defs: {Webpage,meta,components}
}
export default Website
//console.log(JSON.stringify(Website))
//const res = jsf.generate(await $RefParser.dereference(Website))
//console.log(JSON.stringify(res))
