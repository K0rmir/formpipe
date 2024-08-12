import React, { createContext, useState, useContext, useEffect } from 'react';
import {
  User,
  UsersContextState,
  defaultUsersContextState,
  UserFilters,
} from '@/lib/interfaces.ts';

const UsersContext = createContext<UsersContextState>(defaultUsersContextState);

export default function UsersProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>([]); // primary data to be consumed by application
  const [usersTableView, setUsersTableView] = useState<boolean>(false); // switch for userrs grid/table view on users page
  const [userFilters, setUserFilters] = useState<UserFilters>({
    // Define filters state
    name: '',
    hair: '',
    eyes: '',
    gender: '',
    glasses: null,
    roles: [],
  });

  useEffect(() => {
    getUsers();
  }, [userFilters]);

  // Build query string depending on filters //
  function constructQueryString(filters: UserFilters) {
    const queryParams = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (value.length > 0) {
          queryParams.append(key, value.join(','));
        }
      } else if (typeof value === 'boolean') {
        if (value) {
          queryParams.append(key, String(value));
        }
      } else if (value) {
        queryParams.append(key, String(value));
      }
    });
    return queryParams.toString();
  }

  // Get users for main userslist page grid/table components //
  function getUsers() {
    const queryString = constructQueryString(userFilters);

    console.log('Query String =', queryString);

    fetch(`http://localhost:3000/users?${queryString}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Data =', data);
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
        userFilters,
        setUserFilters,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}

export function useUsersContext() {
  return useContext(UsersContext);
}
