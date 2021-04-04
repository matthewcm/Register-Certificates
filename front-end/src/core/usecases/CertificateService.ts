import {Certificate, CertificatePageType} from "../entities/Certificate";
import {CertificateRepositoryImp} from "../infrastructure/CertificateRepositoryImp";
import {CertificateRepository} from "../Repositories/CertificateRepository";

export interface CertificateService{
    GetCertificatePage(page:number, size?:number, sort?:string): Promise<CertificatePageType>
    PostCertificate(certificate: Certificate):void
    PatchCertificate(certificate: Certificate): void
    DeleteCertificate(id:string): void
}

export class CertificateServiceImp implements CertificateService{
    certificateRepo: CertificateRepository

    private static _instance: CertificateServiceImp

    constructor(cr: CertificateRepository) {
        this.certificateRepo= cr
    }

    async GetCertificatePage(page: number, size?:number, sort?:string): Promise<CertificatePageType> {
        return this.certificateRepo.GetCertificatePage(page, size, sort)
    }

    async PostCertificate(certificate: Certificate) {
        return this.certificateRepo.PostCertificate(certificate)
    }

    async PatchCertificate(certificate: Certificate) {
        return this.certificateRepo.PatchCertificate(certificate)
    }

    async DeleteCertificate(id:string) {
        return this.certificateRepo.DeleteCertificate(id)
    }

    public static get Instance()  {
        return this._instance ||
            (this._instance = new this(CertificateRepositoryImp.Instance))
    }
}
