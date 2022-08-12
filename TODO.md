# TODO

- feat: add word classes (adjective, noun, verb, etc.)
- feat: create contact page
- feat: create contribute page
- test: update test with @shelf/jest-mongodb
- feat: add pronounciation
- feat: add alternative spelling
- feat: beforeunload on add page
- feat: add noscript message
- fix: update search scrollbar padding on screen resize
- chore: investigate PWA
- chore: investigate autofocus on iOS
- chore: investigate CSS variables for MUI
- chore: investigate if React can be replace with Preact

## Suggestions

- feat: center title
- feat: remove card title underline
- fix: form validation on mobile
- feat: back button navigation
- feat: update input color

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
