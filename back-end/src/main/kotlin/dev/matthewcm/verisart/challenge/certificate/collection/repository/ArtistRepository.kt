package dev.matthewcm.verisart.challenge.certificate.collection.repository

import dev.matthewcm.verisart.challenge.certificate.collection.entity.Artist
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface ArtistRepository : JpaRepository<Artist, UUID>