<div align="center">
<br>

<h1>resource-injector</h1>

<p><sup>The ResourceInjector is a utility for dynamically loading JavaScript and CSS resources into a webpage. It helps developers ensure that external scripts and stylesheets are loaded only once, providing a caching mechanism through a static 'loadedResources' map. The 'loadScript' and 'loadStyle' methods handle injecting 'script' and 'link' elements, respectively, into the DOM, while also managing potential load timeouts.</sup></p>

[![npm](https://img.shields.io/npm/v/resource-injector.svg?colorB=brightgreen)](https://www.npmjs.com/package/resource-injector)
[![GitHub package version](https://img.shields.io/github/package-json/v/ux-ui-pro/resource-injector.svg)](https://github.com/ux-ui-pro/resource-injector)
[![NPM Downloads](https://img.shields.io/npm/dm/resource-injector.svg?style=flat)](https://www.npmjs.org/package/resource-injector)

<sup>600B gzipped</sup>

</div>
<br>

&#10148; **Install**
```console
$ yarn add resource-injector
```
<br>

&#10148; **Import**
```javascript
import ResourceInjector from 'resource-injector';
```
<br>

&#10148; **Usage**
```javascript
const resourceInjector = new ResourceInjector();

resourceInjector
  .loadScript('https://example.com/script.js', { async: true }, 5000)
  .then(() => console.log('Script loaded successfully'))
  .catch(() => console.error('Failed to load script'));

resourceInjector
  .loadStyle('https://example.com/style.css', {}, 5000)
  .then(() => console.log('Style loaded successfully'))
  .catch(() => console.error('Failed to load style'));
```
<br>

&#10148; **Options**

|  Option   |                           Type                           | Default | Description                                                                                     |
|:---------:|:--------------------------------------------------------:|:-------:|:------------------------------------------------------------------------------------------------|
|  `jsUrl`  |                         `string`                         |   `-`   | The URL of the JavaScript file to load.                                                         |
| `cssUrl`  |                         `string`                         |   `-`   | The URL of the CSS file to load.                                                                |
| `options` | `Partial<HTMLScriptElement> \| Partial<HTMLLinkElement>` |  `{}`   | Optional attributes for the `<script>` or `<link>` elements, such as `async`, `defer`, or `id`. |
| `timeout` |                         `number`                         | `10000` | The time in milliseconds to wait before resolving if the resource fails to load.                |

<br>

&#10148; **Methods**

| Method         |                                Parameters                                 |     Returns     | Description                                            |
|:---------------|:-------------------------------------------------------------------------:|:---------------:|:-------------------------------------------------------|
| `loadScript()` | `(jsUrl: string, options?: Partial<HTMLScriptElement>, timeout?: number)` | `Promise<void>` | Dynamically loads a JavaScript file into the document. |
| `loadStyle()`  | `(cssUrl: string, options?: Partial<HTMLLinkElement>, timeout?: number)`  | `Promise<void>` | Dynamically loads a CSS file into the document.        |
<br>

&#10148; **Examples**

<sub>Load a JavaScript File</sub>
```javascript
const resourceInjector = new ResourceInjector();

resourceInjector
  .loadScript('https://example.com/script.js', { async: true }, 5000)
  .then(() => console.log('Script loaded'))
  .catch(() => console.error('Failed to load script'));
```

<sub>Load a CSS File</sub>
```javascript
resourceInjector
  .loadStyle('https://example.com/style.css', {}, 5000)
  .then(() => console.log('Style loaded'))
  .catch(() => console.error('Failed to load style'));
```

<sub>Handle Multiple Resources</sub>
```javascript
Promise.all([
  resourceInjector.loadScript('https://example.com/script1.js'),
  resourceInjector.loadStyle('https://example.com/style1.css')
])
  .then(() => console.log('All resources loaded'))
  .catch(() => console.error('One or more resources failed to load'));
```
<br>

&#10148; **License**

resource-injector is released under MIT license
