const Modal = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="modal show d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            {title && (
              <div className="modal-header">
                <h5 className="modal-title text-danger">{title}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={onClose}
                ></button>
              </div>
            )}
            <div className="modal-body">{children}</div>
            {footer && <div className="modal-footer">{footer}</div>}
          </div>
        </div>
      </div>
      <div className="modal-backdrop show" onClick={onClose}></div>
    </>
  );
};

export default Modal;
