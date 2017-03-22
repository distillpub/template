# Distill Templates

This is the repository for the distill web framework. If you're interesting in just using the framework to write an article for the [Distill journal](http://distill.pub), visit http://distill.pub/guide/. 

The general process for using this framework is to hotlink the compiled code in your dev environment. 

```html
<script src="http://distill.pub/template.v1.js"></script>
```

You can also install it as a local dependency through npm or with [yarn](https://yarnpkg.com).

```
npm install --D distill-template
```

If you're interested in submitting pull requests or developing on the framework itself, read on.

## Development

Run `yarn start` to start a watching build rollup server. To view the sample pages in the repo, you can run `yarn serve` as a separate process which starts a static server. `yarn build` will run a one-time build.

## Testing

Run `yarn test`. That's it.
