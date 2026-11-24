let P = ../prelude.dhall

in  { title = "CodeBlock"
    , type = "object"
    , description = "A block of code, highlighted, with a button that copies it."
    , categories = [ "Display" ]
    , variants.secondary = "surface"
    , states = [ "static" ]
    , themeableProperties =
      [ "background"
      , "color"
      , "border-color"
      , "border-width"
      , "border-radius"
      , "padding-block"
      , "padding-inline"
      , "font-size"
      ]
    , structuralProperties.static =
      { display = "flex"
      , `flex-direction` = "column"
      , gap = "0.5em"
      , `min-inline-size` = "0"
      , `border-style` = "solid"
      }
    , arguments =
          P.commonAttributes
      //  { code = P.described "The code shown."
          , lang =
              P.stringWith "astro" // { description = "The language it is written in, which decides its highlighting: any language Shiki knows, such as astro, svelte, ts, css, json or dhall." }
          , label = P.described "A short name shown above the code. Without it, the language is shown."
          , copy =
              P.booleanWith True // { description = "Whether a button copies the code." }
          }
    , required = [ "code" ]
    , details =
      [ "CodeBlock is structure only, written in Astro. Its code is highlighted on the server by Shiki, so the colors are in the page before any JavaScript runs. Shiki's css-variables theme marks each part of the code with an L2 syntax token, such as --syntax-token-keyword, and these take their colors from the palette, so the highlighting follows the palette and the mode."
      , "Above the code, the spread layout helper places the label at one end and the copy button, a tertiary Button, at the other. Pressing the button copies the code as it was given and says Copied for a moment; this, and only this, needs JavaScript."
      ]
    , usage =
      [ ''
        <CodeBlock lang="ts" code={`const greeting = "Hello";`} />''
      ]
    }
