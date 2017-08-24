import configs from './rollup.config.dev';
import babili  from 'rollup-plugin-babili';

const [componentsConfig, transformsConfig] = configs;

componentsConfig.plugins.push(babili({
  comments: false, // means: *remove* comments
  sourceMap: true,
}));

export default [
  componentsConfig,
  transformsConfig,
];
