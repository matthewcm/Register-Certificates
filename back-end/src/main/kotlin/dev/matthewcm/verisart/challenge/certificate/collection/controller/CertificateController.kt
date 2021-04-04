package dev.matthewcm.verisart.challenge.certificate.collection.controller

import dev.matthewcm.verisart.challenge.certificate.collection.entity.Artist
import dev.matthewcm.verisart.challenge.certificate.collection.entity.Certificate
import dev.matthewcm.verisart.challenge.certificate.collection.service.CertificateService
import dev.matthewcm.verisart.challenge.certificate.collection.utils.PageableFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.PageRequest.of
import org.springframework.data.domain.Sort.Direction.DESC
import org.springframework.data.domain.Sort.by
import org.springframework.http.ResponseEntity
import org.springframework.http.ResponseEntity.*
import org.springframework.web.bind.annotation.*
import java.net.URI
import java.util.*

@RestController
@RequestMapping("/certificates")
class CertificateController(
        @Autowired private val certificateService: CertificateService,
) {
    @GetMapping
    fun list(
        @RequestParam(name = "page", required = false) page: Int?,
        @RequestParam(name = "size", required = false) size: Int?,
        @RequestParam(name = "sort", required = false) sort: String?,
    ) = certificateService
        .find(PageableFactory.create(page,size,sort))
        .run { ok().body(this) }

    @GetMapping("/{id}")
    fun get(@PathVariable id: UUID) = certificateService
        .find(id)
        .run { ok().body(this) }

    @PostMapping()
    fun post(@RequestBody certificate: Certificate): ResponseEntity<URI> = certificateService
        .save(certificate)
        .run { created(URI("/certificates/${id}")).build() }

    @DeleteMapping("/{id}")
    fun delete(@PathVariable id: UUID): ResponseEntity<Unit> = certificateService
        .find(id)
        .also { certificateService.delete(it ?: error("Certificate does not exist")) }
        .run { noContent().build() }

    @PatchMapping("/{id}")
    fun patch(@PathVariable id: UUID, @RequestBody certificate: Certificate): ResponseEntity<Unit> = certificateService
        .save(certificate)
        .run { noContent().build() }

}
