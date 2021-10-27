import React from 'react';

const CancelVCIPModal = (props) => {
    return (
        <form id="form" autoComplete="off">
                <h3 className="text-center mb-4">Are you sure you want cancel this VCIP ID: {props.vcipid} schedule?</h3>
            <div className="text-left mb">
                <button type="button" onClick={props.closeCancelModal} className="btn btn-secondary mx-1" style={{ width: '70px', backgroundColor: 'grey' }}>No</button>
                <button type="button" onClick={props.cancelScheduleVCIPID} className="d-btn">
                    Yes
                    {props.spinner ? <span className="spinner"></span> : null}
                </button>
            </div>
        </form>
    )
}

export default CancelVCIPModal;
