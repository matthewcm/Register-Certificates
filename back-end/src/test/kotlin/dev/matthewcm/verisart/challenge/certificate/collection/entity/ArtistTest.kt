package dev.matthewcm.verisart.challenge.certificate.collection.entity

import nl.jqno.equalsverifier.EqualsVerifier
import nl.jqno.equalsverifier.Warning
import org.junit.jupiter.api.Test

internal class ArtistTest {

    @Test
    fun `verify the equals and hashcode contract`() {
        EqualsVerifier.configure().suppress(Warning.SURROGATE_KEY)
            .forClass(Artist::class.java)
            .verify()
    }
}