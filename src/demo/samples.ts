// Sample data for each demo component: the props one instance receives.
export const samples: Record<string, Record<string, unknown>> =
{ Button: { label: "Button" }
, Brand: { href: "#", name: "Soulful Beauty", subtitle: "MOBILE SPA" }
, PriceList:
  { items: [ { label: "60 min", value: "$120" }, { label: "90 min", value: "$160" }, { label: "Couples package", value: "$520" } ] }
, MobileNav:
  { label: "Toggle menu"
  , current: "/services"
  , links: [ { href: "/", label: "Home" }, { href: "/services", label: "Services" }, { href: "/contact", label: "Contact" } ]
  }
, Testimonial:
  { quote: "\"Christina's treatments are absolutely divine. The convenience of having spa-quality services at home is incredible!\""
  , rating: 5
  , name: "Sarah M."
  , location: "Auckland CBD"
  }
, CheckList:
  { items: [ "Relieves muscle tension and pain", "Improves blood circulation", "Reduces stress and anxiety", "Promotes better sleep" ] }
, Feature:
  { figure: { component: "Icon", data: { name: "sparkles" } }
  , title: "Premium Products"
  , text: "We use only the finest natural and professional-grade beauty products."
  }
, Icon: { name: "sparkles", label: "Sparkles" }
, Image:
  { src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 3'%3E%3Crect width='4' height='3' fill='%23b8d6d3'/%3E%3C/svg%3E"
  , alt: "A calm blue-green panel"
  }
, Hero:
  { eyebrow: "Mobile Beauty Spa · Auckland"
  , title: "Beauty & Wellness"
  , titleAccent: "At Your Doorstep"
  , text: "Experience personalised and flexibly convenient beauty treatments in the comfort of your home or business."
  , actions:
    [ { component: "Button", data: { variant: "primary", label: "Book Your Treatment", href: "#" } }
    , { component: "Button", data: { variant: "tertiary", label: "Explore Services", href: "#" } }
    ]
  }
, Section:
  { variant: "primary"
  , centered: true
  , title: "Ready to Experience Soulful Beauty?"
  , text: "Book your personalised treatment today and discover the convenience of professional spa services at your doorstep."
  , actions:
    [ { component: "Button", data: { variant: "primary", label: "Book Now", href: "#" } }
    , { component: "Button", data: { variant: "tertiary", label: "Call Us", href: "tel:+642102757259" } }
    ]
  }
, Footer:
  { brand: { component: "Brand", data: { href: "#", name: "Soulful Beauty", subtitle: "MOBILE SPA" } }
  , description: "Experience personalised beauty treatments in the comfort of your own space."
  , columns:
    [ { heading: "Quick Links", links: [ { href: "#", label: "Home" }, { href: "#", label: "About Us" } ] }
    , { heading: "Services", links: [ { href: "#", label: "Massage" }, { href: "#", label: "Facials" } ] }
    ]
  , contact: [ { label: "Contact Us", value: "+64 21 027 57259", href: "tel:+642102757259" } ]
  , copyright: "© 2026 Soulful Beauty. All rights reserved."
  , legal: [ { href: "#", label: "Privacy Policy" }, { href: "#", label: "Terms & Conditions" } ]
  }
, Notice: { heading: "Correct.", text: "NETCONF listens on port 830 by default." }
, Progress: { label: "Quiz", value: 9, max: 20, text: "7 correct of 9 answered" }
, Radio:
  { legend: "Which protocol uses YANG over HTTP?", name: "protocol", value: "restconf"
  , options: [ { value: "netconf", label: "NETCONF" }, { value: "restconf", label: "RESTCONF" }, { value: "snmp", label: "SNMP" } ]
  }
, Fieldset: { legend: "Send me" }
, Slider: { label: "Time range", min: 0, max: 30, value: [ 6, 24 ], text: "Days 6 to 24" }
, Pagination: { page: 2, pages: 7, href: "#page-{page}" }
, SortableList:
  { label: "Put these in order"
  , items: [ { id: "a", label: "Discover the device" }, { id: "b", label: "Read its capabilities" }, { id: "c", label: "Edit the configuration" } ]
  }
, Stat: { value: "80%", label: "correct" }
, Toolbar: { label: "Question navigation" }
, ModeToggle: {}
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
, Badge: { label: "4/5" }
, Chip: { label: "Input", value: "input", pressed: false }
, NavBar:
  { title: "Site"
  , href: "#"
  , current: "#about"
  , links: [ { href: "#about", label: "About" }, { href: "#work", label: "Work" } ]
  , brand: { component: "Brand", data: { name: "Soulful Beauty", subtitle: "MOBILE SPA" } }
  , mobile: { component: "MobileNav", data: { label: "Toggle menu", links: [ { href: "#about", label: "About" }, { href: "#work", label: "Work" } ] } }
  }
, Table:
  { columns: [ { key: "domain", label: "Domain" }, { key: "score", label: "Score" } ]
  , rows:
    [ { domain: "Network programmability", score: { component: "Badge", data: { label: "4/5", variant: "positive" } } }
    , { domain: "Automation APIs", score: { component: "Badge", data: { label: "2/5", variant: "danger" } } }
    ]
  }
, TextInput: { label: "Name", placeholder: "Your name" }
, NumberInput: { label: "Quantity", value: 3, min: 1, max: 9 }
, DateInput: { label: "Date", type: "date" }
, ColorInput: { label: "Color", value: "#c23a22" }
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
