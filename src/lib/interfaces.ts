import { SetStateAction, Dispatch } from 'react';

export type User = {
    id: string | null;
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
    getUsers: (id: string | null) => void;
    individualUser: User | undefined;
    usersTableView: boolean;
    setUsersTableView: Dispatch<SetStateAction<boolean>>;
    userFilters: UserFilters;
    setUserFilters: Dispatch<SetStateAction<UserFilters>>
    defaultFilters: UserFilters,
    visible: boolean,
    open: () => void;
    close: () => void;
}

export const defaultUsersContextState: UsersContextState = {
    users: [],
    getUsers: () => { },
    individualUser: undefined,
    usersTableView: false,
    setUsersTableView: () => { },
    userFilters: {
        name: undefined,
        hair: undefined,
        eyes: undefined,
        gender: undefined,
        glasses: undefined,
        roles: [],
    },
    setUserFilters: () => { },
    defaultFilters: {
        name: undefined,
        hair: undefined,
        eyes: undefined,
        gender: undefined,
        glasses: undefined,
        roles: [],
    },
    visible: false,
    open: () => { },
    close: () => { },
};

export interface UserFilters {
    name?: string,
    hair?: string,
    eyes?: string,
    gender?: string,
    glasses?: boolean,
    roles?: string[],
}
