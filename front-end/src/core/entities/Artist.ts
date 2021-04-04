import  {v4 as uuidv4}  from 'uuid'

export type ArtistType = {
    id?: string,
    firstname: string
    surname: string
}

export class Artist {
    private readonly _id: string
    private readonly _firstname:string
    private readonly _surname:string

    constructor(config: ArtistType) {
        this._id = config?.id || uuidv4()
        this._firstname = config.firstname
        this._surname = config.surname
    }

    get id()   { return this._id;   }
    get firstname() { return this._firstname; }
    get surname() { return this._surname; }

    serialize() {
        return {
            id: this._id,
            firstname: this._firstname,
            surname: this._surname,
        };
    }

    static deserialize(json: any): Artist | undefined {
        try {
            return new Artist({
                id:   json.id,
                firstname: json.firstname,
                surname: json.surname
            });

        }catch (e) {
            // console.error(JSON.stringify(json, undefined, 2))
            console.error(e)
        }
    }
}

