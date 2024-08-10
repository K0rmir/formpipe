import React, { createContext, useState, useEffect, useContext } from 'react';
import { User, UsersContextState, defaultUsersContextState } from '@/lib/interfaces.ts';

const UsersContext = createContext<UsersContextState>(defaultUsersContextState);

export default function UsersProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);

  // Get users for main userslist page grid/table components //
  function getUsers() {
    fetch('http://localhost:3000/users')
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }

  return (
    <UsersContext.Provider
      value={{
        users,
        getUsers,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}

export function useUsersContext() {
  return useContext(UsersContext);
}
