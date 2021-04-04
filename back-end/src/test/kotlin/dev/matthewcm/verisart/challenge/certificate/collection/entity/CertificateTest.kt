package dev.matthewcm.verisart.challenge.certificate.collection.entity

import nl.jqno.equalsverifier.EqualsVerifier
import nl.jqno.equalsverifier.Warning
import org.junit.jupiter.api.Test

import java.util.UUID.randomUUID

internal class CertificateTest {

    @Test
    fun `verify the equals and hashcode contract`() {
        EqualsVerifier.configure().suppress(Warning.SURROGATE_KEY)
            .forClass(Certificate::class.java)
            .withPrefabValues(
                Artist::class.java,
                Artist(randomUUID(), "fisrtname", "surname"),
                Artist(randomUUID(), "fisrtname", "surname")
            )
            .verify()
    }
}