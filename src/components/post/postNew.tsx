"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";

export function PostNew() {
  const utils = api.useUtils();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);

  const createPost = api.post.create.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
      setTitle("");
      setContent("");
      setPublished(false);
    },
  });

  return (
    <div className="w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPost.mutate({ title: title, content: content, published: published});
        }}
        className="flex flex-col gap-2"
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-lg px-4 py-2 text-black"
        />
        <textarea
          placeholder="Content"
          rows={15}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full rounded-lg px-4 py-2 text-black"
        />
        <div className="flex items-center space-x-2">
          <Switch id="publish" checked={published} onCheckedChange={setPublished} />
          <Label htmlFor="publish">Publish</Label>
        </div>
        <button
          type="submit"
          className="rounded-lg bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={createPost.isPending}
        >
          {createPost.isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
