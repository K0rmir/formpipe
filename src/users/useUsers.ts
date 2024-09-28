import { useQuery } from '@tanstack/react-query';
import {
  User,
  UserFilters,
} from '../lib/interfaces.ts';

const defaultFilters: UserFilters = {
  name: undefined,
  hair: undefined,
  eyes: undefined,
  gender: undefined,
  glasses: undefined,
  roles: undefined,
};

async function fetchUsers() {
  console.log("Fetching users from Tanstack custom Hook!")
  // LoadingOverlay true //
  let userRoles;
  const queryParamString = `?${constructQueryString(JSON.parse(sessionStorage.getItem('userFilters') || JSON.stringify(defaultFilters)))}`; // This should be staying the same and just transferred over to fetchUsers func in useUsers

  await fetch(`http://localhost:3000/users${queryParamString}`)
    .then((response) => response.json())
    .then((data) => {
      userRoles = data.map((user: User) => ({
        ...user,
        roles: user.roles.map((role: string) => getRoleDescriptions(role)),
      }));
    })
  // Loading Overlay false //
  return userRoles;
}

// Helper function to construct query string //
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

// fetch all users custom hook //
export function useUsers() {
  return useQuery({ queryKey: ['users'], queryFn: fetchUsers });
}

// Todo: implement filter function
// Todo: create new custom hook for fetching individual user data with userid passed as param 







