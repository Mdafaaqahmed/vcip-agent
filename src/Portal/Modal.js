import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
const $ = window.$;

const Modal = ({ message, isOpen, onClose, confirmBtn, children }) => {
    useEffect(() => {
        isOpen ? $('#portalModal').modal('show') : $('#portalModal').modal('hide');
    }, [])
    const element = document.getElementById("modal");
    const customTag = isOpen ? <>
        <div className={`modal fade ${isOpen && ' show'}`}
            id="portalModal"
            tabIndex={-1}
            data-keyboard="false"
            data-backdrop="static"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            style={{ display: 'block' }}
            aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered  modal-dialog-scrollable" role="document">
                <div className="modal-content modal-form">
                    <div className="modal-body">
                        {children}
                    </div>
                </div>
            </div>
        </div>
        <div className="modal-backdrop fade show"></div>
    </> : null
    return createPortal(customTag, element);
}

export default Modal;
