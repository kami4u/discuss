'use server';

import { Post } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { db } from '@/db';
import { auth } from '@/auth';
import { paths } from '@/paths';
import { z } from 'zod';

const createPostSchema = z.object({
    title: z.string().min(3),
    content: z.string().min(10)
});

type CreatePostFormState = {
    errors: {
        title?: string[];
        content?: string[];
        _form?: string[];
    };
}

export async function createPost(slug: string, formState: CreatePostFormState, formData: FormData): Promise<CreatePostFormState> {
    const result = createPostSchema.safeParse({
        title: formData.get('title'),
        content: formData.get('content')
    });

    if (!result.success) {
        return { errors: z.flattenError(result.error).fieldErrors };
    }

    const session = await auth();
    if (!session || !session.user || !session.user.id) {
        return {
            errors: {
                _form: ['You must be logged in to create a post']
            }
        };
    }

    const topic = await db.topic.findFirst({
        where: { slug }
    });

    if (!topic) {
        return {
            errors: {
                _form: ['Topic not found']
            }
        };
    }

    let post: Post;
    try {
        post = await db.post.create({
            data: {
                title: result.data.title,
                content: result.data.content,
                userId: session.user.id,
                topicId: topic.id
            }
        });

    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                errors: {
                    _form: [error.message]
                }
            };
        } else {
            return {
                errors: {
                    _form: ['An unknown error occurred']
                }
            };
        }
    }

    revalidatePath(paths.topicShow(slug));
    redirect(paths.postShow(slug, post.id));

}