'use client';

import {
  NavbarItem,
  Button,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent
} from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { signIn, signOut } from '@/actions';

export default function HeaderAuth() {
  const session = useSession();

  let authContent: React.ReactNode;
  if (session.status === 'loading') authContent = null;
  else if (session.data?.user)
    authContent = (
      <Popover placement="left">
        <PopoverTrigger>
          <Avatar src={session.data.user.image || undefined} />
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col gap-2">
            <form action={signOut}>
              <Button type="submit">Sign Out</Button>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    );
  else
    authContent = (
      <>
        <NavbarItem>
          <form action={signIn}>
            <Button type="submit" color="secondary" variant="bordered">
              Login
            </Button>
          </form>
        </NavbarItem>
        <NavbarItem>
          <form action={signOut}>
            <Button type="submit" color="primary" variant="flat">
              Sing Up
            </Button>
          </form>
        </NavbarItem>
      </>
    );

  return authContent;
}
