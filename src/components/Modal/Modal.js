import PropTypes from 'prop-types';
import s from './Modal.module.css';

import { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onToggleModal();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onToggleModal();
    }
  };

  render() {
    const { largeImageURL } = this.props;

    return createPortal(
      <div className={s.backdrop} onClick={this.handleBackdropClick}>
        <div className={s.modal}>
          <img src={largeImageURL} alt="" />
        </div>
      </div>,
      modalRoot,
    );
  }
}

{
  /* <div className="Overlay">
  <div className="Modal">
    <img src="" alt="" />
  </div>
</div> */
}

Modal.propTypes = {
  onToggleModal: PropTypes.func.isRequired,
};

export default Modal;
