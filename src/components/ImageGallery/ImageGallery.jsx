import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

// function ImageGallery({images, selectedImage}) {
//         return (
//             <ul className='gallery'>{images.map(({id, webformatURL, tags, largeImageURL }) => (
//                 <ImageGalleryItem
//                     key={id}
//                     imgPreview={webformatURL}
//                     tags={tags}
//                     selectedImage={() => selectedImage(largeImageURL, tags)}
//                 />
//             ))}
//             </ul>
//         );
// };

function ImageGallery({images, onClick}) {
  return (
    <ul className={css.gallery}>
      {
        images.map((image, id) => {
          return <ImageGalleryItem key={id} image={image} onClick={onClick} />;
        })}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
  onClick: PropTypes.func,
};

export default ImageGallery;
