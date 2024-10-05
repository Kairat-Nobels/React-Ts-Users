import React, { useState, useEffect } from 'react';
import { User } from 'types/User';
import { MdEdit, MdDeleteOutline } from 'react-icons/md';
import IconButton from '@ui/buttons/IconButton';
import { Drawer, RadioGroup, Radio, Button } from 'rsuite';

interface UsersCardsProps {
  users: User[];
  drawerOpen: boolean;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  setDrawerOpen: (open: boolean) => void;
}

const UsersCards: React.FC<UsersCardsProps> = ({ users, onEdit, onDelete, drawerOpen, setDrawerOpen }) => {
  const [sortType, setSortType] = useState<string>('id');
  const [pendingSortType, setPendingSortType] = useState<string>('id');
  useEffect(() => {
    if (drawerOpen) {
      setPendingSortType(sortType);
    }
  }, [drawerOpen, sortType]);

  const handleSortChange = (value: string | number) => {
    setPendingSortType(value.toString());
  };

  const applySort = () => {
    setSortType(pendingSortType);
    setDrawerOpen(false);
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (sortType === 'name') return a.name.localeCompare(b.name);
    if (sortType === 'email') return a.email.localeCompare(b.email);
    return a.id - b.id;
  });

  return (
    <>
      <div className="user-cards mt-6 px-4 pb-4">
        {sortedUsers.map((user) => (
          <div key={user.id} className="bg-white rounded-lg shadow-lg p-4 mb-6 relative">
            <div className="absolute top-2 right-2 flex gap-2">
              <IconButton icon={MdEdit} tooltip="Edit" onClick={() => onEdit(user)} color="#1caf68" />
              <IconButton icon={MdDeleteOutline} tooltip="Delete" onClick={() => onDelete(user)} color="rgb(210 54 54)" />
            </div>
            <div className="font-semibold text-xl">ID: {user.id}</div>
            <div className="text-xl font-bold mt-4">{user.name}</div>
            <div className="text-gray-500 mt-2 text-[16px]">Email: {user.email}</div>
            <div className="text-gray-500 mt-2 text-[16px]">Phone: {user.phone}</div>
            <div className="text-gray-500 mt-2 text-[16px]">Company: {user.company.name}</div>
          </div>
        ))}
      </div>
      <Drawer className='drawer-mobile' size={'lg'} open={drawerOpen} onClose={() => setDrawerOpen(false)} placement="bottom">
        <Drawer.Header>
          <Drawer.Title>Sort Users</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <RadioGroup className='mob-sort' value={pendingSortType} onChange={handleSortChange}>
            <Radio value="id">Sort by ID</Radio>
            <Radio value="name">Sort by Name</Radio>
            <Radio value="email">Sort by Email</Radio>
          </RadioGroup>
          <Button className='sortbtn' appearance="primary" onClick={applySort}>
            Apply Sorting
          </Button>
        </Drawer.Body>
      </Drawer>
    </>
  );
};

export default UsersCards;
