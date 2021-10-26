import * as actionTypes from '../Actions/types';

const INITIAL = {
    pendingList: [],
    languagesList: [],
    calenderDetails: {},
}

const ScheduleReducer = (state = INITIAL, action) => {
    switch (action.type) {

        case actionTypes.RESET:
            return {
                ...state,
                singleQuestion: [],
                calenderDetails: {},
            }

        case actionTypes.PENDINGLIST:
            return { ...state, pendingList: action.payload }

        case actionTypes.LANGAUGESLIST:
            return { ...state, languagesList: action.payload }

        case actionTypes.CALENDER:
            return { ...state, calenderDetails: action.payload }

        default:
            return state;
    }

}

export default ScheduleReducer;