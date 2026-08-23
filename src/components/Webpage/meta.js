export const meta =
{ type: 'object'
, description: 'A structured configuration object containing global website metadata, SEO settings, social tags, theming options, geolocation data, and icon resources used for generating the site\'s head section and shared site-wide settings.'
, required:
  [ 'title'
  , 'description'
  , 'iso_country'
  , 'iso_language'
  , 'keywords'
  , 'card'
  , 'type'
  , 'robots'
  ]
, properties:
  { title:
    { description: 'The primary title of the website or page, used for browser tabs, search engine results, and social preview titles.'
    , type: 'string'
    , default: null
    , 'x-generator': 'llm'
    }

  , description:
    { description: 'A concise meta description summarizing the website’s purpose or content, used for SEO, social sharing previews, and search engine indexing.'
    , type: 'string'
    , default: null
    , 'x-generator': 'llm'
    }

  , author:
    { description: 'The name of the individual, business, or organization responsible for creating or managing the website’s content.'
    , type: 'string'
    , default: null
    , 'x-generator': 'none'
    }

  , image:
    { description: 'A URL pointing to the primary image used for social media previews, link sharing, and as the website’s main hero image.'
    , type: 'string'
    , format: 'uri'
    , default: null
    , 'x-generator': 'vector'
    }

  , iso_country:
    { description: 'The ISO-3166-1 alpha-2 country code representing the website’s primary geographic location or target audience.'
    , type: 'string'
    , enum: ["AD","AE","AF","AG","AI","AL","AM","AN","AO","AQ","AR","AS","AT","AU","AW","AX","AZ","BA","BB","BD","BE","BF","BG","BH","BI","BJ","BL","BM","BN","BO","BR","BS","BT","BV","BW","BY","BZ","CA","CC","CD","CF","CG","CH","CI","CK","CL","CM","CN","CO","CR","CU","CV","CX","CY","CZ","DE","DJ","DK","DM","DO","DZ","EC","EE","EG","EH","ER","ES","ET","FI","FJ","FK","FM","FO","FR","GA","GB","GD","GE","GF","GG","GH","GI","GL","GM","GN","GP","GQ","GR","GS","GT","GU","GW","GY","HK","HM","HN","HR","HT","HU","ID","IE","IL","IM","IN","IO","IQ","IR","IS","IT","JE","JM","JO","JP","KE","KG","KH","KI","KM","KN","KP","KR","KW","KY","KZ","LA","LB","LC","LI","LK","LR","LS","LT","LU","LV","LY","MA","MC","MD","ME","MF","MG","MH","MK","ML","MM","MN","MO","MP","MQ","MR","MS","MT","MU","MV","MW","MX","MY","MZ","NA","NC","NE","NF","NG","NI","NL","NO","NP","NR","NU","NZ","OM","PA","PE","PF","PG","PH","PK","PL","PM","PN","PR","PS","PT","PW","PY","QA","RE","RO","RS","RU","RW","SA","SB","SC","SD","SE","SG","SH","SI","SJ","SK","SL","SM","SN","SO","SR","ST","SV","SY","SZ","TC","TD","TF","TG","TH","TJ","TK","TL","TM","TN","TO","TR","TT","TV","TW","TZ","UA","UG","UM","US","UY","UZ","VA","VC","VE","VG","VI","VN","VU","WF","WS","YE","YT","ZA","ZM","ZW"]
    , default: 'US'
    , 'x-generator': 'default'
    }

  , iso_language:
    { description: 'The ISO 639-1 language code indicating the primary language used throughout the website.'
    , type: 'string'
    , enum: ["aa","ab","ae","af","ak","am","an","ar","as","av","ay","az","ba","be","bg","bi","bm","bn","bo","br","bs","ca","ce","ch","co","cr","cs","cu","cv","cy","da","de","dv","dz","ee","el","en","eo","es","et","eu","fa","ff","fi","fj","fo","fr","fy","ga","gd","gl","gn","gu","gv","ha","he","hi","ho","hr","ht","hu","hy","hz","ia","id","ie","ig","ii","ik","io","is","it","iu","ja","jv","ka","kg","ki","kj","kk","kl","km","kn","ko","kr","ks","ku","kv","kw","ky","la","lb","lg","li","ln","lo","lt","lu","lv","mg","mh","mi","mk","ml","mn","mr","ms","mt","my","na","nb","nd","ne","ng","nl","nn","no","nr","nv","ny","oc","oj","om","or","os","pa","pi","pl","ps","pt","qu","rm","rn","ro","ru","rw","sa","sc","sd","se","sg","si","sk","sl","sm","sn","so","sq","sr","ss","st","su","sv","sw","ta","te","tg","th","ti","tk","tl","tn","to","tr","ts","tt","tw","ty","ug","uk","ur","uz","ve","vi","vo","wa","wo","xh","yi","yo","za","zh","zu"]
    , default: 'en'
    , 'x-generator': 'default'
    }

  , keywords:
    { description: 'A string containing a comma-separated list of relevant keywords and key phrases that accurately represent the main topics, themes, and content of the website. These keywords help search engines categorize and rank the site, improving its visibility and discoverability in search results. Properly curated keywords contribute to effective SEO by targeting the terms potential visitors are likely to use when searching.'
    , type: 'string'
    , default: null
    , 'x-generator': 'llm'
    }

  , card:
    { description: 'A string specifying the type of Twitter Card to be used when sharing the website’s link on Twitter. Valid options include \'summary\' for a small preview card, \'summary_large_image\' for a larger image-focused card, \'app\' for showcasing a mobile application, and \'player\' for embedding video or audio media. The default is \'summary_large_image\', which provides an engaging large image preview to enhance link visibility and click-through rates.'
    , type: 'string'
    , enum:
      [ 'summary'
      , 'summary_large_image'
      , 'app'
      , 'player'
      ]
    , default: 'summary_large_image'
    , 'x-generator': 'default'
    }

  , url:
    { description: 'A fully qualified canonical URL of the webpage that will be shared on social media platforms. This URL is used by Open Graph (og:url) and Twitter Card (twitter:url) tags to ensure that links direct users to the correct page, improving link consistency, SEO, and social media sharing accuracy.'
    , type: 'string'
    , format: 'uri'
    , default: null
    , 'x-generator': 'llm'
    }

  , type:
    { description: 'A string defining the Open Graph object type of the webpage, which helps social media platforms understand the nature of the content being shared. Common values include \'website\', \'article\', \'video\', and \'profile\', allowing platforms to display appropriate previews and metadata based on the content type.'
    , type: 'string'
    , default: 'website'
    , 'x-generator': 'default'
    }

  , robots:
    { description: 'A string specifying directives for web crawlers and search engines on how to index and crawl the webpage. Common values include \'index\' to allow indexing, \'noindex\' to prevent indexing, \'follow\' to allow following links, and \'nofollow\' to prevent following links. Additional directives control caching, snippet display, translation, and image indexing. These instructions help control the webpage’s visibility and behavior in search engine results.'
    , type: 'string'
    , default: 'index, follow'
    , 'x-generator': 'default'
    }

  , fbAppId:
    { description: 'Facebook AppId if this is a Facebook App.'
    , type: 'string'
    , default: null
    , 'x-generator': 'default'
    }

  , latitude:
    { description: 'Latitude of the physical address.'
    , type: 'number'
    , minimum: -90
    , maximum: 90
    , default: null
    , 'x-generator': 'default'
    }

  , longitude:
    { description: 'Longitude of the physical address.'
    , type: 'number'
    , minimum: -180
    , maximum: 180
    , default: null
    , 'x-generator': 'default'
    }

  , revenge:
    { description: 'Include a CSS File that shows bad practices'
    , type: 'boolean'
    , default: false
    , 'x-generator': 'default'
    }

  , theme: {"description":"The theme of the website, including palette and fonts.","type":"object","required":["palette","fonts"],"default":null,"x-generator":"llm","properties":{"fonts":{"title":"Fonts","type":"object","required":["heading","body"],"properties":{"heading":{"description":"The font used for headings. Appropriate for a hairdressers website.","type":"string","default":"inter","x-generator":"llm"},"body":{"description":"The font used for the main body text. appropriate for a restaurant.","type":"string","default":"inter","x-generator":"llm"}}},"palette":{"title":"Palette","type":"object","required":["title","description","colors"],"additionalProperties":false,"properties":{"id":{"type":"string"},"title":{"type":"string"},"author":{"type":"string"},"colors":{"type":"object","required":["base","surface","brand","accent","support"],"properties":{"base":{"type":"string","pattern":"^#([0-9A-Fa-f]{6})$"},"surface":{"type":"string","pattern":"^#([0-9A-Fa-f]{6})$"},"brand":{"type":"string","pattern":"^#([0-9A-Fa-f]{6})$"},"accent":{"type":"string","pattern":"^#([0-9A-Fa-f]{6})$"},"support":{"type":"string","pattern":"^#([0-9A-Fa-f]{6})$"}}},"description":{"type":"string"},"url":{"type":"string","format":"uri"},"imageUrl":{"type":"string","format":"uri"},"badgeUrl":{"type":"string","format":"uri"},"rank":{"type":"integer"},"dateCreated":{"type":"string","format":"date-time"}}}}}

  , icon:
    { description: 'The icons for the website.'
    , type: 'object'
    , default:
      { main: '/favicon.svg'
      , legacy: '/favicon.ico'
      , small: '/favicon.svg'
      , large: '/favicon.svg'
      }
    , properties:
      { main:
        { description: 'The icons for the website.'
        , type: 'string'
        , default: '/favicon.svg'
        }

      , legacy:
        { description: 'The icons for the website.'
        , type: 'string'
        , default: '/favicon.ico'
        }

      , small:
        { description: 'The icons for the website.'
        , type: 'string'
        , default: '/favicon.svg'
        }

      , large:
        { description: 'The icons for the website.'
        , type: 'string'
        , default: '/favicon.svg'
        }
      }
    }

  , social:
    { type: 'object'
    , description: 'Social buttons configuration'
    , 'x-generator': 'none'
    , patternProperties:
      { '^facebook$':
        { type: 'object'
        , required:
          [ 'handle'
          , 'icon'
          ]
        , properties:
          { icon:
            { description: 'The Facebook Icon to Use'
            , type: 'string'
            , default: 'ri:facebook-fill'
            }

          , handle:
            { description: 'The Facebook to Use'
            , type: 'string'
            , pattern: '^[a-zA-Z0-9\\.]{5,50}$'
            }
          }
        }
    
      , '^twitter$':
        { type: 'object'
        , required:
          [ 'handle'
          , 'icon'
          ]
        , properties:
          { icon:
            { description: 'The Twitter Icon to Use'
            , type: 'string'
            , default: 'ri:twitter-x'
            }
        
          , handle:
            { description: 'The Handle to Use'
            , type: 'string'
            , pattern: '^[A-Za-z0-9_]{1,15}$'
            }
          }
        }
    
      , '^[a-zA-Z0-9_]+$':
        { type: 'object'
        , required:
          [ 'handle'
          , 'icon'
          ]
        , properties:
          { handle: 
            { description: "The id/username/email/handle on this service"
            , type: 'string'
            , default: ''
            }
          , icon: {type: 'string'}
          }
        , additionalProperties: true
        } 
      }
      , additionalProperties: false
      }
    }
  }
export default meta
