import React, { createContext, useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  User,
  UsersContextState,
  defaultUsersContextState,
  UserFilters,
} from '@/lib/interfaces.ts';
import { useDisclosure } from '@mantine/hooks';

const UsersContext = createContext<UsersContextState>(defaultUsersContextState);

export default function UsersProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>([]); // primary user data to be consumed by application
  const [individualUser, setIndividualUser] = useState<User | undefined>();
  const [usersTableView, setUsersTableView] = useState<boolean>(false); // switch for userrs grid/table view on users page
  const [visible, { open, close }] = useDisclosure(false);

  const defaultFilters: UserFilters = {
    name: undefined,
    hair: undefined,
    eyes: undefined,
    gender: undefined,
    glasses: undefined,
    roles: [],
  };
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
      if (Array.isArray(value)) {
        if (value.length > 0) {
          queryParams.append(key, value.join(',').toLowerCase());
        }
      } else if (value !== null && value !== undefined) {
        queryParams.append(key, String(value).toLowerCase());
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
