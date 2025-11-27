'use client';
import { useActionState } from 'react';
import {
  Input,
  Button,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent
} from '@nextui-org/react';
import { createPost } from '@/actions';
import FormButton from '@/components/common/form-button';

type PostCreateFormProps = {
  slug: string;
};
export default function PostCreateForm({ slug }: PostCreateFormProps) {
  const [formState, action, isPending] = useActionState(
    createPost.bind(null, slug),
    {
      errors: {}
    }
  );
  return (
    <Popover>
      <PopoverTrigger>
        <Button color="primary">Create a Post</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4">
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create a Post</h3>
            <Input
              isInvalid={!!formState.errors.title}
              errorMessage={formState.errors.title?.join(', ')}
              name="title"
              label="Title"
              labelPlacement="outside"
              placeholder="Title"
            />
            <Textarea
              isInvalid={!!formState.errors.content}
              errorMessage={formState.errors.content?.join(', ')}
              name="content"
              label="Content"
              labelPlacement="outside"
              placeholder="Content"
            />
            {formState.errors._form && (
              <div className="text-sm text-red-600">
                {formState.errors._form.join(', ')}
              </div>
            )}
            <FormButton isLoading={isPending}>Create Post</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
