"use client";
import React from "react";
import { MarkdownRenderer } from "@/components/MarkDown";
import DOMPurify from "dompurify";

interface BlogDisplayProps {
  blog: {
    id: string;
    title: string;
    content: string;
    imageUrl?: string;
    contentType?: string; // 'html' or 'markdown'
    createdAt: string;
    updatedAt: string;
  };
}

const BlogDisplay = ({ blog }: any) => {
  // Determine if content is markdown (either by explicit contentType or by heuristic)
  const isMarkdown = blog.contentType === 'markdown' || isLikelyMarkdown(blog.content);
  
  // Function to detect if content seems to be markdown
  function isLikelyMarkdown(content: string) {
    // Simple heuristic to detect common markdown patterns at the start of a string
    const markdownPatterns = [
      /^#+ /m,                    // Headers
      /^\s*[\*\-\+] /m,           // Unordered lists
      /^\s*\d+\. /m,              // Ordered lists
      /^\s*```/m,                 // Code blocks
      /^\s*>/m,                   // Blockquotes
      /\[.+\]\(.+\)/m,            // Links
      /!\[.+\]\(.+\)/m,           // Images
      /\*\*.+\*\*/m,              // Bold
      /\*.+\*/m,                  // Italic
      /^---/m,                    // Horizontal rules
      /^___/m,                    // Horizontal rules
      /^\|.+\|.+\|/m              // Tables
    ];
    
    return markdownPatterns.some(pattern => pattern.test(content));
  }

  return (
    <article className="w-full max-w-4xl mx-auto my-8 px-4">
      {/* Blog header */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{blog.title}</h1>
        <div className="text-gray-600 mb-4">
          {new Date(blog.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
          {blog.updatedAt !== blog.createdAt && (
            <span className="ml-2 text-sm">
              (Updated: {new Date(blog.updatedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })})
            </span>
          )}
        </div>
        
        {/* Featured image */}
        {blog.imageUrl && (
          <div className="mb-8">
            <img 
              src={blog.imageUrl} 
              alt={`Featured image for ${blog.title}`}
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
        )}
      </header>
      
      {/* Blog content */}
      <div className="blog-content">
        {isMarkdown ? (
          <MarkdownRenderer content={blog.content} />
        ) : (
          <div 
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content) }}
          />
        )}
      </div>
    </article>
  );
};

export default BlogDisplay;