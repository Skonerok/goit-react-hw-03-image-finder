

export const ImageGalleryItem = ({ image, onClick }) => {
    const { webFormatURL, tags } = image;
    return (
        <li className="gallery-item">
            <img
                src={webFormatURL}
                alt={tags}
                onClick={() => onClick(image)}
            />
        </li>
    );
};