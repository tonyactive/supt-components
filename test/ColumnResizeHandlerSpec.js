import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import sinon from 'sinon';

import ColumnResizeHandler from '../src/MultipleTable/ColumnResizeHandler';
import { getDOMNode, getInstance, findDOM } from './TestWrapper';

const handlerLeft = -2;

describe('ColumnResizeHandler', () => {
  it('Should output a handler', () => {
    const instanceDom = getDOMNode(<ColumnResizeHandler />);
    assert.include(instanceDom.className, 'rs-table-column-resize-spanner');
  });

  it('Should be 100 the `height` ', () => {
    const instanceDom = getDOMNode(<ColumnResizeHandler height={100} />);

    assert.equal(instanceDom.style.height, '100px');
  });

  it('Should have a `left` style', () => {
    const columnWidth = 100;
    const columnLeft = 100;
    const instanceDom = getDOMNode(
      <ColumnResizeHandler defaultColumnWidth={columnWidth} columnLeft={columnLeft} />
    );

    assert.equal(instanceDom.style.left, `${columnWidth + columnLeft + handlerLeft}px`);
  });

  it('Should call `onColumnResizeStart` callback ', done => {
    const doneOp = () => {
      done();
    };

    const instanceDom = getDOMNode(<ColumnResizeHandler onColumnResizeStart={doneOp} />);

    ReactTestUtils.Simulate.mouseDown(instanceDom);
  });

  it('Should be true for `isKeyDown` value when trigger mouseDown', () => {
    const instance = getInstance(<ColumnResizeHandler />);

    ReactTestUtils.Simulate.mouseDown(findDOM(instance));
    expect(instance.isKeyDown).to.equal(true);
  });

  it('Should call `onColumnResizeMove` callback', done => {
    const instance = getInstance(
      <ColumnResizeHandler
        onColumnResizeMove={() => {
          done();
        }}
      />
    );

    ReactTestUtils.Simulate.mouseDown(findDOM(instance));

    ReactTestUtils.Simulate.mouseMove(document.body);
    instance.onMove(10);
  });

  it('Should not call `onColumnResizeMove` callback', () => {
    const resize = sinon.spy();

    const instance = getInstance(<ColumnResizeHandler onColumnResizeMove={resize} />);
    instance.isKeyDown = false;
    instance.onMove(10);

    expect(resize.callCount).to.equal(0);
  });

  it('Should call `onColumnResizeEnd` callback', done => {
    const instance = getInstance(
      <ColumnResizeHandler
        onColumnResizeEnd={() => {
          done();
        }}
      />
    );

    ReactTestUtils.Simulate.mouseDown(findDOM(instance));
    instance.onColumnResizeEnd();
  });

  it('Should have a custom className', () => {
    const instanceDom = getDOMNode(<ColumnResizeHandler className="custom" />);
    assert.ok(instanceDom.className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instanceDom = getDOMNode(<ColumnResizeHandler style={{ fontSize }} />);
    assert.equal(instanceDom.style.fontSize, fontSize);
  });
});
