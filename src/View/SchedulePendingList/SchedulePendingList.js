import React, { Component } from 'react'
import { connect } from 'react-redux';
import PendingListModalCmp from '../../Component/SchedulePendingListCmp/PendingListModalCmp';
import PendingListTable from '../../Component/SchedulePendingListCmp/PendingListTable';
import Modal from '../../Portal/Modal';
import { CreateScheduleByAgentAction, GetCalenderAction, GetLanguagesAction, GetVCIPSchedulePendingList } from '../../Store/Actions/ScheduleListAction';
import SchedulePendingListForm from './SchedulePendingListForm';
const $ = window.$;

export class SchedulePendingList extends Component {

    state = {
        spinner: false,
        loader: false,
        isOpen: false,
        vcipDetails: {},
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
        // this.props.GetLanguagesAction();
    }

    showScheduleModal = (vcipData) => {
        this.setState({
            isOpen: true,
            vcipDetails: vcipData
        });
    }

    closeModal = () => {
        this.setState({
            isOpen: false
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
        const { pendingList, languagesList, calenderDetails } = this.props.ScheduleReducer;
        const { isOpen, vcipDetails, currentDate } = this.state;
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
                                            />
                                        </div>
                                        <div className="tab-pane fade" id="activeList" role="tabpanel" aria-labelledby="activeList-tab">
                                            Coming soon...
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
        // GetLanguagesAction: () => dispatch(GetLanguagesAction()),
        // GetCalenderAction: (vcipId, langId) => dispatch(GetCalenderAction(vcipId, langId)),
        // GetCalenderAction: (vcipId, langId) => dispatch(GetCalenderAction(vcipId, langId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SchedulePendingList);
