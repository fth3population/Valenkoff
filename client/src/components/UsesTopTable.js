import React, {useMemo} from "react";
import {useTable} from "react-table";

const columns = [{
    Header: "ID",
    accessor: "_id"

},{
    Header: "Number of uses",
    accessor: "numberOfUses"
}];
function UsesTopTable(props) {
    //catching the data. Purpose is to only have 1 instance.
    const data = useMemo(() => props.data, [props.data]);
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });
    return (
        <table className="table table-striped table-sm">
            <thead>
            {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps()} scope="col">
                            {column.render("Header")}
                        </th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
                prepareRow(row);
                return (
                    <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                            return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                        })}
                    </tr>
                );
            })}
            </tbody>
        </table>
    );
}
export default UsesTopTable;