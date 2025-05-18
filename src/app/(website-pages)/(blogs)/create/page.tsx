"use client";
import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { Color } from "@tiptap/extension-color";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import { FontFamily } from "@tiptap/extension-font-family";
import { FontSize } from "tiptap-extension-font-size";
import { Youtube } from "@tiptap/extension-youtube";
import { Dropcursor } from "@tiptap/extension-dropcursor";
import { Table } from "@tiptap/extension-table";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableRow } from "@tiptap/extension-table-row";
import DOMPurify from 'dompurify';
import Turndown from 'turndown';
import { MarkdownRenderer } from "@/components/MarkDown";

function Page() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [mode, setMode] = useState('wysiwyg');
  const [markdownContent, setMarkdownContent] = useState("");
  const [htmlPreview, setHtmlPreview] = useState("");

  // Initialize Turndown with proper configuration
  const turndownService = React.useMemo(() => {
    const service = new Turndown({
      headingStyle: 'atx',
      codeBlockStyle: 'fenced',
      bulletListMarker: '-',
      emDelimiter: '*',
      strongDelimiter: '**',
      linkStyle: 'inlined'
    });

    // Add custom rules for better Markdown conversion
    service.addRule('fencedCodeBlock', {
      filter: ['pre'],
      replacement: function(content, node) {
        const codeNode = node.querySelector('code');
        if (!codeNode) return content;
        
        const language = codeNode.className?.replace('language-', '') || '';
        return `\n\`\`\`${language}\n${codeNode.textContent}\n\`\`\`\n`;
      }
    });

    // service.addRule('images', {
    //   filter: 'img',
    //   replacement: function(content, node) {
    //     const alt = node.getAttribute('alt') || '';
    //     const src = node.getAttribute('src') || '';
    //     return `![${alt}](${src})`;
    //   }
    // });

    service.addRule('tables', {
      filter: ['table'],
      replacement: function(content, node) {
        const rows = Array.from(node.querySelectorAll('tr'));
        let output = '';
        
        // Process header row
        const headers = Array.from(rows[0].querySelectorAll('th, td'));
        output += headers.map(cell => cell.textContent).join(' | ') + '\n';
        output += headers.map(() => '---').join(' | ') + '\n';
        
        // Process body rows
        for (let i = 1; i < rows.length; i++) {
          const cells = Array.from(rows[i].querySelectorAll('td'));
          output += cells.map(cell => cell.textContent).join(' | ') + '\n';
        }
        
        return output + '\n';
      }
    });

    

    service.addRule('keepDivs', {
      filter: ['div'],
      replacement: function(content, node) {
        return `\n${content}\n`;
      }
    });

    return service;
  }, []);

  const editor = useEditor({
    extensions: [
      
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: 'embedded-image'
        }
      }),
      Underline,
      TextStyle,
      Color.configure({ types: ["textStyle"] }),
      Link.configure({
        protocols: ["ftp", "mailto"],
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-link'
        }
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight.configure({ multicolor: true }),
      Placeholder.configure({
        placeholder: "Write something amazing...",
      }),
      CharacterCount.configure({
        limit: 10000,
      }),
      FontFamily,
      FontSize,
      Youtube.configure({
        inline: false,
        controls: true,
        HTMLAttributes: {
          class: 'yt-embed'
        }
      }),
      Dropcursor,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: "",
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none min-h-[300px] p-4 bg-white dark:bg-gray-800 rounded-b-lg",
      },
    },
    onUpdate: ({ editor }) => {
      if (mode === 'wysiwyg') {
        const html = editor.getHTML();
        const markdown = turndownService.turndown(html);
        setMarkdownContent(markdown);
      }
    }
  });

  useEffect(() => {
    if (mode === 'markdown') {
      setHtmlPreview(markdownContent);
    }
  }, [markdownContent, mode]);

  useEffect(() => {
    if (mode === 'wysiwyg' && editor && markdownContent) {
      // This is a placeholder - in a real app you'd convert markdown to HTML
      // and set it in the editor when switching from markdown to WYSIWYG mode
    }
  }, [mode, editor, markdownContent]);

  const setLink = useCallback(() => {
    if (!editor) return;
    
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: url })
      .run();
  }, [editor]);

  const addVideoToEditor = useCallback(() => {
    if (videoUrl && editor) {
      editor.commands.setYoutubeVideo({
        src: videoUrl,
      });
      setShowVideoModal(false);
      setVideoUrl('');
    }
  }, [editor, videoUrl]);

  const addImageToEditor = (url: string) => {
    editor?.commands.setImage({ src: url });
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let content;
      let contentType;

      if (mode === 'markdown') {
        content = markdownContent;
        contentType = 'markdown';
      } else {
        content = editor?.getHTML() || '';
        contentType = 'html';
      }

      const response = await axios.post('/api/add-blog', {
        title,
        content,
        imageUrl,
        contentType
      });

      if (response.status === 201) {
        router.push('/');
      }
    } catch (error) {
      console.error('Error creating blog:', error);
      alert('Failed to create blog post');
    } finally {
      setIsSubmitting(false);
    }
  };

  const convertEditorContentToMarkdown = () => {
    if (editor) {
      const html = editor.getHTML();
      const markdown = turndownService.turndown(html);
      setMarkdownContent(markdown);
      setMode('markdown');
    }
  };

  if (!editor && mode === 'wysiwyg') {
    return <div>Loading editor...</div>;
  }

  return (
    <div className="flex justify-center mt-10">
      <div className="w-full max-w-4xl bg-white p-8 my-12 border border-gray-300 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          <span className="bg-gradient-to-r from-pink-400 to-orange-300 bg-clip-text text-transparent">
            Add
          </span>{" "}
          New Blog Post
        </h2>

        <form onSubmit={submitHandler} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Blog Title"
            className="bg-slate-200 text-black rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <div className="flex mb-4 border-b border-gray-200">
            <button
              type="button"
              onClick={() => setMode('wysiwyg')}
              className={`px-4 py-2 font-medium text-sm ${
                mode === 'wysiwyg'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Rich Text
            </button>
            <button
              type="button"
              onClick={() => setMode('markdown')}
              className={`px-4 py-2 font-medium text-sm ${
                mode === 'markdown'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Markdown
            </button>
            <button
              type="button"
              onClick={() => setMode('preview')}
              className={`px-4 py-2 font-medium text-sm ${
                mode === 'preview'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Preview
            </button>
            {mode === 'wysiwyg' && (
              <button
                type="button"
                onClick={convertEditorContentToMarkdown}
                className="ml-auto px-4 py-2 text-sm text-blue-600 hover:text-blue-800"
              >
                Convert to Markdown
              </button>
            )}
          </div>

          {mode === 'wysiwyg' && editor && (
            <>
              <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
                <div className="flex bg-white p-1 border border-gray-200 rounded shadow-lg">
                  <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`p-1 mx-1 rounded ${
                      editor.isActive('bold') ? 'bg-gray-200' : ''
                    }`}
                    title="Bold"
                  >
                    <strong>B</strong>
                  </button>
                  <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`p-1 mx-1 rounded ${
                      editor.isActive('italic') ? 'bg-gray-200' : ''
                    }`}
                    title="Italic"
                  >
                    <em>I</em>
                  </button>
                  <button
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={`p-1 mx-1 rounded ${
                      editor.isActive('underline') ? 'bg-gray-200' : ''
                    }`}
                    title="Underline"
                  >
                    <u>U</u>
                  </button>
                  <button
                    onClick={setLink}
                    className={`p-1 mx-1 rounded ${
                      editor.isActive('link') ? 'bg-gray-200' : ''
                    }`}
                    title="Link"
                  >
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13.213 9.787a3.391 3.391 0 0 0-4.795 0l-3.425 3.426a3.39 3.39 0 0 0 4.795 4.794l.321-.304m-.321-4.49a3.39 3.39 0 0 0 4.795 0l3.424-3.426a3.39 3.39 0 0 0-4.794-4.795l-1.028.961"
                      />
                    </svg>
                  </button>
                </div>
              </BubbleMenu>

              <div className="w-full border border-gray-200 rounded-lg bg-gray-50 mb-2">
                <div className="flex flex-wrap items-center gap-1 p-2">
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`p-2 rounded hover:bg-gray-200 ${
                      editor.isActive('bold') ? 'bg-gray-200' : ''
                    }`}
                    title="Bold"
                  >
                    <strong>B</strong>
                  </button>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`p-2 rounded hover:bg-gray-200 ${
                      editor.isActive('italic') ? 'bg-gray-200' : ''
                    }`}
                    title="Italic"
                  >
                    <em>I</em>
                  </button>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={`p-2 rounded hover:bg-gray-200 ${
                      editor.isActive('underline') ? 'bg-gray-200' : ''
                    }`}
                    title="Underline"
                  >
                    <u>U</u>
                  </button>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={`p-2 rounded hover:bg-gray-200 ${
                      editor.isActive('strike') ? 'bg-gray-200' : ''
                    }`}
                    title="Strikethrough"
                  >
                    <s>S</s>
                  </button>

                  <select
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === 'paragraph') {
                        editor.chain().focus().setParagraph().run();
                      } else {
                        editor
                          .chain()
                          .focus()
                          .toggleHeading({ level: parseInt(value) as any })
                          .run();
                      }
                    }}
                    value={
                      editor.isActive('heading', { level: 1 })
                        ? '1'
                        : editor.isActive('heading', { level: 2 })
                        ? '2'
                        : editor.isActive('heading', { level: 3 })
                        ? '3'
                        : 'paragraph'
                    }
                    className="p-2 border rounded bg-white"
                  >
                    <option value="paragraph">Paragraph</option>
                    <option value="1">Heading 1</option>
                    <option value="2">Heading 2</option>
                    <option value="3">Heading 3</option>
                  </select>

                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`p-2 rounded hover:bg-gray-200 ${
                      editor.isActive('bulletList') ? 'bg-gray-200' : ''
                    }`}
                    title="Bullet List"
                  >
                    • List
                  </button>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`p-2 rounded hover:bg-gray-200 ${
                      editor.isActive('orderedList') ? 'bg-gray-200' : ''
                    }`}
                    title="Numbered List"
                  >
                    1. List
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      editor.chain().focus().setTextAlign('left').run()
                    }
                    className={`p-2 rounded hover:bg-gray-200 ${
                      editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200' : ''
                    }`}
                    title="Align Left"
                  >
                    ≡
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      editor.chain().focus().setTextAlign('center').run()
                    }
                    className={`p-2 rounded hover:bg-gray-200 ${
                      editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200' : ''
                    }`}
                    title="Align Center"
                  >
                    ≡
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      editor.chain().focus().setTextAlign('right').run()
                    }
                    className={`p-2 rounded hover:bg-gray-200 ${
                      editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200' : ''
                    }`}
                    title="Align Right"
                  >
                    ≡
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const url = window.prompt('Enter the URL of the image:');
                      if (url) {
                        addImageToEditor(url);
                      }
                    }}
                    className="p-2 rounded hover:bg-gray-200"
                    title="Insert Image"
                  >
                    Image
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowVideoModal(true)}
                    className="p-2 rounded hover:bg-gray-200"
                    title="Insert Video"
                  >
                    Video
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      editor
                        .chain()
                        .focus()
                        .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                        .run()
                    }
                    className="p-2 rounded hover:bg-gray-200"
                    title="Insert Table"
                  >
                    Table
                  </button>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg min-h-[300px]">
                <EditorContent editor={editor} />
              </div>
            </>
          )}

          {mode === 'markdown' && (
            <div className="flex flex-col space-y-4">
              <textarea
                className="w-full h-96 p-4 border border-gray-200 rounded-lg font-mono text-sm"
                value={markdownContent}
                onChange={(e) => setMarkdownContent(e.target.value)}
                placeholder="Write in markdown format..."
              />
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium mb-2">Preview</h3>
                <MarkdownRenderer content={markdownContent} />
              </div>
            </div>
          )}

          {mode === 'preview' && (
            <div className="flex flex-col space-y-4">
              <div
                className="prose max-w-none p-4 border border-gray-200 rounded-lg"
              >
                {editor ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(editor.getHTML()),
                    }}
                  />
                ) : (
                  <MarkdownRenderer content={markdownContent} />
                )}
              </div>
            </div>
          )}

          {showVideoModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h3 className="text-lg font-semibold mb-4">Insert YouTube Video</h3>
                <input
                  type="text"
                  placeholder="Enter YouTube URL"
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowVideoModal(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={addVideoToEditor}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Insert
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Featured Image (optional)
            </label>
            <CldUploadWidget
              uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
              options={{
                sources: ["local"],
                multiple: false,
                maxFiles: 1,
              }}
              onSuccess={(result) => {
                let url = "";
                if (
                  result &&
                  typeof result.info === "object" &&
                  result.info !== null &&
                  "secure_url" in result.info
                ) {
                  url = (result.info as { secure_url?: string }).secure_url || "";
                }
                setImageUrl(url);
              }}
              onError={(error) => {
                console.error("Upload error:", error);
                alert("Image upload failed");
              }}
            >
              {({ open }) => (
                <>
                  <button
                    type="button"
                    onClick={() => open()}
                    className="bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-gray-300 transition"
                  >
                    {imageUrl ? "Change Featured Image" : "Upload Featured Image"}
                  </button>
                  {imageUrl && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">Featured image preview:</p>
                      <img
                        src={imageUrl.replace(
                          '/upload/',
                          '/upload/w_25,h_50,c_fill,q_auto,f_auto/'
                        )}
                        alt="Preview"
                        className="mt-2 max-h-40 rounded-md object-cover"
                      />
                    </div>
                  )}
                </>
              )}
            </CldUploadWidget>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || (mode === 'wysiwyg' && !editor)}
            className={`bg-black text-white mt-4 px-4 py-2 rounded-md cursor-pointer transition-all duration-300 ${
              isSubmitting ? "opacity-50" : "hover:bg-gray-800"
            }`}
          >
            {isSubmitting ? "Creating..." : "Publish Blog Post"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Page;