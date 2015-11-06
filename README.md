# {%= name %} {%= badge("fury") %}

> {%= description %}

## Install
{%= include("install-global") %}

## Usage

```js
var pkg = require('{%= name %}');
```

## API
<!-- add a path or glob pattern for files with code comments to use for docs  -->
{%%= apidocs("index.js") %}

## Related projects
<!-- add an array of related projects, then un-escape the helper -->
{%%= related([]) %}  

## Running tests
{%= include("tests") %}

## Contributing
{%= include("contributing") %}

## Author
{%= include("author") %}

## License
{%= copyright() %}
{%= license() %}

***

{%= include("footer") %}
