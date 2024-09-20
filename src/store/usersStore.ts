import { create } from "zustand";
import {
  User,
  UserFilters,
  UsersStoreState
} from '../lib/interfaces.ts';


const defaultFilters: UserFilters = {
  name: undefined,
  hair: undefined,
  eyes: undefined,
  gender: undefined,
  glasses: undefined,
  roles: undefined,
};

export const useUsersStore = create<UsersStoreState>((set) => {
  const open = () => set({ visible: true });
  const close = () => set({ visible: false });

  const fetchUsers = (id: string | null) => {
    console.log("Fetching Users!")
    open();
    const constructQueryString = (filters: UserFilters) => {
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
    };

    const queryParamString = `?${constructQueryString(JSON.parse(sessionStorage.getItem('userFilters') || JSON.stringify(defaultFilters)))}`;
    const userIdQueryString = `/${id}`;
    const queryFormat = id ? userIdQueryString : queryParamString;

    fetch(`http://localhost:3000/users${queryFormat}`)
      .then((response) => response.json())
      .then((data) => {
        if (id) {
          set({
            individualUser: {
              ...data,
              roles: data.roles.map((role: string) => getRoleDescriptions(role)),
            },
          });
        } else {
          const userRoles = data.map((user: User) => ({
            ...user,
            roles: user.roles.map((role: string) => getRoleDescriptions(role)),
          }));
          set({ users: userRoles });
        }
        close();
      })
      .catch((error) => console.error('Could not fetch user data', error));
    close();
  }

  fetchUsers(null);

  return {
    users: [],
    individualUser: undefined,
    usersTableView: false,
    visible: false,
    isFiltersOpen: false,
    userFilters: JSON.parse(sessionStorage.getItem('userFilters') || JSON.stringify(defaultFilters)),
    defaultFilters: defaultFilters,
    setUsers: (users: User[]) => set({ users }),
    setIndividualUser: (user: User | undefined) => set({ individualUser: user }),
    setUsersTableView: (view: boolean) => set({ usersTableView: view }),
    setUserFilters: (filters: UserFilters) => {
      sessionStorage.setItem('userFilters', JSON.stringify(filters));
      set({ userFilters: filters });
    },
    setIsFiltersOpen: (isOpen: boolean) => set({ isFiltersOpen: isOpen }),
    open,
    close,
    getUsers: fetchUsers
  };
});

// Helper function to extract user roles //
function getRoleDescriptions(role: string) {
  switch (role) {
    case '1':
      return 'Standard User';
    case '2':
      return 'Administrator';
    case '3':
      return 'Super User';
    case '4':
      return 'Guest User';
  }
};






