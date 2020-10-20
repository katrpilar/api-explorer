const React = require('react');
const { shallow, mount } = require('enzyme');
const Oas = require('oas/tooling');

const example = require('./__fixtures__/example-results/oas');

const ExampleTabs = require('../src/ExampleTabs');
const getResponseExamples = require('../src/lib/get-response-examples');

const oas = new Oas(example);
const props = {
  examples: getResponseExamples(oas.operation('/results', 'get'), oas),
  selected: 0,
  setExampleTab: () => {},
};

test('if endpoint has an example, tabs should show', () => {
  const exampleTabs = mount(<ExampleTabs {...props} />);

  expect(exampleTabs.find('a.tabber-tab')).toHaveLength(3);
});

test('should select matching tab by index', () => {
  const exampleTabs = mount(<ExampleTabs {...props} />);

  expect(exampleTabs.find('a').first().hasClass('selected')).toBe(true);
});

test('should call setExampleTab on click', () => {
  const setExampleTab = jest.fn();
  const exampleTabs = mount(<ExampleTabs {...props} setExampleTab={setExampleTab} />);

  const secondTab = exampleTabs.find('a').last();

  secondTab.simulate('click', { preventDefault() {} });

  expect(setExampleTab.mock.calls[0][0]).toBe(2);
});

test('should display status codes', () => {
  const exampleTabs = shallow(<ExampleTabs {...props} />);

  expect(exampleTabs.find('IconStatus')).toHaveLength(3);
});
