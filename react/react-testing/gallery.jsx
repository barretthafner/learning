import React from 'react';

import Image from './image';

export const Gallery = React.createClass({
  render() {
    const images = this.props.images.map(function(image, index) {
        return <Image url={image.url} description={image.description} key={index}/>;
    });

    return (
        <div className="gallery">{images}</div>
    );
  }
});
