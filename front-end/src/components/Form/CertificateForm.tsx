import React, {MutableRefObject, useContext, useEffect, useRef, useState} from "react";
import CreatableSelect from 'react-select/creatable';
import {Store} from "../../context/store/Store";
import {Artist} from "../../core/entities/Artist";
import {createNewArtist} from "../../context/actions/ArtistActions";
import {createNewCertificate, editCertificate, refreshCertificates} from "../../context/actions/CertificateActions";
import {Certificate} from "../../core/entities/Certificate";
import { Photo } from "../../core/entities/Photo";

type DropdownItemType = {
    value:string,
    label:string
}

const CertificateForm  = (props: {handleEdit?:any,edit?:boolean,id?: string, photo?:string, title?:string, artist?: DropdownItemType, year?:string}) => {

    const {state, dispatch} =  useContext(Store)

    const uploadedImage: MutableRefObject<any> = useRef(props.photo || null)
    const imageUploader: MutableRefObject<any> = useRef(null)

    const [photo , setPhoto]  = useState<string | null>(props.photo || null)
    const [title, setTitle] = useState(props.title || "")

    const [artistDropdown, setArtistDropdown] = useState< DropdownItemType[]>([])

    const [artist, setArtist] = useState<DropdownItemType | null>( props.artist || null)

    const [year, setYear] = useState(props.year || "")


    const  refreshArtistDropdownOptions= () => {

        setArtistDropdown(state.artists.map(artist => ({
            value: artist.id,
            label: `${artist.firstname} ${artist.surname}`
        })))

    }


    useEffect(() => {

        refreshArtistDropdownOptions()
    }, [state.artists])

    const handleTitle= (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }
    const handleArtist= (e:any, actionEvent:any) => {
        if (actionEvent.action === "select-option"){
            return setArtist({
                value: e.value,
                label: e.label
            })
        }
        if (actionEvent.action === "create-option"){
            const [firstname, ...surname] = e.label.split(" ")

            const artist = new Artist({
                firstname,
                surname: surname.join(' ')
            })
            createNewArtist(dispatch, artist)
                .then(() => setArtist({
                    value: artist.id,
                    label: `${artist.firstname} ${artist.surname}`
                }))
                .catch(console.error)

        }
    }

    const handleYear= (e: React.ChangeEvent<HTMLInputElement>) => {
        setYear(e.target.value.toString())
    }

    const handlePhotoUpload = async(e: React.ChangeEvent<HTMLInputElement>) => {
        const file:File = e.target.files![0]
        const photo64 = await Photo.deserializeFromFile(file)
        setPhoto(photo64)
    }

    const handleSubmit  = async(event: React.FormEvent<HTMLFormElement>) =>  {
        event.preventDefault()

        if (photo && artist) {
            try {

                const [firstname, ...surname] = artist.label.split(" ")

                const certificate = new Certificate({
                    id: props.id,
                    title,
                    artist: new Artist({
                        id: artist.value,
                        firstname,
                        surname: surname.join(" "),
                    }),
                    year,
                    photo,
                })

                if (props.edit) {
                    await editCertificate(dispatch, certificate)
                    props.handleEdit()
                    return

                }
                await createNewCertificate(dispatch, certificate)
                await refreshCertificates(dispatch, state.page.currentPage, state.page.pageSize,   state.page.sortBy?.sort)

                setArtist(null)
                setPhoto(null)
                setYear("")
                setTitle("")
            }
            catch(e){
                console.error(e)
            }
        }

    }

    return (
        <>
            <h1 className="uppercase font-thin text-center">Register Certificate</h1>

            <form onSubmit={handleSubmit} className="gap-5 flex flex-col justify-between">
                <div className="gap-5 flex flex-wrap justify-between">
                    <div className="w-64 m-auto ">
                        <input
                            name={"photo"}
                            className="w-full"
                            accept="image/*"
                            ref={imageUploader}
                            style={{
                                display: 'none'
                            }}
                            data-cy="photo"
                            onChange={handlePhotoUpload} type="file"/>

                        <div
                            onClick={() => imageUploader.current.click()}
                            className="cursor-pointer border-dashed border-2 border-gray-400 h-64 w-64"
                        >
                            {photo?
                                <img
                                    className="w-full h-full object-contain"
                                    ref={uploadedImage}
                                    src={photo}
                                    alt="Uploaded Image"
                                />:
                                <div className="flex justify-center px-6 pt-5 pb-6 ">
                                    <div className="space-y-1 text-center">
                                        <svg className="mx-auto h-12 w-12 text-gray-400"
                                             stroke="currentColor"
                                             fill="none"
                                             viewBox="0 0 48 48"
                                             aria-hidden="true">
                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round" />
                                        </svg>
                                        <div className="flex text-sm text-gray-400">
                                            <span>Upload your art</span>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>

                    </div>
                    <div data-cy="form" className=" gap-2 md:pl-6 flex flex-col m-auto justify-center align-middle items-center justify-between ">
                        <input data-cy="title" name="title" required className="border-2 w-full rounded " type="text"
                               onChange={handleTitle}
                               placeholder="Enter Title"
                               value={title}
                        />

                        <CreatableSelect
                            className="w-full"
                            isClearable
                            onChange={handleArtist}
                            options={artistDropdown}
                            data-cy="artist"
                            id={"artist-selection"}
                            value={artist}
                        />

                        <input name="year" required className="border-2 rounded w-full"
                               type="number"
                               onChange={handleYear}
                               placeholder="Enter Year"
                               data-cy="year"
                               value={year}
                        />

                    </div>

                </div>

                {props.handleEdit &&
                <button data-cy="cancelEdit" type="button" onClick={props.handleEdit} className="border-orange border-2 rounded text-orange">
                    Cancel Edit
                </button>
                }
                <button data-cy="submit" className="border-orange border-2 rounded text-orange">
                    Submit
                </button>
            </form>
        </>

    )

}

export default CertificateForm
