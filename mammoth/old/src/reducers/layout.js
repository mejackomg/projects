/**
 * Created by apple-pc on 16/4/4.
 */

'use strict';
import {
    PANEL_VISIBLE,
} from '../actions/layout';

//import { loadUserProfile } from '../utils/utils';

const initialState = {
    panelVisible: localStorage.getItem('navDrawerOpen')==='true',
};

export function layoutReducer(state = initialState, action) {
    switch (action.type) {
        case PANEL_VISIBLE:
            return Object.assign({}, state, {
                panelVisible: action.visible
            });
        default:
            return state;
    }
}


