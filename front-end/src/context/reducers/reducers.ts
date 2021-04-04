import {Certificate} from "../../core/entities/Certificate";
import {Artist} from "../../core/entities/Artist";


type ActionMap<M extends { [index: string]: any }> = {
    [Key in keyof M]: M[Key] extends undefined
        ? {
            type: Key;
        }
        : {
            type: Key;
            payload: M[Key];
        }
};

export enum Types {
    UpdateCertificate = 'UPDATE_CERTIFICATE',
    CreateCertificate = 'CREATE_CERTIFICATE',
    DeleteCertificate = 'DELETE_CERTIFICATE',
    ModifyCertificate = 'MODIFY_CERTIFICATE',
    CreateArtist = 'CREATE_ARTIST',
    UpdateArtists = 'UPDATE_ARTISTS',
    SetPage= 'SET_PAGE',
    UpdateCertificatePages = 'UPDATE_CERTIFICATE_PAGES',
    SetSortBy = 'SET_SORT_BY',
    SetPageSize = 'SET_PAGE_SIZE',
}


type CertificatePayload = {
    [Types.UpdateCertificate]: Certificate[]
    [Types.CreateCertificate] : Certificate
    [Types.DeleteCertificate]: {
        id: string;
    }
    [Types.ModifyCertificate]: Certificate
}

export type CertificateActions = ActionMap<CertificatePayload>[keyof ActionMap<CertificatePayload>];

export const certificateReducer = (state: Certificate[], action: CertificateActions) => {
    switch (action.type) {
        case Types.UpdateCertificate:
            return action.payload

        case Types.CreateCertificate:
            return  [...state, action.payload]

        case Types.DeleteCertificate:
            return  state.filter(
                (certificate) => certificate.id !== action.payload.id
            )

        case Types.ModifyCertificate:
            return  state.map(
                (certificate) => {
                    if (certificate.id === action.payload.id) {
                        return new Certificate(action.payload)
                    }
                    return certificate
                }
            )
        default:
            return state

    }
}

type ArtistPayload = {
    [Types.UpdateArtists]: Artist[]
    [Types.CreateArtist] : Artist
}

export type ArtistActions = ActionMap<ArtistPayload>[keyof ActionMap<ArtistPayload>];

export const artistReducer= (state: Artist[], action:ArtistActions) => {
    switch (action.type) {
        case Types.UpdateArtists:
            return action.payload
        case Types.CreateArtist:
            return [...state, action.payload]

        default:
            return state

    }
}

type PagePayload = {
    [Types.SetPage]: number
    [Types.SetPageSize]: number
    [Types.SetSortBy]: {
        sort: string,
        label:string
    }
    [Types.UpdateCertificatePages]: number
}

export type Page = {
    currentPage: number,
    totalPages: number,
    sortBy?: {
        sort: string,
        label: string
    },
    pageSize: number,
}

export type PageActions = ActionMap<PagePayload>[keyof ActionMap<PagePayload>];

export const pageReducer= (state: Page, action: PageActions) => {
    switch (action.type) {
        case Types.SetPage:
            return {...state, currentPage: action.payload}
        case Types.SetPageSize:
            return {...state, pageSize: action.payload}
        case Types.SetSortBy:
            return {...state, sortBy: action.payload}
        case Types.UpdateCertificatePages:
            return {...state, totalPages: action.payload}
        default:
            return state

    }
}

