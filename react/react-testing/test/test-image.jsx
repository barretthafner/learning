import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';

import Image from '../image';

describe('Image component', function() {
    it('Renders the image and description',  function() {
        const url = "http://www.example.com/image.png";
        const description = "Example description";

        const renderer = TestUtils.createRenderer();
        renderer.render(<Image url={url} description={description} />);
        const result = renderer.getRenderOutput();
        expect(result.props.className).to.equal('gallery-image');

        const img = result.props.children[0];
        expect(img.type).to.equal('img');
        expect(img.props.src).to.equal(url);
        expect(img.props.alt).to.equal(description);

        const p = result.props.children[1];
        expect(p.type).to.equal('p');
        expect(p.props.children).to.equal(description);
    });
});
