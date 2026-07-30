import {Webpage} from '../Webpage/config.js'
import $RefParser from "@apidevtools/json-schema-ref-parser"

export const base =
{ title: "Website Serialization Schema Validation"
, type: "object"
, additionalProperties: false
, required: ["meta","pages","global"]
, properties:
  { meta: await $RefParser.dereference(import.meta.dirname + '/meta.yaml')
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
    , patternProperties: { "^/(?:[a-z0-9\\-_.~]+(?:/[a-z0-9\\-_.~]+)*)?$": Webpage}
    }
    /*
    */
  , global:
    { type: "array"
    , description: "A List of Global Components"
    , default: [{component: "Navbar"},{component: "Footer"}]
    }
  }
}
console.log(JSON.stringify(base))
