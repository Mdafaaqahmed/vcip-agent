import React from 'react'

const ScheduleListTable = (props) => {
    console.log(props.pendingList)
    return (
        <div className="table-responsive">
            <table className="table">
            <thead className="thead-dark">
                <tr>
                    <th scope="col">S NO</th>
                    <th scope="col">VCIP ID</th>
                    <th scope="col">Pension ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Slot Date</th>
                    <th scope="col">Slot Time</th>
                    <th scope="col">Mobile</th>
                    <th scope="col">Created Date</th>
                    {/* <th scope="col">Location</th> */}
                    <th scope="col">{props.isScheduled ? 'Reschedule' : 'Schedule'}</th>
                </tr>
            </thead>
            <tbody>
                {props.pendingList && props.pendingList.length > 0
                    ? props.pendingList.map((item, i) => (<tr key={i}>
                        <th scope="row">{i + 1}</th>
                        <td>{item.vcipid}</td>
                        <td>{item.ppoid}</td>
                        <td>{item.name}</td>
                        <td className="ws-nowrap">{item.sdate}</td>
                        <td className="ws-nowrap">{item.stime}</td>
                        <td>{item.mobileno}</td>
                        <td className="ws-nowrap">{item.createdon}</td>
                        {/* <td>{item.customerloc}</td> */}
                        <td>
                            {props.isScheduled 
                            ? <button className="vpl-tbl-btn vpl-tbl-btn-cancel" title="Schedule" onClick={() => props.showScheduleModal(item)}>
                                <i className="fas fa-times-circle"></i>
                                <span>Cancel</span>
                                </button> 
                            : <button className="vpl-tbl-btn" title="Schedule" onClick={() => props.showScheduleModal(item)}><i className="far fa-calendar-alt"></i></button>}
                            
                        </td>
                    </tr>))
                    : <tr>
                        <td colSpan={9} className="text-center">No list available</td>
                    </tr>}
            </tbody>
        </table>
        </div>
    )
}

export default ScheduleListTable;
