/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-key */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/display-name */
import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { useTable, usePagination, useSortBy } from 'react-table';
import classnames from 'classnames';
import moment from 'moment';
import 'moment/locale/id';

function Table({ columns, data, divided = false, defaultPageSize = 10 }) {
  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: defaultPageSize },
    },
    useSortBy,
    usePagination
  );

  return (
    <>
      <table
        {...getTableProps()}
        className={`r-table table ${classnames({ 'table-divided': divided })}`}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, columnIndex) => (
                <th
                  key={`th_${columnIndex}`}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={
                    column.isSorted
                      ? column.isSortedDesc
                        ? 'sorted-desc'
                        : 'sorted-asc'
                      : ''
                  }
                >
                  {column.render('Header')}
                  <span />
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell, cellIndex) => (
                  <td
                    key={`td_${cellIndex}`}
                    {...cell.getCellProps({
                      className: cell.column.cellClass,
                    })}
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export const ReactTableWithPaginationCard = ({
  data,
  onUpdateProgress,
  deleteData,
  dataTraining,
  onSeeProses,
}) => {
  const cols = React.useMemo(
    () => [
      {
        Header: 'Tweet',
        accessor: 'text',
        cellClass: 'w-40',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Klasifikasi',
        accessor: 'classification',
        cellClass: 'text-muted w-25',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Action',
        accessor: '_id',
        cellClass: 'text-muted w-10',
        Cell: (props) => (
          <>
            {!dataTraining && (
              <i
                className="simple-icon-refresh mr-3"
                style={{ cursor: 'pointer' }}
                onClick={() => onSeeProses(props.row.original, 'criteria')}
              />
            )}
            <i
              className="simple-icon-note mr-3"
              style={{ cursor: 'pointer' }}
              onClick={() => onUpdateProgress(props.row.original, 'criteria')}
            />
            <i
              className="simple-icon-trash"
              style={{ cursor: 'pointer' }}
              onClick={() => deleteData(props.value)}
            />
          </>
        ),
      },
    ],
    []
  );

  return (
    <Card className="mb-4">
      <CardBody>
        <Table columns={cols} data={data} />
      </CardBody>
    </Card>
  );
};
