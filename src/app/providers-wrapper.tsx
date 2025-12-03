import { fetchTopPosts } from '@/db/queries/posts';
import Providers from './providers';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function ProvidersWrapper({ children }: any) {
  const posts = await fetchTopPosts();
  return <Providers posts={posts}>{children}</Providers>;
}
