import React from 'react';

const SchedulePendingListFormCmp = (props) => {
    return (
        <form onSubmit={props.handleSubmit} id="form" autoComplete="off">
                <h3 className="text-center mb-4">Reschedule</h3>
            <div className="row">
                <div className="col-md-6">
                    <div className="d-grp">
                        <label className="d-label">VCIP</label>
                        <input
                            type="text"
                            name="vcipid"
                            defaultValue={props.vcipDetails?.vcipid}
                            disabled readOnly
                            className={`d-inp`}
                            placeholder="VCIP"
                            required />
                    </div>
                </div>
                {/* <div className="col-md-6">
                    <div className="d-grp">
                        <label className="d-label">Select Language</label>
                        <select
                            name="langid"
                            className="d-inp"
                            onChange={props.onSelectLang}
                            defaultValue="DEFAULT"
                            required>
                            <option value={'DEFAULT'} disabled>
                                Select Language
                            </option>
                            {props.languagesList.length !== 0 ? props.languagesList.map((res, index) => (
                                <option value={res.langid} key={index}>{res.lang}</option>
                            )) : null}
                        </select>
                    </div>
                </div> */}
                <div className="col-md-6">
                    <div className="d-grp">
                        <label className="d-label">Select Date</label>
                        <input type="date"
                            name="sdate"
                            //  min="2020-06-18" max="2020-06-20"
                            min={props.currentDate}
                            onChange={props.handleChange}
                            className="d-inp"
                            required />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="d-grp">
                        <label className="d-label">Start Time</label>
                        <input type="time"
                            name="startTime"
                            min={props.currentDate}
                            onChange={props.handleChange}
                            className="d-inp"
                            required />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="d-grp">
                        <label className="d-label">End Time</label>
                        <input type="time"
                            name="endTime"
                            min={props.currentDate}
                            onChange={props.handleChange}
                            className="d-inp"
                            required />
                    </div>
                </div>
                {/* <div className="col-md-6">
                    <div className="d-grp">
                        <label className="d-label">Select Time</label>
                        <select
                            name=""
                            className="d-inp"
                            onChange={props.handleChange}
                            defaultValue="DEFAULT"
                            required>
                            <option value={'DEFAULT'} disabled>Select Time</option>
                            {props.calenderDetails ? props.calenderDetails?.stimes?.map((res, index) => (
                                <option key={index}>{res}</option>
                            )) : null}
                        </select>
                    </div>
                </div> */}
            </div>
            <div className="text-left mb">
                <button type="button" onClick={props.closeModal} className="btn btn-secondary mx-1" style={{ width: '70px', backgroundColor: 'grey' }}>Cancel</button>
                <button type="submit" className="d-btn" disabled={!props.isDisabled}>
                    Submit
                    {props.spinner ? <span className="spinner"></span> : null}
                </button>
            </div>
        </form>
    )
}

export default SchedulePendingListFormCmp;
