import React from 'react'

const PendingListModalCmp = (props) => {
    return (
        <div className="modal fade custom-modal" id="vpl-modal" data-backdrop="static" tabIndex={-1} role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header border-0">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="modal-data">
                            <img className="w-75" src={''} alt="no img" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PendingListModalCmp;
