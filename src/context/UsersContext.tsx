import React, { createContext, useState, useContext, useEffect } from 'react';
import {
  User,
  UsersContextState,
  defaultUsersContextState,
  UserFilters,
} from '@/lib/interfaces.ts';
import { useDisclosure } from '@mantine/hooks';

const UsersContext = createContext<UsersContextState>(defaultUsersContextState);

export default function UsersProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>([]); // group user data for table/grid view pages
  const [individualUser, setIndividualUser] = useState<User | undefined>(); // individual user data for UsersView page
  const [usersTableView, setUsersTableView] = useState<boolean>(false); // switch for users grid/table view on users page
  const [visible, { open, close }] = useDisclosure(false); // switch for loading overlay on grid/table/UsersView

  const defaultFilters: UserFilters = {
    name: undefined,
    hair: undefined,
    eyes: undefined,
    gender: undefined,
    glasses: undefined,
    roles: [],
  };
  // Set filters to values from session storage or default if none
  const [userFilters, setUserFilters] = useState<UserFilters>(() => {
    const savedFilters = sessionStorage.getItem('userFilters');
    return savedFilters ? JSON.parse(savedFilters) : defaultFilters;
  });

  useEffect(() => {
    getUsers(null);
  }, [userFilters]);

  // Build query string depending on filters //
  function constructQueryString(filters: UserFilters) {
    const queryParams = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (key === 'roles') {
          queryParams.append(`roles_like`, String(value));
        } else {
          queryParams.append(key, String(value).toLowerCase());
        }
      }
    });
    return queryParams.toString();
  }

  // Get users for main userslist page grid/table components //
  function getUsers(userId: string | null) {
    open();
    const queryParamString = `?${constructQueryString(userFilters)}`;
    const userIdQueryString = `/${userId}`;
    const queryFormat = userId ? userIdQueryString : queryParamString;

    console.log('Query format =', queryFormat);

    fetch(`http://localhost:3000/users${queryFormat}`)
      .then((response) => response.json())
      .then((data) => {
        if (userId) {
          setIndividualUser({
            ...data,
            roles: data.roles.map(getRoleDescriptions),
          });
        } else {
          const userRoles = data.map((user: User) => ({
            ...user,
            roles: user.roles.map(getRoleDescriptions),
          }));
          setUsers(userRoles);
        }
        close();
      });
  }
  // Helper function to extract user roles //
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

  return (
    <UsersContext.Provider
      value={{
        users,
        getUsers,
        individualUser,
        usersTableView,
        setUsersTableView,
        userFilters,
        setUserFilters,
        defaultFilters,
        visible,
        open,
        close,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}

export function useUsersContext() {
  return useContext(UsersContext);
}
