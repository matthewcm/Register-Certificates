import React, {useContext, useEffect} from 'react'
import Collection from "../components/Collection/Collection";
import CertificateFormContainer from '../components/Form/CertificateFormContainer';
import {refreshArtists} from "../context/actions/ArtistActions";
import {Store} from "../context/store/Store";
import {refreshCertificates} from "../context/actions/CertificateActions";
import Pagination from "../components/Pagination/Pagination";

function index() {

    const { dispatch, state} =  useContext(Store)

    useEffect(() => {
        console.log(state)
        refreshArtists(dispatch).catch(console.error)
        refreshCertificates(dispatch, state.page.currentPage,state.page.pageSize, state.page.sortBy?.sort ).catch(console.error)
        console.log(state)
    }, [])

    return (
    <div className="md:p-12 font-other tracking-wider">
          <div className="flex flex-col justify-content-center align-items-center">
              <CertificateFormContainer/>
              <Pagination/>
              <Collection/>
              <Pagination/>
          </div>
    </div>
  )
}

export default index
