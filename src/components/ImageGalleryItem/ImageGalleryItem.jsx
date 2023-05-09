import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

// function ImageGalleryItem({ imgPreview, tags, selectedImage }) {
//     return (
//         <li className="gallery-item">
//             <img
//                 src={imgPreview}
//                 alt={tags}
//                 onClick={selectedImage}
//             />
//         </li>
//     );
// };

const ImageGalleryItem = ({ image, onClick }) => {
  const { webformatURL, tags, largeImageURL } = image;
  return (
    <li className={css.gallery__item}>
      <img
        src={webformatURL}
        alt={tags}
        onClick={() => onClick(largeImageURL)}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  onClick: PropTypes.func,
};

export default ImageGalleryItem;
