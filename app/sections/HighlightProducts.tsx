"use client";

import Image from "next/image";
import { useState } from "react";

const posts = [
  {
    category: "Dating & Relationships",
    title: "How Weak Ties Strengthen Our Relationships",
    image: "https://picsum.photos/600/500?random=1",
  },
  {
    category: "Mind & Body",
    title: "What It's Like to Date While Anxious",
    image: "https://picsum.photos/600/500?random=2",
  },
  {
    category: "Wellness Kitchen",
    title: "Golden Milk for Better Sleep",
    image: "https://picsum.photos/600/500?random=3",
  },
  {
    category: "Natural Living",
    title: "Herbal Remedies for Seasonal Fatigue",
    image: "https://picsum.photos/600/500?random=4",
  },
];

export default function HighlightProducts() {
  const [selectedPost, setSelectedPost] = useState(posts[0]);

  return (
    <section id="featured" className="py-16 bg-background dark:bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-light text-navy dark:text-white mb-10">
          Featured Posts
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-6">
            {posts.map((post) => (
              <button
                key={post.title}
                type="button"
                className="post-item block w-full cursor-pointer text-left"
                onClick={() => setSelectedPost(post)}
              >
              <span className="text-xs uppercase text-text-secondary">
                  {post.category}
              </span>
              <h3 className="mt-1 text-xl font-light text-navy dark:text-white">
                  {post.title}
              </h3>
              <hr className="my-4 border-gray-200 dark:border-gray-800" />
              </button>
            ))}
          </div>

          <div className="hidden lg:block shrink-0">
            <Image
              src={selectedPost.image}
              alt={`${selectedPost.title} visual`}
              width={600}
              height={500}
              className="rounded-lg w-full h-auto object-cover shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
