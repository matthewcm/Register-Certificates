package dev.matthewcm.verisart.challenge.certificate.collection.controller

import dev.matthewcm.verisart.challenge.certificate.collection.entity.Artist
import dev.matthewcm.verisart.challenge.certificate.collection.service.ArtistService
import dev.matthewcm.verisart.challenge.certificate.collection.utils.PageableFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.http.ResponseEntity.*
import org.springframework.web.bind.annotation.*
import java.net.URI
import java.util.*

@RestController
@RequestMapping("/artists")
class ArtistController(
        @Autowired private val artistService: ArtistService,
) {
    @GetMapping
    fun list(
        @RequestParam(name = "page", required = false) page: Int?,
        @RequestParam(name = "size", required = false) size: Int?,
    ) = artistService
        .find(PageableFactory.create(page,size))
        .run { ok().body(this) }

    @GetMapping("/{id}")
    fun get(@PathVariable id: UUID) = artistService
        .find(id)
        .run { ok().body(this) }

    @PostMapping
    fun post(@RequestBody artist: Artist): ResponseEntity<Artist> = artistService
        .save(artist)
        .run { created(URI("/artists/${this.id}")).build() }

    @DeleteMapping("/{id}")
    fun delete(@PathVariable id: UUID): ResponseEntity<Artist> = artistService
        .find(id)
        .also { artistService.delete(it ?: error("Artist does not exist")) }
        .run { noContent().build() }
}