# ipynblog-components

Custom HTML elements to help set up Distill-style static sites using
[ipynblog](https://github.com/andrewlook/ipynblog-components).

## Installation

Import the javascript using a simple script tag:
```HTML
<script type="text/javascript"
        src="https://raw.githubusercontent.com/andrewlook/ipynblog-components/master/dist/components.es5.js">
</script>
```

Or, if you have a more involved JS build, you may import the ES6 module:
```bash
npm install ipynblog-components
```
and then, in your JS code:
```
import 'ipynblog-components';
```

## Usage

### `PostsList` and `PostPreview`

```HTML
<posts-list>
    <slot>
        <post-preview title="xyz"></post-preview>
        <post-preview title="abc"></post-preview>
    </slot>
</posts-list>
```

## Developing

Install the dependencies...

```bash
cd ipynblog-components
npm install
```

...then start [Rollup](https://rollupjs.org):
```bash
npm run dev
```

In a separate terminal, start a local server (we're using python's
`SimpleHTTPServer` because using the JS-native `serve` breaks silently when
offline, and offline development is a goal of this project)

Navigate to [localhost:8888](http://localhost:8888). You should see your app
running. Edit a component file in `src`, save it, and reload the page to see
your changes.


# License

[Apache V2](https://github.com/andrewlook/ipynblog-components/blob/master/LICENSE.txt), with the exception of code based on / included from third parties:

| File                      | License Type  | Source            |
| ------------------------- | ------------- | ----------------- |
| src/PostsList.html        | Apache V2     | Distill Authors   |
| src/PostPreview.html      | Apache V2     | Distill Authors   |
| src/DistillHeader.html    | Apache V2     | Distill Authors   |
 
