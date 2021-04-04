import React, {useContext} from "react";
import Certificate from "./Certificate/Certificate";

import {Store} from "../../context/store/Store";


const Collection: React.VFC = () => {
    const {state} =  useContext(Store)

    return (
        <div data-cy="collection" className="flex flex-row justify-center flex-wrap gap-8">
            <h1 className='uppercase w-full font-thin text-center '> Registered Certificates </h1>

            {state.certificates.map((certificate) => {
                return (
                    <Certificate
                        key={certificate.id!!}
                        id={certificate.id!!}
                        title={certificate.title}
                        photo={certificate.photo}
                        artist={certificate.artist}
                        year={certificate.year}
                    />
                )
            })}
        </div>
    )
}

export default Collection
