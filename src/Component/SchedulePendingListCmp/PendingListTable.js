import React from 'react'

const PendingListTable = (props) => {
    return (
        <><table className="table">
            <thead className="thead-dark">
                <tr>
                    <th scope="col">S NO</th>
                    <th scope="col">VCIP ID</th>
                    <th scope="col">Pension ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
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
                        <td>{item.email}</td>
                        <td>{item.mobileno}</td>
                        <td>{item.createdon}</td>
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
                        <td colSpan={7} className="text-center">No list available</td>
                    </tr>}
            </tbody>
        </table>
        </>
    )
}

export default PendingListTable;
