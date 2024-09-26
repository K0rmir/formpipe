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
  const fetchUsers = (id: string | null) => { // This entire function will be moved over to two different custom hooks for users and individual user data fetching 
    console.log("Fetching Users!")
    set({ visible: true }); // Not sure how this will interact with Mantine LoadingOverlay component. Might just be case of 'if (isLoading) set({ visible: true})'

    const constructQueryString = (filters: UserFilters) => { // This can become helper function defined separately in useUsers.ts
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

    const queryParamString = `?${constructQueryString(JSON.parse(sessionStorage.getItem('userFilters') || JSON.stringify(defaultFilters)))}`; // This should be staying the same and just transferred over to fetchUsers func in useUsers
    const userIdQueryString = `/${id}`; // ${id} will be used in getIndividualUser hook
    const queryFormat = id ? userIdQueryString : queryParamString; // This will be redundant as logic for users / individual users will be in two separate hooks

    fetch(`http://localhost:3000/users${queryFormat}`)
      .then((response) => response.json())
      .then((data) => {
        if (id) { // This will be removed from Zustand store and added to custom getIndividualUser hook in useUsers.ts
          set({
            individualUser: {
              ...data,
              roles: data.roles.map((role: string) => getRoleDescriptions(role)),
            },
          });
        } else { // This will be transferred to fetchUsers function in useUsers.ts
          const userRoles = data.map((user: User) => ({
            ...user,
            roles: user.roles.map((role: string) => getRoleDescriptions(role)),
          }));
          set({ users: userRoles }); // No need for this when transferring logic over to useUsers.ts as server state is now handled by tanstack query hook
        }
        set({ visible: false }); // Keep this as this is client state. Similar to above, may need to be if(!isLoading) set ({visible: false})
      })
      .catch((error) => {
        console.error('Could not fetch user data', error)
        set({ visible: false });
      });
  };

  fetchUsers(null);

  // Anything marked with // * will be no longer needed in Zustand as it is server state now handled by Tanstack

  return {
    users: [], // *
    individualUser: undefined, // *
    usersTableView: false,
    visible: false,
    isFiltersOpen: false,
    userFilters: JSON.parse(sessionStorage.getItem('userFilters') || JSON.stringify(defaultFilters)),
    defaultFilters: defaultFilters,
    setUsers: (users: User[]) => set({ users }), // *
    setIndividualUser: (user: User | undefined) => set({ individualUser: user }), // *
    setUsersTableView: (view: boolean) => set({ usersTableView: view }),
    setUserFilters: (filters: UserFilters) => {
      sessionStorage.setItem('userFilters', JSON.stringify(filters));
      set({ userFilters: filters });
    },
    setIsFiltersOpen: (isOpen: boolean) => set({ isFiltersOpen: isOpen }),
    getUsers: fetchUsers // *
  };
});

// Helper function to extract user roles //
function getRoleDescriptions(role: string) { // Transfer over to useUsers.ts
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






