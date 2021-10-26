import React, { Component } from 'react';
import { toast } from 'react-toastify';
import SchedulePendingListFormCmp from '../../Component/SchedulePendingListCmp/SchedulePendingListFormCmp';

export class SchedulePendingListForm extends Component {
    state = {
        sdate: '',
        startTime: '',
        endTime: '',
    }


    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { sdate, startTime, endTime } = this.state;
        if (sdate && startTime && endTime) {
            const model = {
                stime: startTime + '-' + endTime,
                sdate: sdate,
            }
            this.props.rescheduleSubmit(model);
        } else if (!sdate) {
            toast.error('Please select Date!');
            return
        } else if (!startTime) {
            toast.error('Please Start Time!');
            return
        } else if (!endTime) {
            toast.error('Please End Time!');
            return
        }
    }

    render() {
        const { closeModal, currentDate, vcipDetails, spinner } = this.props;
        const { sdate, startTime, endTime } = this.state;
        const isDisabled = sdate && startTime && endTime;
        return (
            <>
                <SchedulePendingListFormCmp
                    isDisabled={isDisabled}
                    vcipDetails={vcipDetails}
                    currentDate={currentDate}
                    closeModal={closeModal}
                    spinner={spinner}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                />
            </>
        )
    }
}

export default SchedulePendingListForm
