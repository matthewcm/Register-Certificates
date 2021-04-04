package dev.matthewcm.verisart.challenge.certificate.collection.service

import dev.matthewcm.verisart.challenge.certificate.collection.entity.Artist
import dev.matthewcm.verisart.challenge.certificate.collection.entity.Certificate
import dev.matthewcm.verisart.challenge.certificate.collection.repository.CertificateRepository
import io.mockk.every
import io.mockk.mockkClass
import io.mockk.verify
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.data.domain.PageImpl
import org.springframework.data.domain.Pageable
import java.time.Instant
import java.util.*

class CertificateServiceTest {
    lateinit var repository: CertificateRepository
    lateinit var service: CertificateService
    lateinit var entity: Certificate


    @BeforeEach
    fun beforeEach() {
        repository = mockkClass(CertificateRepository::class)
        service = CertificateService(repository)
        entity = Certificate(
            title = "",
            artist = Artist(firstname = "firstname", surname = "surname"),
            year = Instant.now(),
            photo = byteArrayOf()
        )

    }

    @Test
    fun find() {
        every { repository.findAll(Pageable.unpaged()) } returns PageImpl(
            listOf(entity)
        )

        service.find(Pageable.unpaged())

        verify(atLeast = 1) { repository.findAll(Pageable.unpaged()) }
    }

    @Test
    fun findById() {
        every { repository.findById(entity.id) } returns Optional.of(entity)

        service.find(entity.id)

        verify(atLeast = 1) { repository.findById(entity.id) }

    }

    @Test
    fun save() {
        every { repository.save(entity) } returns entity

        service.save(entity)

        verify(atLeast = 1) { repository.save(entity) }

    }

    @Test
    fun delete() {
        every { repository.delete(entity) } returns Unit

        service.delete(entity)

        verify(atLeast = 1) { repository.delete(entity) }


    }
}