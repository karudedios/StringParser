# StringParser


## Description
Repository that holds a string parser, the parser receives a template and an object from which the placeholders in the template will be populated.

## Example
```javascript
import { stringParser } from './stringParser';

let template = 'Hello {{ dictionary.name }}, {{ dictionary.question }}?';
let feedTemplateWith = stringParser(template);

let dataSource = {
  dictionary: {
    name: 'Carlos',
    question: 'How do you do',
  }
};

let newText = feedTemplateWith(dataSource);

=> 'Hello Carlos, How do you do?'

```
