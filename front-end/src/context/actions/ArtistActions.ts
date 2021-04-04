import {Types} from "../reducers/reducers";
import {Artist} from "../../core/entities/Artist";
import {ArtistServiceImp} from "../../core/usecases/ArtistService";

const artistService = ArtistServiceImp.Instance

export const refreshArtists = async (dispatch: any) => {
    try {
        const artists = await artistService.GetArtists()

        dispatch({type: Types.UpdateArtists, payload: artists})
    } catch (e) {

    }
}

export const createNewArtist = async ( dispatch: any, artist:Artist) => {
    try {
        await artistService.PostArtist(artist)

        dispatch({type: Types.CreateArtist, payload: artist})

    } catch (e) {
        console.error(e)

    }
}
