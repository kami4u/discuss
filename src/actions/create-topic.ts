'use server';

import { z } from 'zod';
import { auth } from '@/auth';
import type { Topic } from '@prisma/client';
import { redirect } from 'next/navigation';
import { db } from '@/db';
import { paths } from '@/paths';
import { revalidatePath } from 'next/cache';

const createTopicSchema = z.object({
    name: z
        .string()
        .min(3)
        .regex(/^[a-z-]+$/, {
            message: 'Name can only contain lowercase letters and hyphens'
        }),
    description: z.string().min(10)
});

type CreateTopicFormState = {
    errors: {
        name?: string[];
        description?: string[];
        _form?: string[];
    };
};

export async function createTopic(formState: CreateTopicFormState, data: FormData): Promise<CreateTopicFormState> {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const parsedData = createTopicSchema.safeParse({
        name: data.get('name'),
        description: data.get('description')
    });

    console.log('Parsed Data:', parsedData);

    if (!parsedData.success) {
        return {
            errors: z.flattenError(parsedData.error).fieldErrors
        };
    }

    const session = await auth();

    if (!session || !session.user) {
        return {
            errors: {
                _form: ['You must be logged in to create a topic']
            }
        };
    }

    let topic: Topic;
    try {
        topic = await db.topic.create({
            data: {
                slug: parsedData.data.name,
                description: parsedData.data.description
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

    revalidatePath('/');
    redirect(paths.topicShow(topic.slug));
}
