import React from 'react'
import Aux from '../../../hoc';

const AttachmentInfo = (props) => {

    return (
        <Aux>
            <div className="info sr1 border-right-0 pb-0 pt-3 disabledButton">
                <div className="row m-0">
                    <div className="col-md-7 p-0">
                        <h2 className="info-title">
                            PAN OCR
                            {props.check ? (
                    
                    <span className="success"><i className="far fa-check-circle"></i><span className="text-danger ml-2">Feature Disabled</span></span>
                                
                                
                                ) :
                                (<span className="warning"><i className="far fa-question-circle" /><span className="text-danger ml-2">Feature Disabled</span></span>)}
                        </h2>
                        
                    </div>
                    <div className="col-md">
                        <div className="w-100 text-right">
                            <button className="custom-btn mt-0" onClick={props.save}>Save</button>
                        </div>
                    </div>
                </div>
                {props.panInfo.info.panstatus === "1" ? (
                    <div className="table-responsive">
                        <table className="table info-data mb-0">
                            <thead>
                                <tr>
                                    <th scope="col">Fields</th>
                                    <th scope="col">Orginal</th>
                                    <th scope="col">Edited</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.panInfo.info.pandetails.map((data, i) => (<Aux key={i}>
                                    <tr>
                                        <td>Name</td>
                                        <td>{data?.ainame}</td>
                                        <td>
                                            <div className="form-group position-relative mb-0 pb-0">
                                                <input type="text" name="edtname"
                                                    defaultValue={data.edtname} onChange={event => props.handleChange(i, event)}
                                                    className="pan-inp" />
                                                <span className="pan-edit"><i className="fas fa-pencil-alt" /></span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Fathers Name</td>
                                        <td>{data?.aifname}</td>
                                        <td>
                                            <div className="form-group position-relative mb-0 pb-0">
                                                <input type="text" name="edtfname"
                                                    defaultValue={data.edtfname} onChange={event => props.handleChange(i, event)}
                                                    className="pan-inp" />
                                                <span className="pan-edit"><i className="fas fa-pencil-alt" /></span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>DOB</td>
                                        <td>{data?.aidob}</td>
                                        <td>
                                            <div className="form-group position-relative mb-0 pb-0">
                                                <input type="text" name="edtdob"
                                                    defaultValue={data.edtdob} onChange={event => props.handleChange(i, event)}
                                                    className="pan-inp" />
                                                <span className="pan-edit"><i className="fas fa-pencil-alt" /></span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>PAN Number</td>
                                        <td>{data?.aipannumber}</td>
                                        <td>
                                            {data?.edtpannumber}
                                        </td>
                                        {/* <td>
                                            <div className="form-group position-relative mb-0 pb-0">
                                                <input type="text" name="edtpannumber"
                                                    defaultValue={data.edtpannumber} onChange={event => props.handleChange(i, event)}
                                                    className="pan-inp" />
                                                <span className="pan-edit"><i className="fas fa-pencil-alt" /></span>
                                            </div>
                                        </td> */}
                                    </tr>
                                    <tr>
                                        <td className="newPanData">NSDL PAN Status</td>
                                        <td className="newPanData">{data?.oemstatus === "VALID"
                                            ? <span className="text-success font-weight-bolder font-italic m-0">{data?.oemstatus}</span>
                                            : <span className="text-danger font-weight-bolder font-italic m-0">{data?.oemstatus}</span>
                                        }</td>
                                    </tr>
                                    <tr>
                                        <td className="newPanData">NSDL PAN Name</td>
                                        <td className="font-italic" className="newPanData">{data?.oemname}</td>
                                       
                                    </tr>
                                </Aux>))}
                            </tbody>
                        </table>
                    </div>) : (null)}
            </div>

        </Aux>
    )
}

export default AttachmentInfo;
