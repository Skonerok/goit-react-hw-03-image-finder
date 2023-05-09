import React, { Component } from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export class ImageGallery extends Component {
    handleGalleryItemClick = image => {
        this.props.onGalleryItemClick(image);
    }

    render() {
        const { images } = this.props;
        return (
            <ul className='gallery'>{images.map(image => (
                <ImageGalleryItem
                    key={image.id}
                    image={image}
                    onClick={this.handleGalleryItemClick}
                />
            ))}
            </ul>
        );
    }
}