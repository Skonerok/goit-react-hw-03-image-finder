import PropTypes from 'prop-types';
import css from './Button.module.css';

const Button = ({ btnLoadMore }) => {
    return (
        <button type='button' className={css.loadMoreBtn} onClick={btnLoadMore}>Load more</button>
    );
};

Button.propTypes = {
  btnLoadMore: PropTypes.func,
};

export default Button;
