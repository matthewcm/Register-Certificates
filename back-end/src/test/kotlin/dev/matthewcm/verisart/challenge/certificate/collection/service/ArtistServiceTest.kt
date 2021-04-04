package dev.matthewcm.verisart.challenge.certificate.collection.service

import dev.matthewcm.verisart.challenge.certificate.collection.entity.Artist
import dev.matthewcm.verisart.challenge.certificate.collection.repository.ArtistRepository
import io.mockk.every
import io.mockk.mockkClass
import io.mockk.verify
import kotlinx.coroutines.awaitAll
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.data.domain.PageImpl
import org.springframework.data.domain.Pageable
import java.util.*

class ArtistServiceTest {
    lateinit var repository: ArtistRepository
    lateinit var service: ArtistService
    lateinit var entity: Artist


    @BeforeEach
    fun beforeEach() {
        repository = mockkClass(ArtistRepository::class)
        service = ArtistService(repository)
        entity = Artist(firstname = "firstname", surname = "surname")

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