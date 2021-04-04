import {Types} from "../reducers/reducers";

export const changePage = async (dispatch: any, page:number) => {
    try {
        dispatch({type: Types.SetPage, payload: page})
    } catch (e) {
        console.error(e)
    }
}

export const changePageSize = async (dispatch: any, size:number) => {
    try {
        dispatch({type: Types.SetPageSize, payload: size})
    } catch (e) {
        console.error(e)
    }
}

export const changeSort = async (dispatch: any , sort?: string, label: string = "Unsorted") => {
    try {
        dispatch({type: Types.SetSortBy, payload: {
            sort,
            label
        }})
    } catch (e) {
        console.error(e)
    }
}

