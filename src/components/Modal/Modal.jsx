import React, { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {

    componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown)
    };

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown)
    };

    handleKeyDown = (e) => {
        if (e.code === 'Escape') {
            this.props.onClose();
        }
    };

    handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            this.props.onClose();
        }
    };

    render() {
        const { largeImageURL, tags } = this.props.image;
        return createPortal(
            <div className='overlay' onClick={this.handleBackdropClick}>
                <div className='modal'>
                    <img src={largeImageURL} alt={tags} />
                </div>
            </div>,
            modalRoot,
        );
    };
};