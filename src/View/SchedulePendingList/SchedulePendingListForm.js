import React, { Component } from 'react';
import { toast } from 'react-toastify';
import SchedulePendingListFormCmp from '../../Component/SchedulePendingListCmp/SchedulePendingListFormCmp';

export class SchedulePendingListForm extends Component {
    state = {
        sdate: '',
        startTime: '',
        endTime: '',
        error: {
            isSTError: false,
            isETError: false,
        }
    }


    handleChange = (event) => {
        const { name, value } = event.target;
        const { startTime, endTime } = this.state;
        this.setState({ [name]: value });
        if (name === 'endTime' && startTime) {
            const sTime = parseFloat(startTime.split(':').join('.'));
            const eTime = parseFloat(value.split(':').join('.'));
            const diffTime = eTime - sTime;
            let isValidTime = true;
            if (diffTime > 0 && diffTime < 1.30) {
                isValidTime = false;
            }
            this.setState(preState =>({ 
                ...preState,
                error: {
                    isETError: isValidTime
                }
             }));
        } else if (name === 'startTime' && endTime) {
            const sTime2 = parseFloat(endTime.split(':').join('.'));
            const eTime2 = parseFloat(value.split(':').join('.'));
            const diffTime2 = sTime2 - eTime2;
            let isValidTime2 = true;
            if (diffTime2 > 0 && diffTime2 < 1.30) {
                isValidTime2 = false;
            }
            this.setState(preState =>({ 
                ...preState,
                error: {
                    isETError: isValidTime2
                }
             }));
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { sdate, startTime, endTime, error } = this.state;
        if (sdate && startTime && endTime && !error.isSTError && !error.isETError) {
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
        const { sdate, startTime, endTime, error } = this.state;
        const isDisabled = sdate && startTime && endTime && !error.isSTError && !error.isETError;
        return (
            <>
                <SchedulePendingListFormCmp
                    startTime={startTime}
                    isDisabled={isDisabled}
                    error={error}
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
