import '@babel/polyfill';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

configure({ adapter: new Adapter() });

function runAllTests(tests) {
  tests.keys().forEach(tests);
}

runAllTests(require.context('.', true, /Spec.js$/));
