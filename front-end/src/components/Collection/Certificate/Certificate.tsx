import React, {useContext, useEffect, useRef, useState} from "react";
import {CSSTransition} from 'react-transition-group'
import CertificateForm from "../../Form/CertificateForm";
import './animations.css'
import {Artist} from "../../../core/entities/Artist";
import {deleteCertificate} from "../../../context/actions/CertificateActions";
import {Store} from "../../../context/store/Store";

const Certificate= ({id, artist, title, year, photo}:{id:string, artist:Artist, year:string, title:string, photo:string}) => {


    const {dispatch} =  useContext(Store)

    const [edit, setEdit]   = useState(false)

    const handleModification = () => {
        setEdit(!edit)
    }
    const handleDelete = async () => {
        await deleteCertificate( dispatch, id)
    }

    const certificateRef = useRef(null)
    const certificateEditRef = useRef(null)


    return (
        <div key={id} className="p-6  mb-5 font-bold bg-white text-lg rounded-2xl min-w-80 max-w-160 shadow-xl">
            <CSSTransition
                nodeRef={certificateRef}
                in={!edit}
                timeout={0}
                classNames="cert"
                unmountOnExit
            >

                <div key={1} data-cy="certificate" ref={certificateRef}>

                    <div className="gap-5 flex flex-wrap justify-between">
                        <div className="w-64 m-auto ">
                            <div
                                className="cursor-pointer border-dashed border-2 border-gray-400 h-64 w-64"
                            >
                                {photo?
                                    <img
                                        className="w-full h-full object-contain"
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
                                                <span>Missing Art</span>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>

                        </div>
                        <div className="gap-2 md:pl-6 flex flex-col m-auto justify-center align-middle items-center justify-between ">
                            <div>Title:{title} </div>
                            <div>Artist: {`${artist?.firstname} ${artist?.surname}`}</div>
                            <div>Year: {year}</div>
                            <button data-cy="edit" type='button' onClick={handleModification} className="text-orange border-orange border-2 w-20">Edit </button>
                            <button data-cy="delete" type='button' onClick={handleDelete} className="text-orange border-orange border-2 w-20">Delete </button>
                        </div>

                    </div>
                </div>
            </CSSTransition>
            <CSSTransition
                nodeRef={certificateRef}
                in={edit}
                timeout={0}
                classNames="form"
                unmountOnExit
            >
                <div key={2} data-cy="editForm" ref={certificateEditRef}>

                    <CertificateForm

                        handleEdit={handleModification}
                        edit

                        id={id!!}
                        title={title}
                        photo={photo}
                        artist={{label:artist.firstname, value:artist.id}}
                        year={year}

                    />

                </div>

            </CSSTransition>

        </div>

    )

}

export default Certificate
