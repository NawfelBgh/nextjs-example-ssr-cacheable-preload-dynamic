
import { ReactNode } from 'react'
import { fetchPosts } from '@/utils/posts';
import Link from 'next/link';

export default async function PostsComponent({ children }: { children: ReactNode }) {
  const posts = await fetchPosts();
  // const pathname = usePathname()
  // classNames to add when a link is active
  // + (pathname.includes(url) ? ' text-black font-bold' : '')
  const {isNavigating} = useNavigationState();
  
  return (
    <div className="p-2 flex gap-2">
      <ul className="list-disc pl-4">
        {[
          ...posts,
          { id: 'i-do-not-exist', title: 'Non-existent Post' },
        ].map((post) => {
          const url = "/posts/" + post.id;
          return (
            <li key={post.id} className="whitespace-nowrap">
              <Link
                href={url}
                className={"block py-1 text-blue-800 hover:text-blue-600"}
              >
                <div>{post.title.substring(0, 20)}</div>
              </Link>
            </li>
          )
        })}
      </ul>
      <hr />
      <div className={(isNavigating ? ' opacity-50' : '')}>
        { children }
      </div>
    </div>
  )
}

export function useNavigationState() {
  return {isNavigating: false };
}