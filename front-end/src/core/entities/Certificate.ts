import  {v4 as uuidv4}  from 'uuid'
import {Artist} from "./Artist";

import dayjs from "dayjs";

export type CertificateType = {
    id?: string,
    title: string,
    artist: Artist,
    year: string,
    photo: string,
}


export class Certificate {
    private readonly _id : string | undefined
    private readonly _title:string
    private readonly _artist:Artist
    private readonly _year: string
    private readonly _photo: string

    constructor(config: CertificateType) {
        this._id = config?.id || uuidv4()
        this._title = config.title
        this._artist= config.artist
        this._year = config.year
        this._photo = config.photo
    }

    get id()   { return this._id;   }
    get title() { return this._title; }
    get artist() { return this._artist; }
    get year() { return this._year; }
    get photo() { return this._photo; }

    serialize() {
        return {
            id: this._id,
            title: this._title,
            year: dayjs().set('year', Number(this._year)).valueOf(),
            artist:this._artist.serialize(),
            photo: this._photo,
        };
    }

    static deserialize(json: any):Certificate | undefined {
        try {

            return new Certificate({
                id:   json.id,
                title: json.title,
                artist: json.artist,
                year: dayjs(json.year).format('YYYY'),
                photo: atob(json.photo),
            });

        }catch (e) {
            // console.error(JSON.stringify(json, undefined, 2))
            console.error(e)
        }
    }
}

export type CertificatePageType = {
    content: Certificate[],
    totalPages: number
}

