package dev.matthewcm.verisart.challenge.certificate.collection.service

import dev.matthewcm.verisart.challenge.certificate.collection.entity.Certificate
import dev.matthewcm.verisart.challenge.certificate.collection.repository.CertificateRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Pageable.unpaged
import org.springframework.stereotype.Service
import java.util.*

@Service
class CertificateService(
        @Autowired private val certificateRepository: CertificateRepository,
) {
    fun find(pageable: Pageable = unpaged()) = certificateRepository.findAll(pageable)

    fun find(id: UUID): Certificate? = certificateRepository.findById(id).get()

    fun save(certificate: Certificate) = certificateRepository.save(certificate)

    fun delete(certificate: Certificate) = certificateRepository.delete(certificate)

}