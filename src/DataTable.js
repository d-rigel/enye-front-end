import React from 'react'
import "./DataTable.css"


function DataTable({ data, loading }) {

    if (loading) {
        return <h3>Loading...</h3>
    }
   
    console.log(data)
    const columns = data[0] && Object.keys(data[0])
    return (
        <table cellPadding={3} cellSpacing={3}>
             <thead className="table__head">
                <tr>{data[0] && columns.map((heading) => <th>{heading}</th>)}</tr>
            </thead>
            <tbody className="table__body">
                {data.map(row => <tr>
                    {
                        columns.map(column => <td>{row[column]}</td>)
                    }
                </tr>)}
            </tbody>
     
         </table>
    )
}

export default DataTable
