"use client"
import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  return (
    <div className={`prose prose-lg dark:prose-invert max-w-none ${className}`}>
      <Markdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeRaw, rehypeKatex]}
        components={{
          // Headers
          h1: ({ node, ...props }) => <h1 className="text-4xl font-bold my-6" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-3xl font-bold my-5" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-2xl font-bold my-4" {...props} />,
          h4: ({ node, ...props }) => <h4 className="text-xl font-bold my-3" {...props} />,
          h5: ({ node, ...props }) => <h5 className="text-lg font-bold my-2" {...props} />,
          h6: ({ node, ...props }) => <h6 className="text-base font-bold my-1" {...props} />,
          
          // Code blocks
          code({ node, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : 'text';
            const isInline = !className || !match;
            
            return !isInline ? (
              <div className="my-4 rounded-lg overflow-hidden">
                <SyntaxHighlighter
                  language={language}
                  style={vscDarkPlus}
                  PreTag="div"
                  showLineNumbers={language !== 'text'}
                  wrapLines
                  customStyle={{
                    margin: 0,
                    padding: '1rem',
                    backgroundColor: '#1e1e1e',
                    fontSize: '0.9rem',
                    borderRadius: '0.5rem',
                  }}
                  codeTagProps={{
                    style: {
                      fontFamily: 'var(--font-mono)',
                      lineHeight: '1.5',
                    }
                  }}
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              </div>
            ) : (
              <code 
                className={`${className} bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm`}
                {...props}
              >
                {children}
              </code>
            );
          },
          
          // Images
          img: ({ node, ...props }) => (
            <img
              {...props}
              className="rounded-lg shadow-md my-4 mx-auto max-w-full"
              alt={props.alt || ''}
              loading="lazy"
            />
          ),
          
          // Links
          a: ({ node, ...props }) => (
            <a {...props} className="text-blue-600 hover:underline dark:text-blue-400" target="_blank" rel="noopener noreferrer" />
          ),
          
          // Blockquotes
          blockquote: ({ node, ...props }) => (
            <blockquote
              {...props}
              className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic my-4 text-gray-700 dark:text-gray-300"
            />
          ),
          
          // Tables
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-6">
              <table className="w-full border-collapse" {...props} />
            </div>
          ),
          th: ({ node, ...props }) => (
            <th 
              className="border dark:border-gray-700 p-2 font-semibold text-left bg-gray-100 dark:bg-gray-800" 
              {...props} 
            />
          ),
          td: ({ node, ...props }) => (
            <td className="border dark:border-gray-700 p-2" {...props} />
          ),
          
          // Lists
          ul: ({ node, ...props }) => (
            <ul className="list-disc pl-5 my-4" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal pl-5 my-4" {...props} />
          ),
          li: ({ node, ...props }) => (
            <li className="my-1" {...props} />
          ),
          
          // Horizontal rule
          hr: ({ node, ...props }) => (
            <hr className="my-8 border-gray-200 dark:border-gray-700" {...props} />
          ),
          
          // Paragraphs
          p: ({ node, ...props }) => (
            <p className="my-4 leading-relaxed" {...props} />
          ),
        }}
      >
        {content}
      </Markdown>
    </div>
  );
}