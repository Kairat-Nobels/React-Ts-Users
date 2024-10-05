import React, { useState } from 'react';
import { Table } from 'rsuite';
import { User } from 'types/User';
import IconButton from '../buttons/IconButton';
import { MdEdit, MdDeleteOutline } from 'react-icons/md';
import { SortType } from 'rsuite/esm/Table';

const { Column, HeaderCell, Cell } = Table;

interface Props {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

const UsersTable: React.FC<Props> = ({ users, onEdit, onDelete }) => {
  const [sortColumn, setSortColumn] = useState<string | undefined>(undefined);
  const [sortType, setSortType] = useState<SortType | undefined>('asc');

  const getSortedData = () => {
    if (!sortColumn) return users;

    const sortedUsers = [...users].sort((a, b) => {
      const aValue = a[sortColumn as keyof User] ?? '';
      const bValue = b[sortColumn as keyof User] ?? '';

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        if (sortType === 'asc') {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      }

      return 0;
    });

    return sortedUsers;
  };

  const handleSortColumn = (columnKey: string, type: SortType | undefined) => {
    setSortColumn(columnKey);
    setSortType(type || 'asc');
  };

  return (
    <Table
      height={560}
      data={getSortedData()}
      rowHeight={60}
      sortColumn={sortColumn}
      sortType={sortType}
      onSortColumn={handleSortColumn}
    >
      <Column width={70} align="center" fixed sortable>
        <HeaderCell>ID</HeaderCell>
        <Cell dataKey="id" />
      </Column>

      <Column flexGrow={1} minWidth={200} fullText sortable>
        <HeaderCell>Name</HeaderCell>
        <Cell dataKey="name" />
      </Column>

      <Column flexGrow={1} fullText sortable>
        <HeaderCell>Email</HeaderCell>
        <Cell dataKey="email" />
      </Column>

      <Column flexGrow={1} sortable>
        <HeaderCell>Phone</HeaderCell>
        <Cell dataKey="phone" />
      </Column>

      <Column flexGrow={1}>
        <HeaderCell>Company</HeaderCell>
        <Cell dataKey="company.name" />
      </Column>

      <Column fixed="right" width={120} resizable>
        <HeaderCell>Actions</HeaderCell>
        <Cell>
          {(rowData: User) => (
            <div className="flex justify-between items-center">
              <IconButton
                onClick={() => onEdit(rowData)}
                icon={MdEdit}
                tooltip="Edit"
                color='#1caf68'
              />
              <IconButton
                onClick={() => onDelete(rowData)}
                icon={MdDeleteOutline}
                tooltip="Delete"
                color='rgb(210 54 54)'
              />
            </div>
          )}
        </Cell>
      </Column>
    </Table>
  );
};

export default UsersTable;
