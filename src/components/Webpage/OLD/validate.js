import Ajv from 'ajv'
import addFormats from "ajv-formats"
const ajv = new Ajv()
addFormats(ajv)
ajv.addKeyword({keyword: "x-generator"})
ajv.addKeyword({keyword: "x-faker"})
ajv.addKeyword({keyword: "faker"})

export const validate =
  schema => data => {
    const validate = ajv.compile(schema)
    const valid = validate(data)
    //if (!valid) console.log(validate.errors)
    return {res: valid,err: validate.errors || null}
  }
