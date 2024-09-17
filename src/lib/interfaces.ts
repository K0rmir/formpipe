export type User = {
    id: string;
    name: string;
    avatar: string;
    gender: 'female' | 'male';
    hair: 'black' | 'brown' | 'blonde' | 'red' | 'grey';
    eyes: 'brown' | 'blue' | 'green';
    glasses: boolean;
    roles: string[];
};

export type userRoles = {
    role: string;
};

export interface UsersStoreState {
    users: User[];
    individualUser: User | undefined;
    usersTableView: boolean;
    visible: boolean;
    isFiltersOpen: boolean;
    userFilters: UserFilters;
    defaultFilters: UserFilters;
    setUsers: (users: User[]) => void;
    setIndividualUser: (user: User | undefined) => void;
    setUsersTableView: (view: boolean) => void;
    setUserFilters: (filters: UserFilters) => void;
    setIsFiltersOpen: (isOpen: boolean) => void;
    getUsers: (id: string | null) => void;
    open: () => void;
    close: () => void;
}

export interface UserFilters {
    name?: string,
    hair?: string,
    eyes?: string,
    gender?: string,
    glasses?: boolean | null,
    roles?: string
}

export interface UserProps {
    users: User[];
    visible: boolean | undefined
}
