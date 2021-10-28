import * as actionTypes from './types';
import { toast } from 'react-toastify';
import Axios from '../../hoc/axios';
import AES256 from 'aes-everywhere';
import base64 from 'react-native-base64';
const $ = window.$;

const parsingData = (data) => {
    var passphrase = process.env.REACT_APP_API_KEY;
    let val1 = passphrase.substr(0, 4);
    let val2 = passphrase.substr(passphrase.length, 4);
    let updatedValue = val1 + passphrase + val2;
    const finalvalue = base64.encode(updatedValue).substr(0, 32);
    const encrypted = AES256.encrypt(JSON.stringify(data), finalvalue);
    return encrypted;
}

const extractData = (data) => {
    var passphrase = process.env.REACT_APP_API_KEY;
    let val1 = passphrase.substr(0, 4);
    let val2 = passphrase.substr(passphrase.length, 4);
    let updatedValue = val1 + passphrase + val2;
    const finalvalue = base64.encode(updatedValue).substr(0, 32);
    const decrypted = JSON.parse(AES256.decrypt(data, finalvalue));
    return decrypted;
}

// GET SCHEDULE PEDING LIST
export const GetVCIPSchedulePendingList = ($this) => {
    return (dispatch) => {
        const URL = "GetVCIPSchedulePendingList";
        const body = {
            slk: process.env.REACT_APP_SLK_KEY,
            userid: sessionStorage.getItem("userid")
            // userid: "14"
        }
        Axios.post(URL, parsingData(body))
            .then((res) => {
                var resp = extractData(res.data);
                $this.setState({
                    loader: false,
                });
                dispatch({
                    type: actionTypes.PENDINGLIST,
                    payload: resp?.vciplist
                });
            })
            .catch((err) => {
                $this.setState({
                    loader: false,
                });
                toast.error("err");
            })
    }
}

// GET SCHEDULE LIST
export const GetVCIPScheduleList = ($this) => {
    return (dispatch) => {
        const URL = "GetScheduledVCIPList";
        const body = {
            slk: process.env.REACT_APP_SLK_KEY,
            userid: sessionStorage.getItem("userid")
        }
        Axios.post(URL, parsingData(body))
            .then((res) => {
                var resp = extractData(res.data);
                $this.setState({
                    loader: false,
                });
                if (resp.respcode === "200") {
                    dispatch({
                        type: actionTypes.SCHEDULELIST,
                        payload: resp?.vciplist
                    });
                } else {
                    dispatch({
                        type: actionTypes.SCHEDULELIST,
                        payload: []
                    });
                }
            })
            .catch((err) => {
                $this.setState({
                    loader: false,
                });
                toast.error("err");
            })
    }
}

// GET CANCEL SCHEDULE LIST
export const CancelVCIPSchedule = (model, $this) => {
    return (dispatch) => {
        const URL = "cancelvideocallschedule";
        const body = {
            slk: process.env.REACT_APP_SLK_KEY,
            userid: sessionStorage.getItem("userid"),
            vcipid: model?.vcipid
        }
        Axios.post(URL, parsingData(body))
            .then((res) => {
                var resp = extractData(res.data);
                $this.setState({
                    spinner: false,
                });
                if (resp.respcode === "200") {
                    toast.success(resp.respdesc);
                    $this.setState({
                        isCancelModalOpened: false
                    });
                    dispatch(GetVCIPScheduleList($this));
                } else {
                    toast.warn(resp.respdesc);
                }
            })
            .catch((err) => {
                $this.setState({
                    spinner: false,
                });
                toast.error("err");
            })
    }
}

// GET LANGUAGES
export const GetLanguagesAction = () => {
    return (dispatch) => {
        const URL = "GetLanguages";
        const body = {
            slk: "JRFHK-EBCWQ-VUKGC-HGUKS",
            // vcipid: sessionStorage.getItem("vcipid"),
            userid: "0"
        }
        Axios.post(URL, parsingData(body))
            .then((res) => {
                var resp = extractData(res.data);
                if (resp.respcode === "200") {
                    dispatch({
                        type: actionTypes.LANGAUGESLIST,
                        payload: resp.languages
                    });
                } else {
                    toast.warn(resp.respdesc);
                }
            })
            .catch((err) => {
                const val = JSON.stringify(err);
                toast.error(JSON.parse(val).message);
            })
    }
}

// GetVideoCallScheduleCalender
export const GetCalenderAction = (vcipId, langId) => {
    return (dispatch) => {
        const URL = "GetVideoCallScheduleCalender";
        const body = {
            slk: process.env.REACT_APP_SLK_KEY,
            vcipid: vcipId,
            langid: langId
        }
        Axios.post(URL, parsingData(body))
            .then((res) => {
                var resp = extractData(res.data);
                if (resp.respcode === "200") {
                    const model = {
                        sfdate: resp.sfdate,
                        stdate: resp.stdate,
                        stimes: resp.stimes
                    };
                    dispatch({
                        type: actionTypes.CALENDER,
                        payload: model
                    });
                } else {
                    toast.warn(resp.respdesc);
                }
            })
            .catch(err => {
                const val = JSON.stringify(err);
                toast.error(JSON.parse(val).message);
            })
    }
}

// CreateVideoCallSchedule
export const CreateScheduleByAgentAction = (model, $this) => {
    return (dispatch) => {
        const URL = "CreateVideoCallScheduleByAgent";
        const body = {
            slk: process.env.REACT_APP_SLK_KEY,
            vcipid: model?.vcipid,
            langid: "3",
            stime: model?.stime,
            sdate: model?.sdate,
            userid: sessionStorage.getItem("userid")
        }
        Axios.post(URL, parsingData(body))
            .then((res) => {
                var resp = extractData(res.data);
                $this.setState({
                    spinner: false,
                });
                if (resp.respcode === "200") {
                    toast.success(resp.respdesc);
                    $this.setState({
                        isOpen: false
                    });
                    dispatch(GetVCIPSchedulePendingList($this));
                } else {
                    toast.warn(resp.respdesc);
                }
            })
            .catch(err => {
                const val = JSON.stringify(err);
                toast.error(JSON.parse(val).message);
                $this.setState({
                    spinner: false,
                });
            })
    }
}