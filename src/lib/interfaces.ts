import { SetStateAction, Dispatch } from 'react';

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

export interface UsersContextState {
    users: User[];
    getUsers: () => void;
    usersTableView: boolean;
    setUsersTableView: Dispatch<SetStateAction<boolean>>;
    userFilters: UserFilters;
    setUserFilters: Dispatch<SetStateAction<UserFilters>>
}

export const defaultUsersContextState: UsersContextState = {
    users: [],
    getUsers: () => { },
    usersTableView: false,
    setUsersTableView: () => { },
    userFilters: {
        name: undefined,
        hair: undefined,
        eyes: undefined,
        gender: undefined,
        glasses: null,
        roles: [],
    },
    setUserFilters: () => { },
};

export interface UserFilters {
    name?: string,
    hair?: string,
    eyes?: string,
    gender?: string,
    glasses?: boolean | null,
    roles?: string[],
}
