import React, { Component } from 'react';
import Aux from '../../hoc'
import { connect } from 'react-redux';
import { UserListAction, PendingListAction, JoinStatusAction, JoinVideoAction } from '../../Store/Actions/DetailsAction'
import { Link } from 'react-router-dom';
import { CalendarComponent, TimePickerComponent } from '@syncfusion/ej2-react-calendars';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
const $ = window.$;

class PendingList extends Component {
    state = {
        intervalId: undefined,
        CalenderDateValue: "",
    }

    componentDidMount() {
        // window.location.reload(true);
        const userid = sessionStorage.getItem("userid");
        sessionStorage.removeItem("vcipid");
        sessionStorage.removeItem("videoconfsessionid");
        const $this = this.props.history;
        if (userid) {
            // this.props.UserListAction($this);
            this.props.PendingList($this);

            let intervalId = setInterval(() => {
                // this.props.UserListAction($this);
                this.props.PendingList($this);


            }, 7000);
            this.setState({ intervalId: intervalId });
        }


    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    joinCheck = (vcipid, videoconfsessionid) => {
        const $this = this.props.history;
        const model = {
            id: vcipid,
            videoconfsessionid: videoconfsessionid
        }
        this.props.JoinVideoAction($this, model);
    }

    CalenderDate = (event) => {
        this.setState({
            CalenderDateValue: event.target.value
        })
    }

    handleDateClick = (arg) => { // bind with an arrow function
        alert(arg.dateStr)
    }
    renderEventContent = (event) => {
        alert(event.timeText, event.event.title)
    }



    render() {

        // const dateValue = new Date("02/05/2021 10:30 AM");
        const minDate = new Date("02/05/2021 09:00 AM");
        const maxDate = new Date("02/06/2021 06:00 PM");
        console.log(this.props.InfoRdr.pendingList, 'pending')
        return (
            <Aux>
                <div className="container">
                    <div>
                    </div>
                    <div className="row justify-content-center mt-4">
                        <div className="col-md-10">
                            {this.props.InfoRdr.pendingList ? (
                                <div className="my-3 p-3 bg-white rounded shadow-sm">
                                    <h6 className="border-bottom border-gray pb-2 mb-0">
                                        PENDING LIST
                                        <span className="float-right">
                                            {/* {this.props.InfoRdr.pendingList} */}
                                            {console.log(this.props.InfoRdr.pendingList)}
                                        </span>
                                    </h6>
                                    {this.props.InfoRdr.pendingList?.map((res, i) => (res?.isscheduled === "0"
                                        ? <div className="media text-muted pt-3" key={i}>
                                            <svg className="bd-placeholder-img mr-2 rounded" width={32} height={32} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 32x32"><title>Placeholder</title><rect width="100%" height="100%" fill="#007bff" /><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg>
                                            <div className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                                                <div className="d-flex justify-content-between align-items-center w-100">
                                                    <strong className="text-gray-dark">{res.vcipid}</strong>
                                                    {res?.joinstatus === "1" ? (
                                                        <button className="btn btn-sm btn-primary" onClick={() => this.joinCheck(res.vcipid, res.videoconfsessionid)}>Join</button>
                                                    ) : (
                                                        "Completed"
                                                    )}
                                                </div>
                                                <span className="d-block">{res.lastsessionon}</span>
                                            </div>
                                        </div>
                                        : <div className={`media text-muted pt-3 scheduled ${res?.joinstatus === "1" ? 'scheduled1' : ''}`} key={i}>
                                            {/* <svg className="bd-placeholder-img mr-2 rounded-circle" width={32} height={32} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 32x32">
                                                <rect width="100%" height="100%" fill="#007bff" />
                                                <text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text>
                                            </svg> */}
                                            {console.log(res)}
                                            <div className="schedule-cal">
                                                <i className="far fa-calendar-alt"></i>
                                            </div>
                                            <div className="media-body pb-3 mb-0 small lh-125">
                                                <div className="d-flex justify-content-between align-items-center w-100">
                                                    <strong className="text-gray-dark">
                                                        {res.vcipid}
                                                        {/* <span className="small pl-1 ml-3">Scheduled Date : {res.createdon}</span> */}


                                                    </strong>
                                                    {console.log(this.state.CalenderDateValue)}
                                                    {/* {res?.joinstatus === "1"
                                                        ? <button className="btn btn-sm btn-primary" onClick={() => this.joinCheck(res.vcipid, res.videoconfsessionid)}>Join</button>
                                                        : <button className="btn btn-sm btn-danger " onClick={this.dateTime}>Scheduled
                                                        </button>
                                                    } */}
                                                    {/* <CalendarComponent placeholder="Choose a date and time"
                                                        value={this.state.CalenderDateValue}
                                                        onChange={this.CalenderDate}
                                                        // min={minDate}
                                                        // max={maxDate}
                                                        // format="dd-MMM-yy HH:mm"
                                                        // step={15}
                                                        >

                                                        </CalendarComponent>
                                                        <TimePickerComponent></TimePickerComponent> */}



                                                    {/* <div className="form-group">
                                                        <label className="reschedule-label">
                                                            <p>something</p>                                                                </label>
                                                        <input type="date"
                                                            name="sdate"
                                                            className="form-control reschedule-inp"
                                                            required />
                                                        <input type="time"
                                                            name="sdate"
                                                            className="form-control reschedule-inp"
                                                            required />
                                                        <input type="time"
                                                            name="sdate"
                                                            className="form-control reschedule-inp"
                                                            required />
                                                    </div> */}
                                                    {/* <div class="form-group pmd-textfield pmd-textfield-floating-label">
                                                        <label class="control-label" for="datetimepicker-default">Select Date and Time</label>
                                                        <input type="text" id="datetimepicker-default" class="form-control" />
                                                    </div> */}
                                                    {/* <FullCalendar
                                                        plugins={[dayGridPlugin, interactionPlugin]}
                                                        dateClick={this.handleDateClick}
                                                        eventContent={this.renderEventContent}
                                                    /> */}



                                                </div>

                                                <span className="d-block schedule-created">{res.lastsessionon}</span>
                                            </div>
                                        </div>
                                    ))}

                                </div>
                            ) : (null)}
                        </div>
                    </div>
                </div>


                <div className="modal fade custom-modal" id="join" data-backdrop="static" tabIndex={-1} role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header border-0">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">??</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="modal-data">
                                    {/* <img src="../images/success.svg" alt="no img" /> */}
                                    <h1 className="modal-data-title">
                                        Ready to take Video conferance with
                                        {this.props.InfoRdr.joinStatus?.vcipid}
                                    </h1>

                                    <div className="row justify-content-center">
                                        <div className="col-md-5">
                                            <div className="video-join">
                                                <div className="form-group position-relative">
                                                    <div className="video-join-box">
                                                        M
                                                    </div>
                                                </div>
                                                <div className="text-center">
                                                    <button type="button" className="custom-btn" onClick={this.join}>
                                                        Join Now
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <svg width="50px" height="50px" version="1.1" id="L3" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enableBackground="new 0 0 0 0" xmlSpace="preserve">
                                            <circle fill="none" stroke="#fff" strokeWidth={4} cx={50} cy={50} r={44} style={{ opacity: '0.5' }} />
                                            <circle fill="#fff" stroke="#e74c3c" strokeWidth={3} cx={8} cy={54} r={6}>
                                                <animateTransform attributeName="transform" dur="2s" type="rotate" from="0 50 48" to="360 50 52" repeatCount="indefinite" />
                                            </circle>
                                        </svg>
                                    </div>
                                    {/* <p className="modal-data-content">
                                            Please wait, We are taking you to the next step
                                    </p> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Aux>
        )
    }
}

const mapStateToProps = (state) => {
    const { InfoRdr } = state;
    return { InfoRdr }
}

const mapDispatchToProps = (dispatch) => {
    return {
        UserListAction: ($this) => dispatch(UserListAction($this)),
        PendingList: ($this) => dispatch(PendingListAction($this)),
        JoinStatusAction: () => dispatch(JoinStatusAction()),
        JoinVideoAction: ($this, id) => dispatch(JoinVideoAction($this, id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PendingList);



