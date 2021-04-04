package dev.matthewcm.verisart.challenge.certificate.collection.entity

import org.hibernate.annotations.GenericGenerator
import java.util.*
import java.util.UUID.randomUUID
import javax.persistence.*

@Entity
@Table(name = "artist")
data class Artist(
    @Id
    @Column(name = "artist_id", columnDefinition = "uuid")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    val id: UUID = randomUUID(),

    @Column(name = "firstname", columnDefinition = "VARCHAR(250)", nullable = false)
    val firstname: String,

    @Column(name = "surname", columnDefinition = "VARCHAR(250)", nullable = false)
    val surname: String,
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false
        other as Artist
        if (id != other.id) return false
        return true
    }

    override fun hashCode(): Int = id.hashCode()
}
