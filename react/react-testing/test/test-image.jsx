import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';

import Image from '../image';
import Gallery from '../gallery';

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

describe('Gallery component', function() {
  it('Renders a gallery of images', function() {
    const images = [
      {
        url: 'https://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg',
        description: 'Maru in some paper'
      },
      {
        url: 'https://s-media-cache-ak0.pinimg.com/236x/32/60/54/326054df712f51e8caf3819cee9b0253.jpg',
        description: 'Cutest thing ever'
      },
      {
        url: 'https://i.kinja-img.com/gawker-media/image/upload/s--GhnzKNzq--/c_fit,fl_progressive,q_80,w_636/18wggzydrz48njpg.jpg',
        description: 'cute donuts'
      },
    ];

    const renderer = TestUtils.createRenderer();
    renderer.render(<Gallery images={images} />);
    const result = renderer.getRenderOutput();

    expect(result.props.className).to.equal('gallery');

    const gallery = result.props.children;

    expect(images.length).to.equal(3);

    gallery.forEach(function(image, index) {
      expect(image.type.displayName).to.equal('Image');
      expect(Number(image.key)).to.equal(index);
    });
  });
});
