// Sample data for each demo component: the props one instance receives.
export const samples: Record<string, Record<string, unknown>> =
{ Button: { label: "Button" }
, Accordion:
  { items:
    [ { value: "one", title: "What is wacss?", content: "A design system whose CSS is derived from each component's schema." }
    , { value: "two", title: "Where do the styles come from?", content: "From four levels of tokens, the top two generated." }
    , { value: "three", title: "Can a section hold a component?", content: { component: "Button", data: { label: "Yes, as data", variant: "primary" } } }
    ]
  }
, Card:
  { header: "Card"
  , text: "A surface for one piece of content. Its figure renders any wacss component."
  , figure: { component: "Button", data: { label: "Inside a card", variant: "primary" } }
  , footer: { component: "Button", data: { label: "Open component", href: "#card" } }
  }
, Select: { label: "Size", options: [ "Small", "Medium", "Large" ], value: "Medium" }
, Link: { href: "#", label: "Read the guide" }
, Globe: { label: "A globe of the world" }
, CodeBlock: { lang: "ts", code: "const palette = \"kinari\";\nconsole.log(palette);" }
, StreetMap:
  { lat: 51.5074, long: -0.1278, zoom: 12
  , markers: [ { lat: 51.5081, long: -0.0759, label: "Tower of London" }, { lat: 51.5007, long: -0.1246, label: "Westminster" } ]
  }
, TableCell:
  { columns: [ { key: "cell", label: "Heading cell" } ]
  , rows: [ { cell: "Value cell" }, { cell: "Value cell" } ]
  }
, LineChart:
  { x: "month", y: [ "web", "mobile" ]
  , data:
    [ { month: 1, web: 120, mobile: 80 }, { month: 2, web: 135, mobile: 96 }, { month: 3, web: 128, mobile: 118 }
    , { month: 4, web: 152, mobile: 131 }, { month: 5, web: 160, mobile: 150 }, { month: 6, web: 171, mobile: 172 }
    ]
  }
, BarChart:
  { x: "quarter", y: [ "north", "south" ]
  , data: [ { quarter: "Q1", north: 42, south: 30 }, { quarter: "Q2", north: 51, south: 44 }, { quarter: "Q3", north: 47, south: 52 }, { quarter: "Q4", north: 60, south: 57 } ]
  }
, PieChart:
  { key: "browser", value: "users"
  , data: [ { browser: "Firefox", users: 30 }, { browser: "Chrome", users: 45 }, { browser: "Safari", users: 18 }, { browser: "Other", users: 7 } ]
  }
, Badge: { label: "Input", value: "input", pressed: false }
, NavBar: { title: "Site", href: "#", current: "#about", links: [ { href: "#about", label: "About" }, { href: "#work", label: "Work" } ] }
, Table:
  { columns: [ { key: "palette", label: "Palette" }, { key: "accent", label: "Accent" } ]
  , rows: [ { palette: "Kinari", accent: "Undyed thread" }, { palette: "Sakura", accent: "Cherry blossom" } ]
  }
, TextInput: { label: "Name", placeholder: "Your name" }
, NumberInput: { label: "Quantity", value: 3, min: 1, max: 9 }
, DateInput: { label: "Date", type: "date" }
, ColorInput: { label: "Colour", value: "#c23a22" }
, Checkbox: { label: "Send me updates", checked: true }
, TextArea: { label: "Message", rows: 3 }
, Form:
  { schema:
    { type: "object"
    , required: [ "name", "email" ]
    , properties:
      { name: { type: "string", title: "Name" }
      , email: { type: "string", format: "email", title: "Email" }
      , size: { enum: [ "Small", "Medium", "Large" ], title: "Size" }
      , updates: { type: "boolean", title: "Send me updates" }
      }
    }
  , submitLabel: "Send"
  }
};
