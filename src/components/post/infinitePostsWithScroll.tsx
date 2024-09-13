'use client';

import { Fragment, useEffect } from 'react';
import { api } from "~/trpc/react";
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';

export default function InfinitePostsWithScroll() {
  // eslint-disable-next-line 
  const [ref, inView] = useInView();
  
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = api.post.getInfinite.useInfiniteQuery(
    {
      limit: 5,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );
  
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      void fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (status === 'pending') return <p>Loading...</p>;
  if (status === 'error') return <p>Error fetching posts</p>;

  return (
    <div className="space-y-8">
      {data?.pages.map((group, i) => (
        <Fragment key={i}>
          <div className="space-y-8">
            {group.posts.map((post) => (
              <div key={post.id}>
                <Link href={`/post/${post.id}`}>
                  <div className="border rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
                    <p className="text-muted-foreground mb-4">
                      {post.content && post.content.length > 60 ? post.content.substring(0, 60) + " ..." : post.content}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </Fragment>
      ))}
      {isFetchingNextPage && <p className="text-center">Loading more...</p>}
      {/* eslint-disable-next-line  */}
      <div ref={ref} className="h-10" />
    </div>
  );
}