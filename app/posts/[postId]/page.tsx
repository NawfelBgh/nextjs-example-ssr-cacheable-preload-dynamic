import { Suspense } from 'react'
import { UserLike } from '@/components/UserLike'
import { fetchPost } from '@/utils/posts'
import { ClientOnly } from '@/components/ClientOnly'
import { UserLikeQueryPreloadLink } from '@/utils/users'

export default async function PostComponent({ params }: {params: Promise<{ postId: string }>}) {
  const postId = (await params).postId;
  const post = await fetchPost(postId);

  return (
    <div className="space-y-2">
      <h4 className="text-xl font-bold underline">
        {post.title}
        {' '}
        <UserLikeQueryPreloadLink postId={postId} />
        <Suspense fallback='⌛'>
          <ClientOnly fallback='⌛'>
            <UserLike postId={postId} />
          </ClientOnly>
          </Suspense>
      </h4>
      <div className="text-sm">{post.body}</div>
    </div>
  )
}
