# TODO

- Add admin page
- Allow multiple definition per word
- Add word type (adjective, noun, verb, etc.)
- Update test with @shelf/jest-mongodb
- Add pronounciation
- Add alternative spelling
- beforeunload on ajouter

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
