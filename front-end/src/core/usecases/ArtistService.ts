import {Artist} from "../entities/Artist";
import {ArtistRepository} from "../Repositories/ArtistRepository";
import {ArtistRepositoryImp} from "../infrastructure/ArtistRepositoryImp";

export interface ArtistService {
    GetArtists(): Promise<Artist[]>
    PostArtist(artist:Artist): void
}

export class ArtistServiceImp implements ArtistService {
    private static _instance: ArtistServiceImp;

    artistRepo:ArtistRepository

    constructor(ar: ArtistRepository) {
        this.artistRepo = ar
    }

    async GetArtists(): Promise<Artist[]> {
        return this.artistRepo.GetArtists()
    }

    async PostArtist(artist: Artist)  {
        return this.artistRepo.PostArtist(artist)
    }

    public static get Instance()  {
        return this._instance ||
            (this._instance = new this(ArtistRepositoryImp.Instance))
    }
}
