import axios from "axios";
import {CertificateRepository} from "../Repositories/CertificateRepository";
import {Certificate, CertificatePageType} from "../entities/Certificate";

export class CertificateRepositoryImp implements CertificateRepository{
    private static _instance: CertificateRepositoryImp
    jsonUrl = "/api/certificates"
    // private pageSize = 1

    async GetCertificatePage(page: number, size?: number, sort?:string): Promise<CertificatePageType> {
        const res = await axios.get('/api/certificates', {
            params: {
                page,
                size: size,
                sort: sort
            }
        })

        const jsonData = res.data

        return {
            totalPages: jsonData.totalPages,
            content: jsonData
                .content
                .map(Certificate.deserialize)
                .map((certificate: Certificate) => new Certificate(
                    {
                        id: certificate.id,
                        title: certificate.title,
                        artist: certificate.artist,
                        year: certificate.year,
                        photo: certificate.photo,
                    }
                ))
        }
    }

    async PostCertificate(certificate: Certificate) {
        const certificateJson = certificate.serialize()
        await axios.post(this.jsonUrl, certificateJson)
    }

    async PatchCertificate(certificate: Certificate) {
        const certificateJson = certificate.serialize()
        await axios.patch(this.jsonUrl + `/${certificateJson.id}`, certificateJson )
    }

    async DeleteCertificate(id: string) {
        await axios.delete(this.jsonUrl + `/${id}`)
    }

    static get Instance()  {
        return this._instance ||
            (this._instance = new this())
    }
}
