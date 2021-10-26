import * as actionTypes from '../Actions/types';

const INITIAL = {
    info: {},
    time: {},
    questions: [],
    singleQuestion: [],
    userList: {},
    pendingList: [],
    joinStatus: undefined,
    wh: {},
    // location: {},
}

const InfoRdr = (state = INITIAL, action) => {
    switch (action.type) {

        case actionTypes.RESET:
            return { ...state, 
                joinStatus: action.payload,
                singleQuestion: [] 
            }

        case actionTypes.ALLINFO:
            return { ...state, info: action.payload }

        case actionTypes.TIME:
            return { ...state, time: action.payload }

        case actionTypes.QUESTIONS:
            return { ...state, questions: action.payload }

        case actionTypes.SINGLEQUESTION:
            {/* // {Buffer.from(qtn.ques, "base64").toString()} */}

            const newSate = state.questions?.filter(result => result.sno === action.payload)
            return { ...state, singleQuestion: newSate }

        case actionTypes.USERS:
            return { ...state, userList: action.payload }
            
        case actionTypes.PENDINGLIST:
            return { ...state, pendingList: action.payload }

        case actionTypes.JOINSTATUS:
            return { ...state, joinStatus: action.payload }

        case actionTypes.WIDTHHEIGHT:
            return { ...state, wh: action.payload }

        // case actionTypes.LOCATION:
        //     return { ...state, location: action.payload }

        default:
            return state;
    }

}

export default InfoRdr;