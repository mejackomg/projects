
import fetch from 'isomorphic-fetch';
//const rawData = '../../data/20151001_hundenamen.json';

export const SetData_BarChart_1 = 'SetData_BarChart_1';


export function setRaw(data) {
    return {
        type: SetData_BarChart_1,
        data,
    };
}

export function getRaw(rawData) {
    return dispatch => {
        return fetch(rawData)
            .then(response => response.json())
            .then(json => {
                return dispatch(setRaw(json));
            });
    };
}