'use server';

import { redirect } from 'next/navigation';

export async function search(term: string | null) {
    if (!term || typeof term !== 'string') redirect('/');
    redirect(`/search?term=${term}`);
}