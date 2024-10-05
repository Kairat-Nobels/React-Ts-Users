import { useEffect, useState } from 'react';
import { useGetUsersQuery, useAddUserMutation, useUpdateUserMutation, useDeleteUserMutation } from '@redux/api/usersApi';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { addUser, updateUser, deleteUser, setUsers } from '@redux/slices/usersSlice';
import { User } from 'types/User';
import UsersTable from '@ui/tables/usersTable';
import { Content, IconButton, Message } from 'rsuite';
import { Spinner } from '@ui/spinner';
import { MdFilterList, MdOutlineAdd } from 'react-icons/md';
import UserModal from './UserModal';
import UserFilter from '@shared/usersFilter';
import toast from 'react-hot-toast';
import ConfirmModal from '@ui/confirmModal';
import { useMediaQuery } from 'react-responsive';
import clsx from 'clsx';
import UsersCards from '@ui/tables/userCardsMob';

const UsersList = () => {
  const { data: usersFromApi, error, isLoading } = useGetUsersQuery();
  const users = useAppSelector((state) => state.users.users);
  const dispatch = useAppDispatch();
  const [addUserMutation] = useAddUserMutation();
  const [updateUserMutation] = useUpdateUserMutation();
  const [deleteUserMutation] = useDeleteUserMutation();

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [openDrawer, setDrawerOpen] = useState(false);
  const [forDelete, setForDelete] = useState<User | null>(null);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);
  const isMobile = useMediaQuery({ maxWidth: 560 });

  useEffect(() => {
    if (users.length === 0 && usersFromApi) {
      dispatch(setUsers(usersFromApi));
    }
  }, [usersFromApi, dispatch, users.length]);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  const handleFilter = (filterValue: string) => {
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(filterValue.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  const handleAdd = () => {
    setSelectedUser(null);
    setOpenModal(true);
  };

  const handleSave = async (user: User) => {
    try {
      if (user.id) {
        await updateUserMutation(user);
        dispatch(updateUser(user));
        toast.success('User updated successfully!');
      } else {
        const lastId = users.length > 0 ? Math.max(...users.map(u => u.id)) : 0;
        const newUser = { ...user, id: lastId + 1 };
        await addUserMutation(newUser);
        dispatch(addUser(newUser));
        toast.success('User added successfully!');
      }
      setOpenModal(false);
    } catch (error) {
      toast.error('Error saving user.');
      console.error('Ошибка при сохранении пользователя:', error);
    }
  };

  const handleDelete = async (user: User | null) => {
    if (user) try {
      await deleteUserMutation(user.id);
      dispatch(deleteUser(user.id));
      toast.success('User deleted successfully!');
    } catch (error) {
      toast.error('Error deleting user.');
      console.error('Ошибка при удалении пользователя:', error);
    }

    setForDelete(null);
  };

  if (isLoading) return <Spinner />;
  if (error) return <Message showIcon type="error" header="Error">Failed to load users.</Message>;
  return (
    <Content className='content-white'>
      <div className={clsx(isMobile ? 'flex-col sticky top-0 z-10 bg-white px-4 pt-4' : 'justify-between px-2 pt-2', 'flex mb-2 pb-2 items-center border-b-2')}>
        {isMobile && <IconButton
          onClick={() => setDrawerOpen(true)}
          className='filter-button'
          icon={<MdFilterList />}
          size='lg'
        />}
        <h3 className='table-title'>Users List</h3>
        {isMobile && <IconButton
          onClick={handleAdd}
          className='button add-button'
          icon={<MdOutlineAdd color='white' size={26} />}
          size='lg'
        />}
        <div className={clsx(isMobile ? 'w-full mt-4' : 'flex gap-4 items-center w-1/2')}>
          <UserFilter onFilter={handleFilter} />
          {!isMobile && <IconButton
            onClick={handleAdd}
            className='createButton'
            appearance="primary"
            endIcon={<MdOutlineAdd color='#fff' size={20} />}
          >
            Add User
          </IconButton>}
        </div>
      </div>
      {
        isMobile ? <UsersCards
          drawerOpen={openDrawer}
          setDrawerOpen={setDrawerOpen}
          users={filteredUsers}
          onEdit={handleEdit}
          onDelete={(user) => setForDelete(user)}
        /> :
          <UsersTable
            users={filteredUsers || []}
            onEdit={handleEdit}
            onDelete={(user) => setForDelete(user)}
          />
      }

      <UserModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={handleSave}
        user={selectedUser}
      />
      <ConfirmModal
        open={forDelete !== null}
        onClose={() => setForDelete(null)}
        onConfirm={() => handleDelete(forDelete)}
        title="Delete User"
        message={`Are you sure you want to delete user ${forDelete?.name}?`}
      />

    </Content >
  );
};

export default UsersList;
