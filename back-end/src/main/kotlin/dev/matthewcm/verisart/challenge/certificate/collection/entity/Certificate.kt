package dev.matthewcm.verisart.challenge.certificate.collection.entity

import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.databind.annotation.JsonDeserialize
import dev.matthewcm.verisart.challenge.certificate.collection.deserializer.CertificateDeserializer
import org.hibernate.annotations.GenericGenerator
import java.time.Instant
import java.util.*
import javax.persistence.*

@Entity
@JsonDeserialize(using = CertificateDeserializer::class)
@Table(name = "certificate")
data class Certificate(
    @Id
    @Column(name = "certificate_id", columnDefinition = "uuid")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    val id: UUID = UUID.randomUUID(),

    @Column(name = "title", columnDefinition = "VARCHAR(250)", nullable = false)
    val title: String,

    @ManyToOne
    @JoinColumn(name = "artist", referencedColumnName = "artist_id")
    val artist: Artist,

    @Column(name = "year", columnDefinition = "TIMESTAMP WITH TIME ZONE", nullable = false)
    val year: Instant,

    @Column(name = "photo", columnDefinition = "BYTEA", nullable = false)
    var photo: ByteArray,
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false
        other as Certificate
        if (id != other.id) return false
        return true
    }

    override fun hashCode(): Int = id.hashCode()
}