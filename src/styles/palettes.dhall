-- The colour configuration of wacss: the top of its colour hierarchy. The token generator
-- writes the colour tokens from it, the book writes its Palettes chapter from it, and the demo
-- lists its palettes. Nothing else holds a colour value.
--
--   palettes — the palettes wacss ships, the first the default. A palette is only a hue:
--              name        lowercase; data-palette="<name>" selects it
--              kanji       its name in Japanese, written down the right of its pages in the book
--              hue         the accent's oklch hue in degrees, the prima of the palette
--              description what the palette is named for and how its colours read
--   colours  — the four colours every palette has, made from its hue. Each has a use, a turn
--              of the hue (0 keeps the palette's hue) and a lightness and chroma in each mode,
--              the same in every palette.
--   intent   — the intent colours: positive, warning, danger and informational, the intent of
--              what they mark. Each has its
--              own hue and use, the same in every palette, and all share one lightness and chroma
--              in each mode.

let Tone = { lightness : Double, chroma : Double }

let Palette = { name : Text, kanji : Text, hue : Natural, description : Text }

let Colour = { name : Text, use : Text, turn : Natural, light : Tone, dark : Tone }

let Intent = { name : Text, hue : Natural, use : Text }

in  { palettes =
          [ { name = "kinari"
            , kanji = "生成"
            , hue = 85
            , description =
                "Unbleached cloth: the natural white of raw silk and cotton, and the warm tan of undyed thread. Quiet and warm, a page that reads like paper."
            }
          , { name = "matcha"
            , kanji = "抹茶"
            , hue = 125
            , description =
                "Whisked tea: the soft green of powdered tea, deepening toward koicha, the thick tea of the ceremony. Calm and grounded, the green of a still afternoon."
            }
          , { name = "aizome"
            , kanji = "藍染"
            , hue = 250
            , description =
                "Indigo dyeing: cloth dipped again and again in the indigo vat, from a faded wash to the deepest kon. Cool and steady, the blue of workwear and night."
            }
          , { name = "sakura"
            , kanji = "桜"
            , hue = 0
            , description =
                "Cherry blossom: the pink of petals in early spring, from the pale bloom to the rose at its heart. Gentle and bright, a page with the warmth of flowers."
            }
          ]
        : List Palette
    , colours =
          [ { name = "base"
            , use = "The background of the page. Close to neutral, with a trace of the palette's hue."
            , turn = 0
            , light = { lightness = 0.985, chroma = 0.0015 }
            , dark = { lightness = 0.19, chroma = 0.003 }
            }
          , { name = "surface"
            , use = "Raised surfaces such as cards, panels and inputs: a step lighter than the base in both modes, so a raised panel reads as lifted toward the light."
            , turn = 0
            , light = { lightness = 0.995, chroma = 0.002 }
            , dark = { lightness = 0.21, chroma = 0.004 }
            }
          , { name = "accent"
            , use = "The colour the palette is named for, at full strength: the fill of the default variant, such as a secondary Button, and the focus ring."
            , turn = 0
            , light = { lightness = 0.6, chroma = 0.09 }
            , dark = { lightness = 0.75, chroma = 0.08 }
            }
          , { name = "pop"
            , use = "A second accent, for critical emphasis: the fill of the primary variant, for calls to action, and of selected text."
            , turn = 10
            , light = { lightness = 0.7, chroma = 0.1 }
            , dark = { lightness = 0.8, chroma = 0.085 }
            }
          ]
        : List Colour
    , intent =
      { colours =
            [ { name = "positive", hue = 147, use = "Success, confirmation" }
            , { name = "warning", hue = 57, use = "Caution, reversible risk" }
            , { name = "danger", hue = 30, use = "Destructive or failed" }
            , { name = "informational", hue = 270, use = "Neutral notice" }
            ]
          : List Intent
      , light = { lightness = 0.4, chroma = 0.09 } : Tone
      , dark = { lightness = 0.7, chroma = 0.09 } : Tone
      }
    }
