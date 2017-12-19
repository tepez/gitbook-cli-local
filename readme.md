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
const Gitbook = require('gitbook');

require('@tepez/gitbook-cli-local/bin/gitbook.js');
```

