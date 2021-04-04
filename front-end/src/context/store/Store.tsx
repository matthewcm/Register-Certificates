import React, {createContext, Dispatch, useReducer, useState} from 'react'
import {Certificate} from "../../core/entities/Certificate";
import {
    certificateReducer,
    CertificateActions,
    pageReducer,
    ArtistActions, artistReducer, PageActions, Page,
} from "../reducers/reducers";
import {Artist} from "../../core/entities/Artist";

type InitialStateType = {
    certificates: Certificate[]
    artists: Artist[],
    page: Page
}
const initialState:InitialStateType = {
    certificates: [],
    artists: [],
    page: {
        currentPage: 0,
        totalPages: 1,
        pageSize: 2
    }
}

const Store = createContext<{
    state: InitialStateType;
    dispatch: Dispatch<CertificateActions | ArtistActions>
}
    >({
    state: initialState,
    dispatch: () => null
})

export const mainReducer = (
    {certificates, artists, page}: InitialStateType,
    action: CertificateActions | ArtistActions | PageActions
):InitialStateType => ({
    certificates: certificateReducer(certificates, action as CertificateActions ),
    artists: artistReducer(artists, action as ArtistActions),
    page: pageReducer(page, action as PageActions),
})

type Props = {
    children: React.ReactNode
}
const StoreProvider = ({ children}:Props) => {
    const [state, dispatch] = useReducer(mainReducer, initialState)

    return (
        <Store.Provider value={{state, dispatch}}>
            {children}
        </Store.Provider>

    )
}

export {StoreProvider, Store}

