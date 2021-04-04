package dev.matthewcm.verisart.challenge.certificate.collection.service

import dev.matthewcm.verisart.challenge.certificate.collection.entity.Artist
import dev.matthewcm.verisart.challenge.certificate.collection.repository.ArtistRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Pageable.unpaged
import org.springframework.stereotype.Service
import java.util.*

@Service
class ArtistService(
        @Autowired private val artistRepository: ArtistRepository,
) {
    fun find(pageable: Pageable = unpaged()) = artistRepository.findAll(pageable)

    fun find(id: UUID): Artist? = artistRepository.findById(id).get()

    fun save(artist: Artist) = artistRepository.save(artist)

    fun delete(artist: Artist) = artistRepository.delete(artist)
}