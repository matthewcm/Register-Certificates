import React, {useContext} from "react";
import ClayPaginationBar  from "@clayui/pagination-bar"
import ClayButton from "@clayui/button"
import {Store} from "../../context/store/Store";
import {changePage, changeSort} from "../../context/actions/PageActions";
import {ClayPaginationWithBasicItems} from "@clayui/pagination";
import {refreshCertificates} from "../../context/actions/CertificateActions";


const Pagination = () => {
    const {state, dispatch} =  useContext(Store)

    const handlePageChange = (page?:number) => {
        if (page) changePage(dispatch, page - 1)
            .then(() => refreshCertificates(dispatch, page - 1,state.page.pageSize, state.page.sortBy?.sort)
                    .catch(console.error)
            ).catch(console.error)

    }
    const handleSort = (sort?:string, label: string = "Unsorted") => {

        changeSort(dispatch, sort, label)
            .then(() =>
                refreshCertificates(dispatch, state.page.currentPage, state.page.pageSize, sort)
                    .catch(console.error)
            )
            .catch(console.error)

    }



    return (
        <ClayPaginationBar className="my-5" data-cy="pagination-bar">
            <ClayPaginationBar.DropDown
                trigger={
                    <ClayButton displayType={"unstyled"}>
                        {state.page.sortBy?.label || "Select Sorting Type"}
                    </ClayButton>
                }
                items={[
                    {
                        label: "Unsorted",
                        onClick: () => handleSort()
                    },
                    {
                        label: "Sort by artist's surname",
                        onClick: () => handleSort("artist", "Sort by artist's surname")
                    }
                ]}/>
        <ClayPaginationBar.Results>
            Showing {state.page.pageSize} certificates per page
        </ClayPaginationBar.Results>
        <ClayPaginationWithBasicItems
            data-cy="pagination"
            activePage={state.page.currentPage + 1}
            totalPages={state.page.totalPages}
            ellipsisBuffer={2}
            onPageChange={handlePageChange}
        />
        </ClayPaginationBar>
    )
}

export default Pagination
