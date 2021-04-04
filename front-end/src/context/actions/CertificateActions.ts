import {CertificateServiceImp} from "../../core/usecases/CertificateService";
import {Types} from "../reducers/reducers";
import {Certificate} from "../../core/entities/Certificate";

const certificateService = CertificateServiceImp.Instance

export const refreshCertificates = async (dispatch: any, page:number = 0, size:number = 2, sort?:string) => {
    try {
        const certificatesRes = await certificateService.GetCertificatePage(page, size, sort)
        const totalPages = certificatesRes.totalPages
        const certificates = certificatesRes.content

        console.log(certificates)
        dispatch({type: Types.UpdateCertificatePages, payload: totalPages})
        dispatch({type: Types.UpdateCertificate, payload: certificates})
    } catch (e) {

    }
}


export const createNewCertificate = async ( dispatch: any, certificate:Certificate) => {
    try {
        await certificateService.PostCertificate(certificate)

    } catch (e) {
        console.error(e)

    }
}

export const editCertificate = async ( dispatch: any, certificate:Certificate) => {
    try {
        await certificateService.PatchCertificate(certificate)
        dispatch({type: Types.ModifyCertificate, payload: certificate})

    } catch (e) {
        console.error(e)

    }
}
export const deleteCertificate = async ( dispatch: any, id:string) => {
    try {
        await certificateService.DeleteCertificate(id)
        dispatch({type: Types.DeleteCertificate, payload: {id}})

    } catch (e) {
        console.error(e)

    }
}
