import React, { createContext, useState, useContext } from 'react';
import { User, UsersContextState, defaultUsersContextState } from '@/lib/interfaces.ts';

const UsersContext = createContext<UsersContextState>(defaultUsersContextState);

export default function UsersProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);
  const [usersTableView, setUsersTableView] = useState<boolean>(false);

  // Get users for main userslist page grid/table components //
  function getUsers() {
    fetch('http://localhost:3000/users')
      .then((response) => response.json())
      .then((data) => {
        const userRoles = data.map((user: User) => ({
          ...user,
          roles: user.roles.map(getRoleDescriptions),
        }));
        setUsers(userRoles);

        function getRoleDescriptions(role: string) {
          switch (role) {
            case '1':
              return 'Standard User';
            case '2':
              return 'Adminstrator';
            case '3':
              return 'Super User';
            case '4':
              return 'Guest User';
          }
        }
      });
  }

  return (
    <UsersContext.Provider
      value={{
        users,
        getUsers,
        usersTableView,
        setUsersTableView,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}

export function useUsersContext() {
  return useContext(UsersContext);
}
