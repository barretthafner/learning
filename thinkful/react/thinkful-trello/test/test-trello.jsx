import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';


import Card from '../Card';
import List from '../List';
import Board from '../Board';

const exampleBoard = [
  ["pick up groceries", "build hampsterball", "find meaning of life"],
  ["start apocalypse", "learn wizard", "talk to bears"],
  ["fight the power", "leave the party early", "make that sweet baby sing"]
];

describe('Card component', function() {

  const exampleText = exampleBoard[0][0];

  const renderer = TestUtils.createRenderer();
  renderer.render(<Card text={exampleText}/>);
  const result = renderer.getRenderOutput();
//  console.log(result);

  it('renders a card', function() {
    expect(result).to.not.be.null;
    expect(result.props.className).to.equal('card');
  });

  it('renders the card text', function() {
    const text = result.props.children;
    expect(text.type).to.equal('p');
    expect(text.props.children).to.equal(exampleText);

  });
});

describe('List component', function() {

  const exampleList = exampleBoard[0];

  const renderer = TestUtils.createRenderer();
  renderer.render(<List cards={exampleList}/>);
  const result = renderer.getRenderOutput();
  console.log(result);

  it('renders a list', function() {
    expect(result).to.not.be.null;
    expect(result.props.className).to.equal('list');
  });

  it('renders each item in the list', function() {
    const list = result.props.children[0];
    expect(list.type).to.equal('ul');

    list.props.children.forEach(function (item, index) {
      const text = item.props.children.props.text;
      expect(text).to.equal(exampleList[index]);
    });

  });

  it('renders the input field', function() {
    const input = result.props.children[1];
    expect(input.type).to.equal('input');
    expect(input.ref).to.equal('input');
    expect(input.props.type).to.equal('text');
    expect(input.props.onChange).to.be.instanceof(Function);
    expect(input.props.onKeyPress).to.be.instanceof(Function);
  });

  it('renders the button', function() {
    const button = result.props.children[2];
    expect(button.type).to.equal('button');
    expect(button.ref).to.equal('button');
    expect(button.props.children).to.equal('Add');
    expect(button.props.onClick).to.be.instanceof(Function);
  });


});

describe('Board component', function() {

  const renderer = TestUtils.createRenderer();
  renderer.render(<Board cards={exampleBoard}/>);
  const result = renderer.getRenderOutput();
//  console.log(result);

  it('renders a board', function() {
    expect(result).to.not.be.null;
    expect(result.props.className).to.equal('board');
  });

  it('renders a list of lists', function() {
    const list = result.props.children;
    expect(list.type).to.equal('ul');
  });
});


