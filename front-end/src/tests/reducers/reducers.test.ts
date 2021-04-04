import {
    PageActions,
    pageReducer,
    CertificateActions,
    certificateReducer,
    Types
} from "../../context/reducers/reducers";
import { Artist } from "../../core/entities/Artist";
import {Certificate} from "../../core/entities/Certificate";
import * as dayjs from "dayjs";
import {mainReducer} from "../../context/store/Store";

// ARTISTS
it('Updates Artists for update type', () => {
    const initialState = {
        artists: [],
        certificates: []
    }

    const artists =  [new Artist({firstname: "test"}),new Artist({firstname: "test1"})]

    const updateAction :PageActions = {type: Types.UpdateArtists, payload: artists}

    const updatedState = mainReducer(initialState, updateAction)

    expect(updatedState.artists).toEqual(artists)
    expect(updatedState.certificates).toEqual([])
})

// ARTISTS
it('Updates Artists for update type', () => {
    const initialState: Artist[] = []

    const artists =  [new Artist({firstname: "test"}),new Artist({firstname: "test1"})]

    const updateAction :PageActions = {type: Types.UpdateArtists, payload: artists}

    const updatedState = pageReducer(initialState, updateAction)

    expect(updatedState).toEqual(artists)
})

it('Appends Artist for create type', () => {
    const initialState: Artist[] = []

    const artist =  new Artist({firstname: "test"})

    const createAction:PageActions = {type: Types.CreateArtist, payload: artist}

    const updatedState = pageReducer(initialState, createAction)

    expect(updatedState).toEqual([artist])

})
// ARTISTS
it('Updates Certificate for update type', () => {
    const initialState: Certificate[] = []


    const certificates =  [new Certificate({
        title: "test",
        year: dayjs().format(),
        photo: "",
        artist: new Artist({firstname:"testName"})
    }), new Certificate({
        title: "test1",
        year:dayjs().format(),
        photo: "",
        artist: new Artist({firstname:"testName1"})
    })]

    const updateAction :CertificateActions= {type: Types.UpdateCertificate, payload: certificates}

    const updatedState = certificateReducer(initialState, updateAction)

    expect(updatedState).toEqual(certificates)
})

it('Appends Artist for create type', () => {
    const initialState: Certificate[] = []


    const certificate =  new Certificate({
        title: "test",
        year:dayjs().format(),
        photo: "",
        artist: new Artist({firstname:"testName"})
    })

    const updateAction :CertificateActions= {type: Types.CreateCertificate, payload: certificate}

    const updatedState = certificateReducer(initialState, updateAction)

    expect(updatedState).toEqual([certificate])

})
it('Deletes Certificate for Delete type', () => {


    const certificateToDelete = new Certificate(({
        id: "1",
        title: "test",
        year: dayjs().format(),
        photo: "",
        artist: new Artist({firstname:"testName"})
    }))

    const certificates =  [certificateToDelete]

    const initialState: Certificate[] = certificates

    const deleteAction :CertificateActions= {type: Types.DeleteCertificate, payload: {
       id: "1"
    }}

    const updatedState = certificateReducer(initialState, deleteAction)

    expect(updatedState).toEqual([])
})
