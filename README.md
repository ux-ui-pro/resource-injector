<div align="center">
<br>

<h1>resource-injector</h1>

<p><sup>The ResourceInjector is a utility for dynamically loading JavaScript and CSS resources into a webpage. It helps developers ensure that external scripts and stylesheets are loaded only once, providing a caching mechanism through a static 'loadedResources' map. The 'loadScript' and 'loadStyle' methods handle injecting 'script' and 'link' elements, respectively, into the DOM, while also managing potential load timeouts.</sup></p>

[![npm](https://img.shields.io/npm/v/resource-injector.svg?colorB=brightgreen)](https://www.npmjs.com/package/resource-injector)
[![GitHub package version](https://img.shields.io/github/package-json/v/ux-ui-pro/resource-injector.svg)](https://github.com/ux-ui-pro/resource-injector)
[![NPM Downloads](https://img.shields.io/npm/dm/resource-injector.svg?style=flat)](https://www.npmjs.org/package/resource-injector)

<sup>0.7kB gzipped</sup>

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
import ResourceInjector from 'resource-injector';

const injector = new ResourceInjector();

// Load a JavaScript resource
injector
  .loadResource({
    url: 'https://example.com/script.js',
    type: 'script',
    options: { async: true },
    timeout: 5000,
    forceReload: true,
  })
  .then(() => console.log('Script loaded successfully'))
  .catch(() => console.error('Failed to load script'));

// Load a CSS resource
injector
  .loadResource({
    url: 'https://example.com/styles.css',
    type: 'style',
    timeout: 7000,
  })
  .then(() => console.log('Style loaded successfully'))
  .catch(() => console.error('Failed to load style'));
```
<br>

&#10148; **Options**

|    Option     |                           Type                           | Default | Description                                                                                     |
|:-------------:|:--------------------------------------------------------:|:-------:|:------------------------------------------------------------------------------------------------|
|     `url`     |                         `string`                         |   `-`   | The URL of the resource to load (JavaScript or CSS).                                            |
|    `type`     |                  `'script' \| 'style'`                   |   `-`   | Specifies whether the resource is a JavaScript (`script`) or a CSS file (`style`).              |
|   `options`   | `Partial<HTMLScriptElement> \| Partial<HTMLLinkElement>` |  `{}`   | Optional attributes for the `<script>` or `<link>` elements, such as `async`, `defer`, or `id`. |
|   `timeout`   |                         `number`                         | `10000` | The time in milliseconds to wait before resolving if the resource fails to load.                |
| `forceReload` |                        `boolean`                         | `false` | If `true`, forces reloading the resource even if it was already loaded.                         |

<br>

&#10148; **Methods**

| Method         |                            Parameters                             |     Returns     | Description                                                                       |
|:---------------|:-----------------------------------------------------------------:|:---------------:|:----------------------------------------------------------------------------------|
| `loadResource` | `{ url, type, options?, timeout?, forceReload? }: ResourceConfig` | `Promise<void>` | Dynamically loads a JavaScript or CSS resource based on the configuration object. |
<br>

&#10148; **Examples**

<sub>Load a JavaScript File</sub>
```javascript
injector
  .loadResource({
    url: 'https://example.com/script.js',
    type: 'script',
    options: { async: true },
    timeout: 5000,
    forceReload: true,
  })
  .then(() => console.log('Script loaded'))
  .catch(() => console.error('Failed to load script'));
```

<sub>Load a CSS File</sub>
```javascript
injector
  .loadResource({
    url: 'https://example.com/styles.css',
    type: 'style',
    timeout: 7000,
  })
  .then(() => console.log('Style loaded'))
  .catch(() => console.error('Failed to load style'));
```

<sub>Handle Multiple Resources</sub>
```javascript
Promise.all([
  injector.loadResource({
    url: 'https://example.com/script1.js',
    type: 'script',
  }),
  injector.loadResource({
    url: 'https://example.com/style1.css',
    type: 'style',
  }),
])
  .then(() => console.log('All resources loaded'))
  .catch(() => console.error('One or more resources failed to load'));
```
<br>

&#10148; **License**

resource-injector is released under MIT license
