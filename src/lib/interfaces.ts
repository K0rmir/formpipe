export type User = {
    id: string;
    name: string;
    avatar: string;
    gender: 'female' | 'male';
    hair: 'black' | 'brown' | 'blonde' | 'red' | 'grey';
    eyes: 'brown' | 'blue' | 'green';
    glasses: boolean;
};

export type userRoles = {
    role: string;
};

export interface UsersContextState {
    users: User[];
    getUsers: () => void;
}

export const defaultUsersContextState: UsersContextState = {
    users: [],
    getUsers: () => { },
};
