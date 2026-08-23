import React from "react"
import { renderToStaticMarkup } from "react-dom/server"
import Accordion from "./src/components/accordion/Accordion.jsx"

const html = renderToStaticMarkup(<Accordion />);

console.log(html);
