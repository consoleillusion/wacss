import $RefParser from "@apidevtools/json-schema-ref-parser"
import {glob} from 'glob'
import {resolve} from 'path'
import {pipe,andThen,indexBy,map,prop} from 'ramda'

export const components = await pipe
  ( async path => await glob(path)
  , andThen(map(async file => await $RefParser.dereference(file)))
  , andThen( x => Promise.all(x))
  , andThen(indexBy(prop('title')))
  ) (resolve(import.meta.dirname , '../*/schema.yaml'))
export default components
