import {Col, Dropdown, DropdownButton, Form, Pagination, Row, Spinner, Table} from "react-bootstrap";
import AppContext from "../store/AppContext";
import {useContext, useEffect, useState} from "react";

const QueryResults = () => {
    const {state, dispatch} = useContext(AppContext)
    const [downloading, setDownloading] = useState(false)

    useEffect(() => {
        if (downloading) {
            downloadResults()
        }
    }, [downloading]);

    const onSelect = selected => {
        dispatch({
            'type': 'PAGINATION_LENGTH_UPDATED',
            'length': selected
        })
    }

    const updateSearch = e => {
        dispatch({
            'type': 'SEARCH_UPDATED',
            'search': e.target.value
        })
    }

    const shouldShowPagination = () => {
        return canIncrementPagination() || canDecrementPagination()
    }

    const canIncrementPagination = () => {
        return (state.pagination_start + state.pagination_length) < state.query_results.totalRows;
    }

    const canDecrementPagination = () => {
        return (state.pagination_start - state.pagination_length) >= 0;
    }

    const gotoPaginationStart = () => {
        dispatch({
            'type': 'PAGINATION_GOTO_START'
        })
    }

    const gotoPaginationEnd = () => {
        dispatch({
            'type': 'PAGINATION_GOTO_END'
        })
    }

    const nextPage = () => {
        if(canIncrementPagination()) {
            dispatch({
                'type': 'PAGINATION_INCREMENTED'
            })
        }
    }

    const prevPage = () => {
        if(canDecrementPagination()) {
            dispatch({
                'type': 'PAGINATION_DECREMENTED'
            })
        }
    }

    const downloadResults = () => {
        let downloadData = state.query_results.columns.join(',').concat('\n')
        downloadData = downloadData.concat(state.query_results.results.map(result => {
            return result.data.map(it => {
                return Object.values(it).toString()
            }).join('\n')
        }))

        const element = document.createElement('a')
        const file = new Blob([downloadData], {
            type: 'text/plain',
        })
        element.href = URL.createObjectURL(file)
        element.download = 'axlrows.csv'
        document.body.appendChild(element)
        element.click()
        setDownloading(false);
    }

    return (
        <>
            {state.query_results.totalRows >= 1 && (
                <>
                    <div className="grid grid-cols-12 gap-4 mt-8">
                        <div className="col-start-2 col-span-9 mt-2">
                            <input
                                type="text"
                                className="input input-bordered w-full max-w-xs"
                                onChange={updateSearch}
                                placeholder={state.results_search === '' ? 'Search' : state.results_search}
                            />
                        </div>
                        <div className="col-span-2">
                            <div className="dropdown">
                                <label tabIndex="0" className="btn m-1">
                                    {state.pagination_length} Rows
                                    <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20"
                                         height="20" viewBox="0 0 24 24">
                                        <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/>
                                    </svg>
                                </label>
                                <ul tabIndex="0"
                                    className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                                    <li onClick={() => onSelect(10)}><a>10</a></li>
                                    <li onClick={() => onSelect(25)}><a>25</a></li>
                                    <li onClick={() => onSelect(50)}><a>50</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-4 mt-2">
                        <div className="col-start-2 col-span-10 mt-2">
                            <div className="overflow-x-auto">
                                <table className="table table-compact w-full">
                                    <thead>
                                    <tr>
                                        {state.query_results.columns.map((column, index) => {
                                            return (
                                                <th key={index}>{column}</th>
                                            )
                                        })}
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {state.query_results.results.map(ucm => {
                                        return ucm.data.slice(state.pagination_start, state.pagination_end).map((row, index) => {
                                            if([].concat(...Object.values(row)).join(' ').toLowerCase().includes(state.results_search.toLowerCase())) {
                                                return (
                                                    <tr key={index}>
                                                        {state.query_results.columns.map((column, index) => {
                                                            return (
                                                                <td key={index}>{row[column]}</td>
                                                            )
                                                        })}
                                                    </tr>
                                                )
                                            }
                                        })
                                    })}
                                    </tbody>
                                    <tfoot>
                                    <tr>
                                        {state.query_results.columns.map((column, index) => {
                                            return (
                                                <th key={index}>{column}</th>
                                            )
                                        })}
                                    </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-4 mt-4 mb-16">
                        <div className="col-start-2 col-span-3">
                            <p>{state.pagination_start + 1} through {state.pagination_end > state.query_results.totalRows ? state.query_results.totalRows : state.pagination_end} of {state.query_results.totalRows} Total Records</p>
                        </div>
                        <div className="col-start-10 col-span-2">
                            <div className="btn-group grid grid-cols-2">
                                <button onClick={prevPage} disabled={!canDecrementPagination()} className="btn btn-outline">Previous page</button>
                                <button onClick={nextPage} disabled={!canIncrementPagination()} className="btn btn-outline">Next</button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}
export default QueryResults
