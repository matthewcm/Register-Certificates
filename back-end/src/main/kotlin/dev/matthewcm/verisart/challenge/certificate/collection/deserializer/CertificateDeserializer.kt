package dev.matthewcm.verisart.challenge.certificate.collection.deserializer

import com.fasterxml.jackson.core.JsonParser
import com.fasterxml.jackson.databind.DeserializationContext
import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.deser.std.StdDeserializer
import dev.matthewcm.verisart.challenge.certificate.collection.entity.Artist
import dev.matthewcm.verisart.challenge.certificate.collection.entity.Certificate
import java.time.Instant
import java.time.Instant.ofEpochMilli
import java.util.*

class CertificateDeserializer(supportedClass: Class<Certificate>? = null) : StdDeserializer<Certificate>(supportedClass) {
    override fun deserialize(parser: JsonParser, ctx: DeserializationContext): Certificate {
        try {
            val mapper = ObjectMapper()
            val node: JsonNode = parser.codec.readTree(parser)
            val id = UUID.fromString(node["id"].asText())
            val artist = mapper.readValue(node["artist"].toString(), Artist::class.java)
            val photo = node["photo"].asText().toByteArray()
            val title = node["title"].asText()
            val year = node["year"].asLong().run { ofEpochMilli(this) }
            return Certificate(id, title, artist, year, photo)
        } catch (e: Exception) {
            throw e
        }
    }
}