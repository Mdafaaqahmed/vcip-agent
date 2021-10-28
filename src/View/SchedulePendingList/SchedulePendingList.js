import React, { Component } from 'react'
import { connect } from 'react-redux';
import PendingListModalCmp from '../../Component/SchedulePendingListCmp/PendingListModalCmp';
import PendingListTable from '../../Component/SchedulePendingListCmp/PendingListTable';
import Modal from '../../Portal/Modal';
import { CancelVCIPSchedule, CreateScheduleByAgentAction, GetCalenderAction, GetLanguagesAction, GetVCIPScheduleList, GetVCIPSchedulePendingList } from '../../Store/Actions/ScheduleListAction';
import CancelVCIPModal from './CancelVCIPModal';
import SchedulePendingListForm from './SchedulePendingListForm';
const $ = window.$;

export class SchedulePendingList extends Component {

    state = {
        spinner: false,
        loader: false,
        isOpen: false,
        isCancelModalOpened: false,
        vcipDetails: {},
        cancelVcipDetails: {},
        currentDate: '',
        startDate: '',
        endDate: '',
    }

    componentDidMount() {
        let d = new Date();
        const dt = d.toLocaleDateString().split("/");
        const currDate = dt[2] + "-" + dt[1] + "-" + dt[0];
        this.setState({
            loader: true,
            currentDate: currDate
        })
        this.props.GetVCIPSchedulePendingList(this);
        this.props.GetVCIPScheduleList(this);
    }

    showScheduleModal = (vcipData) => {
        this.setState({
            isOpen: true,
            vcipDetails: vcipData
        });
    }

    showCancelModal = (vcipData) => {
        this.setState({
            isCancelModalOpened: true,
            cancelVcipDetails: vcipData
        });
    }

    closeModal = () => {
        this.setState({
            isOpen: false,
            vcipDetails: {}
        })
    }

    closeCancelModal = () => {
        this.setState({
            isCancelModalOpened: false,
            cancelVcipDetails: {}
        })
    }

    rescheduleSubmit = (data) => {
        this.setState({ spinner: true });
        const { vcipDetails } = this.state;
        const model = {
            vcipid: vcipDetails?.vcipid,
            stime: data?.stime,
            sdate: data?.sdate,
        };
        this.props.CreateScheduleByAgentAction(model, this);
    }

    cancelScheduleVCIPID = (event) => {
        event.preventDefault();
        this.setState({ spinner: true });
        const { cancelVcipDetails } = this.state;
        const model = {
            vcipid: cancelVcipDetails?.vcipid,
        };
        this.props.CancelVCIPSchedule(model, this);
    }

    // formateDate = (val) => {
    //     const oldDate = val;
    //     let newDate = oldDate?.split("-").reverse().join("-");
    //     return newDate;
    // }

    // onSelectLang = (event) => {
    //     const vcipId = this.state.vcipDetails?.vcipid;
    //     const langId = event.target.value;
    //     this.props.GetCalenderAction(vcipId, langId);
    // }


    render() {
        const { pendingList, scheduleList, languagesList, calenderDetails } = this.props.ScheduleReducer;
        const { isOpen, vcipDetails, currentDate, isCancelModalOpened, cancelVcipDetails } = this.state;
        
        return (
            <>
                {/* {this.state.loader ? (
                    <div className="loader">
                        <svg width="100px" height="100px" version="1.1" id="L3" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enableBackground="new 0 0 0 0" xmlSpace="preserve">
                            <circle fill="none" stroke="#fff" strokeWidth={4} cx={50} cy={50} r={44} style={{ opacity: '0.5' }} />
                            <circle fill="#fff" stroke="#e74c3c" strokeWidth={3} cx={8} cy={54} r={6}>
                                <animateTransform attributeName="transform" dur="2s" type="rotate" from="0 50 48" to="360 50 52" repeatCount="indefinite" />
                            </circle>
                        </svg>
                    </div>)
                    : null
                } */}
                <div className="container">
                    <div className="vpl-main">
                        <div className="row">
                            <div className="col-12">
                                <div>
                                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                        <li className="nav-item">
                                            <a className="nav-link active" id="pendinglist-tab" data-toggle="pill" href="#pendinglist" role="tab" aria-controls="pills-home" aria-selected="true">
                                                Unscheduled List
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" id="activeList-tab" data-toggle="pill" href="#activeList" role="tab" aria-controls="pills-profile" aria-selected="false">
                                                Scheduled List
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="tab-content" id="pills-tabContent">
                                        <div className="tab-pane fade show active" id="pendinglist" role="tabpanel" aria-labelledby="pendinglist-tab">
                                            <PendingListTable
                                                pendingList={pendingList}
                                                showScheduleModal={this.showScheduleModal}
                                                isScheduled={false}
                                            />
                                        </div>
                                        <div className="tab-pane fade" id="activeList" role="tabpanel" aria-labelledby="activeList-tab">
                                            <PendingListTable
                                                pendingList={scheduleList}
                                                showScheduleModal={this.showCancelModal}
                                                isScheduled={true}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <PendingListModalCmp />
                <Modal isOpen={isOpen}>
                    <SchedulePendingListForm
                        vcipDetails={vcipDetails}
                        currentDate={currentDate}
                        closeModal={this.closeModal}
                        rescheduleSubmit={this.rescheduleSubmit}
                    />
                </Modal>
                <Modal isOpen={isCancelModalOpened}>
                    <CancelVCIPModal
                        vcipid={cancelVcipDetails?.vcipid}
                        closeCancelModal={this.closeCancelModal}
                        cancelScheduleVCIPID={this.cancelScheduleVCIPID}
                    />
                </Modal>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    const { ScheduleReducer } = state;
    return { ScheduleReducer }
}

const mapDispatchToProps = (dispatch) => {
    return {
        GetVCIPSchedulePendingList: ($this) => dispatch(GetVCIPSchedulePendingList($this)),
        CreateScheduleByAgentAction: (model, $this) => dispatch(CreateScheduleByAgentAction(model, $this)),
        GetVCIPScheduleList: ($this) => dispatch(GetVCIPScheduleList($this)),
        CancelVCIPSchedule: (model, $this) => dispatch(CancelVCIPSchedule(model, $this)),
        // GetCalenderAction: (vcipId, langId) => dispatch(GetCalenderAction(vcipId, langId)),
        // GetCalenderAction: (vcipId, langId) => dispatch(GetCalenderAction(vcipId, langId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SchedulePendingList);
