import { Artist} from "../entities/Artist";
import {ArtistRepository} from "../Repositories/ArtistRepository";
import axios from "axios";

export class ArtistRepositoryImp implements ArtistRepository {
    private static _instance: ArtistRepositoryImp
    jsonUrl = "/api/artists"

    async GetArtists(): Promise<Artist[]> {
        const res = await axios.get(this.jsonUrl, {})

        const jsonData = res.data.content

        return jsonData.map(Artist.deserialize)
            .map((artist:Artist) => new Artist({
            id: artist.id,
            firstname: artist.firstname,
            surname: artist.surname
        }))

    }

    async PostArtist(artist:Artist) {
        const artistJson = artist.serialize()
        await axios.post(this.jsonUrl, artistJson )
    }

    static get Instance()  {
        return this._instance ||
            (this._instance = new this())
    }


}
