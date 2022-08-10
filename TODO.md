# TODO

- fix: search autofocus on mobile
- fix: add page autofocus on mobile
- feat: create contact page
- feat: create contribute page
- feat: add word type (adjective, noun, verb, etc.)
- test: update test with @shelf/jest-mongodb
- feat: add pronounciation
- feat: add alternative spelling
- feat: beforeunload on add page
- feat: add noscript message
- chore: investigate PWA
- chore: investigate if React can be replace with Preact
- chore: investigate CSS variables for MUI

## Suggestions

- feat: center title
- feat: remove card title underline
- fix: form validation on mobile
- feat: back button navigation

Aggregation pipeline for fuzzy search by label

```
[
  {
    '$search': {
      'index': 'default', 
      'text': {
        'query': 'clisse', // Replace query 
        'path': 'label', 
        'fuzzy': {}
      }
    }
  }, {
    '$addFields': {
      'score': {
        '$meta': 'searchScore'
      }
    }
  }, {
    '$sort': {
      'score': -1
    }
  }
]
```
