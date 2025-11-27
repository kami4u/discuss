// import type { Post } from '@prisma/client';
import { db } from '@/db';

// export type PostWithData = Post & {
//     user: { name: string | null; };
//     topic: { slug: string; };
//     _count: { comments: number; };
// };

export type PostWithData = Awaited<ReturnType<typeof fetchPostsByTopicSlug>>[number];

export function fetchPostsBySearchTerm(term: string): Promise<PostWithData[]> {
    return db.post.findMany({
        include: {
            topic: { select: { slug: true } },
            user: { select: { name: true, image: true } },
            _count: { select: { comments: true } }
        },
        where: {
            OR: [
                { title: { contains: term } },
                { content: { contains: term } }
            ]
        }
    })
}


export async function fetchPostsByTopicSlug(slug: string) {
    return db.post.findMany({
        where: { topic: { slug } },
        include: {
            user: { select: { name: true } },
            topic: { select: { slug: true } },
            _count: { select: { comments: true } },
        },
        orderBy: { createdAt: 'desc' },
    });
}

export function fetchTopPosts(): Promise<PostWithData[]> {
    return db.post.findMany({
        orderBy: [{
            comments: { _count: 'desc' }
        }],
        include: {
            topic: { select: { slug: true } },
            user: { select: { name: true, image: true } },
            _count: { select: { comments: true } }
        },
        take: 5
    })
}