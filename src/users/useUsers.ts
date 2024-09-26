import { useQuery } from '@tanstack/react-query';

async function fetchUsers() {
  const response = await fetch(`http://localhost:3000/users`)

  if (!response.ok) {
    throw new Error("Could not fetch data.")
  };
  return response.json();
}

export function useUsers() {
  return useQuery({ queryKey: ['users'], queryFn: fetchUsers });
}

// Todo: implement roles function
// Todo: implement filter function
// Todo: create new custom hook for fetching individual user data with userid passed as param 







