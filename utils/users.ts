import { queryOptions } from '@tanstack/react-query'
import ReactDOM from 'react-dom'
import { isServer } from './isServer'

export type UserType = {
  id: number
  name: string
  profilePic: string
}

// Fetch options and <link rel=preload> configuration must match to reuse preloaded data
const fetchOptions = { credentials: 'include', mode: 'no-cors' } as const;

function getUserApiRoutePath() {
  // FIXME: This did not work when called on the client
  // import { Route as ApiRoute } from '~/routes/api/user';
  // return ApiRoute.fullPath;
  return '/api/user';
}

export const userQueryOptions = () => queryOptions({
  queryKey: ['user'],
  queryFn: async () => {
    // Add a timeout to simulated delayed script execution, to make the effect of <link rel="preload"> more apparent
    // await new Promise(resolve => setTimeout(resolve, 1_000));
    
    return fetch(getUserApiRoutePath(), fetchOptions).then(response => response.json() as Promise<UserType>);
  },
});

export function UserQueryPreloadLink() {
  if (isServer()) {
    ReactDOM.preload(getUserApiRoutePath(), { as: 'fetch' });
  }
  return null;
}

function getUserLikeApiRoutePath(postId: string) {
  // FIXME: This did not work when called on the client
  // import { Route as ApiRoute } from '~/routes/api/post.$postId.like';
  // return ApiRoute.fullPath.replace('$postId', props.postId + '');
  return `/api/post/${postId}/like`;
}

export const userLikeQueryOptions = (postId: string) => queryOptions({
  queryKey: ['userLike', postId],
  queryFn: async () => {
    // Add a timeout to simulated delayed script execution, to make the effect of <link rel="preload"> more apparent
    // await new Promise(resolve => setTimeout(resolve, 1_000));
    
    return fetch(getUserLikeApiRoutePath(postId), fetchOptions).then(response => response.json() as Promise<boolean>);
  },
});

export async function UserLikeQueryPreloadLink({ postId }: { postId: string }) {
  if (isServer()) {
    ReactDOM.preload(await getUserLikeApiRoutePath(postId), { as: 'fetch' });
  }
  return null;
}
