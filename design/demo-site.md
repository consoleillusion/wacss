## Demo site

### Routes: HTML as Data

It should be possible to represent the demo site, and any site, in JSON. A site object will need to have a pages property

```typescript
{ title: "DemoSite"
, description: "The data for this demo site"
, pages:
    { "/": 
        { title: "home"
        , children:
            [ <This is an array of the components on the page in order, including any writing like article, copywriting, etc>
            ]
        }
    , "/components"
    , "/philosophy"
    , "/tokens"
    , <...fill this in with all the pages of this documentation...>
    }
}
```

### Built-in affordances for the Demo site

- A consistent navbar.
- A light/dark toggle in the top-right corner.
- Persisted theme and palette preference.
- Flash prevention when restoring the theme (inline bootstrap script setting `data-theme`/`data-palette` before first paint).

