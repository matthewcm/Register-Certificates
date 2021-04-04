package dev.matthewcm.verisart.challenge.certificate.collection.deserializer

import com.fasterxml.jackson.databind.ObjectMapper
import com.natpryce.hamkrest.assertion.assertThat
import com.natpryce.hamkrest.equalTo
import dev.matthewcm.verisart.challenge.certificate.collection.entity.Artist
import dev.matthewcm.verisart.challenge.certificate.collection.entity.Certificate
import org.junit.jupiter.api.Test
import java.time.Instant
import java.util.UUID.randomUUID
import kotlin.text.Charsets.UTF_16

class CertificateDeserializerTest {
    @Test
    fun `Given valid entity DTO, when deserialize, then it should return correct DAO`() {
        val mapper = ObjectMapper()

        val artist = Artist(
            id = randomUUID(),
            firstname = "artist-firstname-1",
            surname = "artist-surname-1",
        )

        val certificate = Certificate(
            id = randomUUID(),
            title = "certificate-firstname-1",
            artist = artist,
            year = Instant.parse("2021-04-04T16:03:41.00Z"),
            photo = byteArrayOf()
        )

        val validArtistDto =
            """
            {
                "id": "${artist.id}",
                "firstname": "${artist.firstname}",
                "surname": "${artist.surname}"
            }
            """.trimIndent()

        val validCertificateDto =
            """
            {
                "id": "${certificate.id}",
                "title": "${certificate.title}",
                "artist": $validArtistDto,
                "year": "${certificate.year.toEpochMilli()}",
                "photo": "${String(certificate.photo, UTF_16)}"
            }
            """.trimIndent()


        val dao = mapper.readValue(validCertificateDto, Certificate::class.java)

        assertThat(dao.id, equalTo(certificate.id))
        assertThat(dao.title, equalTo(certificate.title))
        assertThat(dao.artist, equalTo(certificate.artist))
        assertThat(dao.year, equalTo(certificate.year))
        assertThat(String(dao.photo), equalTo(String(certificate.photo)))
    }
}