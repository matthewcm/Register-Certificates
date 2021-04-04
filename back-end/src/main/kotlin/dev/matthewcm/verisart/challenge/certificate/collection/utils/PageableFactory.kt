package dev.matthewcm.verisart.challenge.certificate.collection.utils
import org.springframework.data.domain.PageRequest.of
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.data.domain.Sort.unsorted

class PageableFactory {
    companion object {
        fun create(
            page: Int?,
            size: Int?,
            sort: String? = null
        ): Pageable  {
            if (sort.isNullOrEmpty()) return of(page?:0, size?: 24, unsorted())
            return of( page?:0, size?:24, Sort.by(sort))
        }
    }
}

