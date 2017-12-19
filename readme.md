# gitbook-cli-local
> Run gitbook cli commands using a local copy installed with NPM

## Why
Because `gitbook-cli` installs `gitbook` to the user home directory and we needed to monkey-patch `gitbook` from the using project.


## Usage

Install gitbook locally with npm:

```
npm install --save-dev gitbook
```

Install gitbook-cli-local:

```
npm install --save-dev @tepez/gitbook-cli-local
```

Start any gitbook command, e.g. serve:

```
node node_modules/@tepez/gitbook-cli-local/bin/gitbook.js serve
```

Or, if you need to make modifications, e.g. monkey-patching, gitbook first:

```js
const Parse = require('gitbook/lib/parse');
const origParsePagesList = Parse.parsePagesList;

// Monkey-patch parsePagesList to set the direction of a page based on the language
// of the book, instead of using wooorm/direction to determine its direction from its content
// As is done by gitbook:
// https://github.com/GitbookIO/gitbook/blob/3.2.2/lib/parse/parsePageFromString.js#L18
// This will fail to recognize a text as Hebrew if the first line is for example
// `# {{ page.title }}`
Parse.parsePagesList = function (book) {
    const language = book.getConfig().getValue('language');
    return origParsePagesList.apply(this, arguments).then((pages) => {
        if (language === 'he') {
            return pages.map((page) => page.set('dir', 'rtl'));
        }
        return pages;
    })
};

require('@tepez/gitbook-cli-local/bin/gitbook.js');
```

