/**
 * Created by apple-pc on 16/4/4.
 */

'use strict';
import {
    SetData_BarChart_1,
} from '../actions/chartData';

//import { loadUserProfile } from '../utils/utils';

const initialState = {
    data: [],//new Set(['m', 'w']),
};

export function dataReducer(state = initialState, action) {
    switch (action.type) {
        case SetData_BarChart_1:
            return Object.assign({}, state, {
                data: action.data
            });
        default:
            return state;
    }
}


