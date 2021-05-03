import React, { useMemo } from "react";
import { useTable } from "react-table";
import { COLUMNS } from "./columns";
import Delete from "./Delete";
import Edit from "./Edit";
import "./table.css";

export const BasicTable = (props) => {
  const columns = useMemo(() => COLUMNS, []);

  const table_data = [];
  let index = 0;
  props.props.data.map((element) => {
    const obj = {
      id: "",
      username: "",
      email: "",
      edit: <Edit />,
      delete: <Delete />,
    };

    index = index + 1;

    obj.id = index;
    obj.username = element.username;
    obj.email = element.email;

    table_data.push(obj);
    return;
  });

  const data = useMemo(() => table_data.reverse(), []);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
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
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
