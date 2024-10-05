import React, { useState } from 'react';
import { Input } from 'rsuite';

interface UserFilterProps {
  onFilter: (value: string) => void;
}

const UserFilter: React.FC<UserFilterProps> = ({ onFilter }) => {
  const [filter, setFilter] = useState('');

  const handleInputChange = (value: string) => {
    setFilter(value);
    onFilter(value);
  };

  return (
    <Input
      placeholder="Filter by name..."
      value={filter}
      onChange={handleInputChange}
      className="w-full text-lg sm:text-sm"
    />
  );
};

export default UserFilter;
