import {Artist} from "../entities/Artist"


export interface ArtistRepository {
    GetArtists(): Promise<Artist[]>
    PostArtist(artist:Artist): void
}
