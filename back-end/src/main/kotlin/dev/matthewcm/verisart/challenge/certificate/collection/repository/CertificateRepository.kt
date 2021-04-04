package dev.matthewcm.verisart.challenge.certificate.collection.repository

import dev.matthewcm.verisart.challenge.certificate.collection.entity.Artist
import dev.matthewcm.verisart.challenge.certificate.collection.entity.Certificate
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface CertificateRepository : JpaRepository<Certificate, UUID>