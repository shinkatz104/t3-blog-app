'use client';

import React from 'react';
import { api } from "~/trpc/react";
import { Fragment } from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';

export default function InfinitePosts() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = api.post.getInfinite.useInfiniteQuery(
    {
      limit: 10,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  return (
    <div>
      {status === 'pending' ? (
        <p>Loading...</p>
      ) : status === 'error' ? (
        <p>Error fetching posts</p>
      ) : (
        <div className="space-y-8">
          {data.pages.map((group, i) => (
            <Fragment key={i}>
              <div className="space-y-8">
                {group.posts.map((post) => (
                  <div key={post.id}>
                    <Link href={`/post/${post.id}`}>
                      <div className="border rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
                        <p className="text-muted-foreground mb-4">
                          {post.content && post.content?.length > 60 ? post.content?.substring(0, 60) + " ..." : post.content}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </Fragment>
          ))}
          <Button 
            variant="outline"
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage
              ? 'Loading more...'
              : hasNextPage
              ? 'Read More'
              : 'Nothing more to load'}
          </Button>
        </div>
      )}
    </div>
  );
}