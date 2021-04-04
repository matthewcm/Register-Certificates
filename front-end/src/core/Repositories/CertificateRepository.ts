import {Certificate, CertificatePageType} from "../entities/Certificate";

export interface CertificateRepository {
    GetCertificatePage(page: number, size?:number, sort?:string): Promise<CertificatePageType>
    PostCertificate(certificate:Certificate): void
    PatchCertificate(certificate:Certificate):void
    DeleteCertificate(id: string):void
}
