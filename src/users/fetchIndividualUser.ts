import { useQuery } from '@tanstack/react-query';
import {
    User,
    UserFilters,
} from '../lib/interfaces.ts';
import { useParams } from 'react-router-dom';

const userId: string | undefined = useParams().id;

async function fetchIndividualUser(userId) {

}

export function useUsers() {
    return useQuery({ queryKey: ['individualUser', userId], queryFn: fetchIndividualUser })
}