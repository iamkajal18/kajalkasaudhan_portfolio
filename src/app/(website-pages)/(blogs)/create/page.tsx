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
import { FontFamily } from "@tiptap/extension-font-family"; // Verify this package
import { FontSize } from "tiptap-extension-font-size"; // Verify this package
import { Youtube } from "@tiptap/extension-youtube";
import { Dropcursor } from "@tiptap/extension-dropcursor";
import { Table } from "@tiptap/extension-table";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableRow } from "@tiptap/extension-table-row";
import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import { lowlight } from "lowlight";
import DOMPurify from "dompurify";
import Turndown from "turndown";
import { marked } from "marked";
import { MarkdownRenderer } from "@/components/MarkDown"; // Ensure this is correctly defined

function Page() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [mode, setMode] = useState("wysiwyg");
  const [markdownContent, setMarkdownContent] = useState("");
  const [error, setError] = useState("");

  // Initialize Turndown for HTML-to-Markdown conversion
  const turndownService = React.useMemo(() => {
    const service = new Turndown({
      headingStyle: "atx",
      codeBlockStyle: "fenced",
      bulletListMarker: "-",
      emDelimiter: "*",
      strongDelimiter: "**",
      linkStyle: "inlined",
    });

    service.addRule("fencedCodeBlock", {
      filter: ["pre"],
      replacement: (content, node) => {
        const codeNode = node.querySelector("code");
        const language = codeNode?.className?.replace("language-", "") || "";
        return `\n\`\`\`${language}\n${codeNode?.textContent || content}\n\`\`\`\n`;
      },
    });

    service.addRule("images", {
      filter: "img",
      replacement: (_, node) => {
        const alt = (node as HTMLImageElement).getAttribute("alt") || "";
        const src = (node as HTMLImageElement).getAttribute("src") || "";
        return `![${alt}](${src})`;
      },
    });

    service.addRule("tables", {
      filter: ["table"],
      replacement: (_, node) => {
        const rows = Array.from(node.querySelectorAll("tr"));
        let output = "";
        const headers = Array.from(rows[0].querySelectorAll("th, td"));
        output += headers.map((cell) => cell.textContent).join(" | ") + "\n";
        output += headers.map(() => "---").join(" | ") + "\n";
        for (let i = 1; i < rows.length; i++) {
          const cells = Array.from(rows[i].querySelectorAll("td"));
          output += cells.map((cell) => cell.textContent).join(" | ") + "\n";
        }
        return output + "\n";
      },
    });

    return service;
  }, []);

  // Initialize Tiptap editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ inline: true, allowBase64: true }),
      Underline,
      TextStyle,
      Color.configure({ types: ["textStyle"] }),
      Link.configure({ openOnClick: false }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Highlight.configure({ multicolor: true }),
      Placeholder.configure({ placeholder: "Write something amazing..." }),
      CharacterCount.configure({ limit: 10000 }),
      FontFamily,
      FontSize,
      Youtube.configure({ inline: false, controls: true }),
      Dropcursor,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      CodeBlockLowlight.configure({ lowlight }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none min-h-[300px] p-4 bg-white dark:bg-gray-800 rounded-b-lg", // Fixed incomplete class
      },
    },
    onUpdate: ({ editor }) => {
      if (mode === "wysiwyg") {
        const html = editor.getHTML();
        const markdown = turndownService.turndown(html);
        setMarkdownContent(markdown);
      }
    },
  });

  // Sync Markdown to WYSIWYG
  useEffect(() => {
    if (mode === "wysiwyg" && editor && markdownContent) {
      const parseResult = marked.parse(markdownContent);
      if (typeof parseResult === "string") {
        const html = DOMPurify.sanitize(parseResult);
        editor.commands.setContent(html);
      } else if (parseResult instanceof Promise) {
        parseResult.then((result) => {
          const html = DOMPurify.sanitize(result);
          editor.commands.setContent(html);
        });
      }
    }
  }, [mode, editor, markdownContent]);

  // Set link
  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href || "";
    const url = window.prompt("URL", previousUrl);
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    if (!isValidUrl(url)) {
      setError("Invalid URL. Please enter a valid URL.");
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    setError("");
  }, [editor]);

  // Add image to editor
  const addImageToEditor = useCallback(
    (url: string) => {
      if (!editor) return;
      if (!isValidUrl(url)) {
        setError("Invalid image URL. Please enter a valid URL.");
        return;
      }
      editor.commands.setImage({ src: url });
      setError("");
    },
    [editor],
  );

  // Add video to editor
  const addVideoToEditor = useCallback(() => {
    if (!editor || !videoUrl) return;
    if (!isValidYouTubeUrl(videoUrl)) {
      setError("Invalid YouTube URL. Please enter a valid YouTube URL.");
      return;
    }
    editor.commands.setYoutubeVideo({ src: videoUrl });
    setShowVideoModal(false);
    setVideoUrl("");
    setError("");
  }, [editor, videoUrl]);

  // URL validation
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const isValidYouTubeUrl = (url: string) => {
    return (
      isValidUrl(url) &&
      (url.includes("youtube.com") || url.includes("youtu.be"))
    );
  };

  // Submit form
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const content = mode === "markdown" ? markdownContent : editor?.getHTML() || "";
      const contentType = mode === "markdown" ? "markdown" : "html";

      const response = await axios.post("/api/add-blog", {
        title,
        content,
        imageUrl,
        contentType,
      });

      if (response.status === 201) {
        router.push("/");
      } else {
        setError("Failed to create blog post. Please try again.");
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      setError("Failed to create blog post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Convert editor content to Markdown
  const convertEditorContentToMarkdown = () => {
    if (editor) {
      const html = editor.getHTML();
      const markdown = turndownService.turndown(html);
      setMarkdownContent(markdown);
      setMode("markdown");
    }
  };

  // Loading state
  if (!editor && mode === "wysiwyg") {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg text-gray-600 dark:text-gray-300">Loading editor...</div>
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-10">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 p-8 my-12 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          <span className="bg-gradient-to-r from-pink-400 to-orange-300 bg-clip-text text-transparent">
            Add
          </span>{" "}
          New Blog Post
        </h2>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>
        )}

        <form onSubmit={submitHandler} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Blog Title"
            className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            aria-label="Blog Title"
          />

          <div className="flex mb-4 border-b border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={() => setMode("wysiwyg")}
              className={`px-4 py-2 font-medium text-sm ${
                mode === "wysiwyg"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
              aria-label="Switch to Rich Text mode"
            >
              Rich Text
            </button>
            <button
              type="button"
              onClick={() => setMode("markdown")}
              className={`px-4 py-2 font-medium text-sm ${
                mode === "markdown"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
              aria-label="Switch to Markdown mode"
            >
              Markdown
            </button>
            <button
              type="button"
              onClick={() => setMode("preview")}
              className={`px-4 py-2 font-medium text-sm ${
                mode === "preview"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
              aria-label="Switch to Preview mode"
            >
              Preview
            </button>
            {mode === "wysiwyg" && (
              <button
                type="button"
                onClick={convertEditorContentToMarkdown}
                className="ml-auto px-4 py-2 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                aria-label="Convert to Markdown"
              >
                Convert to Markdown
              </button>
            )}
          </div>

          {mode === "wysiwyg" && editor && (
            <>
              <BubbleMenu
                editor={editor}
                tippyOptions={{ duration: 100 }}
                className="flex bg-white dark:bg-gray-800 p-1 border border-gray-200 dark:border-gray-700 rounded shadow-lg"
              >
                <button
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${
                    editor.isActive("bold") ? "bg-gray-200 dark:bg-gray-600" : ""
                  }`}
                  title="Bold"
                  aria-label="Toggle bold"
                >
                  <strong>B</strong>
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${
                    editor.isActive("italic") ? "bg-gray-200 dark:bg-gray-600" : ""
                  }`}
                  title="Italic"
                  aria-label="Toggle italic"
                >
                  <em>I</em>
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleUnderline().run()}
                  className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${
                    editor.isActive("underline") ? "bg-gray-200 dark:bg-gray-600" : ""
                  }`}
                  title="Underline"
                  aria-label="Toggle underline"
                >
                  <u>U</u>
                </button>
                <button
                  onClick={setLink}
                  className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${
                    editor.isActive("link") ? "bg-gray-200 dark:bg-gray-600" : ""
                  }`}
                  title="Link"
                  aria-label="Insert or edit link"
                >
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
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
              </BubbleMenu>

              <div className="w-full border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 mb-2">
                <div className="flex flex-wrap items-center gap-2 p-2">
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${
                      editor.isActive("bold") ? "bg-gray-200 dark:bg-gray-600" : ""
                    }`}
                    title="Bold"
                    aria-label="Toggle bold"
                  >
                    <strong>B</strong>
                  </button>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${
                      editor.isActive("italic") ? "bg-gray-200 dark:bg-gray-600" : ""
                    }`}
                    title="Italic"
                    aria-label="Toggle italic"
                  >
                    <em>I</em>
                  </button>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${
                      editor.isActive("underline") ? "bg-gray-200 dark:bg-gray-600" : ""
                    }`}
                    title="Underline"
                    aria-label="Toggle underline"
                  >
                    <u>U</u>
                  </button>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${
                      editor.isActive("strike") ? "bg-gray-200 dark:bg-gray-600" : ""
                    }`}
                    title="Strikethrough"
                    aria-label="Toggle strikethrough"
                  >
                    <s>S</s>
                  </button>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${
                      editor.isActive("codeBlock") ? "bg-gray-200 dark:bg-gray-600" : ""
                    }`}
                    title="Code Block"
                    aria-label="Insert code block"
                  >
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 6h12v12H6zM3 9l3-3 3 3zm12 0l3-3 3 3z"
                      />
                    </svg>
                  </button>

                  <select
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "paragraph") {
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
                      editor.isActive("heading", { level: 1 })
                        ? "1"
                        : editor.isActive("heading", { level: 2 })
                        ? "2"
                        : editor.isActive("heading", { level: 3 })
                        ? "3"
                        : "paragraph"
                    }
                    className="p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    aria-label="Select text type"
                  >
                    <option value="paragraph">Paragraph</option>
                    <option value="1">Heading 1</option>
                    <option value="2">Heading 2</option>
                    <option value="3">Heading 3</option>
                  </select>

                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${
                      editor.isActive("bulletList") ? "bg-gray-200 dark:bg-gray-600" : ""
                    }`}
                    title="Bullet List"
                    aria-label="Toggle bullet list"
                  >
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeWidth="2"
                        d="M8 6h10M8 12h10M8 18h10M4 6h2M4 12h2M4 18h2"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${
                      editor.isActive("orderedList") ? "bg-gray-200 dark:bg-gray-600" : ""
                    }`}
                    title="Numbered List"
                    aria-label="Toggle numbered list"
                  >
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeWidth="2"
                        d="M8 6h10M8 12h10M8 18h10M4 6h2M4 12h2M4 18h2"
                      />
                    </svg>
                  </button>

                  <button
                    type="button"
                    onClick={() => editor.chain().focus().setTextAlign("left").run()}
                    className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${
                      editor.isActive({ textAlign: "left" })
                        ? "bg-gray-200 dark:bg-gray-600"
                        : ""
                    }`}
                    title="Align Left"
                    aria-label="Align text left"
                  >
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeWidth="2"
                        d="M4 6h16M4 10h16M4 14h16M4 18h16"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().setTextAlign("center").run()}
                    className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${
                      editor.isActive({ textAlign: "center" })
                        ? "bg-gray-200 dark:bg-gray-600"
                        : ""
                    }`}
                    title="Align Center"
                    aria-label="Align text center"
                  >
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeWidth="2"
                        d="M4 6h16M7 10h10M7 14h10M4 18h16"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().setTextAlign("right").run()}
                    className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${
                      editor.isActive({ textAlign: "right" })
                        ? "bg-gray-200 dark:bg-gray-600"
                        : ""
                    }`}
                    title="Align Right"
                    aria-label="Align text right"
                  >
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeWidth="2"
                        d="M4 6h16M4 10h10M4 14h10M4 18h16"
                      />
                    </svg>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const url = window.prompt("Enter the URL of the image:");
                      if (url) addImageToEditor(url);
                    }}
                    className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                    title="Insert Image"
                    aria-label="Insert image"
                  >
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeWidth="2"
                        d="M3 3h18v18H3zM7 8h10v8H7z"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowVideoModal(true)}
                    className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                    title="Insert Video"
                    aria-label="Insert YouTube video"
                  >
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeWidth="2"
                        d="M8 6v12l7-6z"
                      />
                    </svg>
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
                    className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                    title="Insert Table"
                    aria-label="Insert table"
                  >
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeWidth="2"
                        d="M3 3h18v18H3zM9 3v18M15 3v18M3 9h18M3 15h18"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="border border-gray-200 dark:border-gray-700 rounded-lg min-h-[300px]">
                <EditorContent editor={editor} />
              </div>
            </>
          )}

          {mode === "markdown" && (
            <div className="flex flex-col space-y-4">
              <textarea
                className="w-full h-96 p-4 border border-gray-200 dark:border-gray-700 rounded-lg font-mono text-sm text-gray-900 dark:text-gray-100"
                value={markdownContent}
                onChange={(e) => setMarkdownContent(e.target.value)}
                placeholder="Write in markdown format..."
                aria-label="Markdown editor"
              />
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-medium mb-2">Preview</h3>
                <MarkdownRenderer content={markdownContent} />
              </div>
            </div>
          )}

          {mode === "preview" && (
            <div className="flex flex-col space-y-4">
              <div className="prose max-w-none p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
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
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
                <h3 className="text-lg font-semibold mb-4">Insert YouTube Video</h3>
                <input
                  type="text"
                  placeholder="Enter YouTube URL"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded mb-4 text-gray-900 dark:text-gray-100"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  aria-label="YouTube video URL"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowVideoModal(false)}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
                    aria-label="Cancel video insertion"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={addVideoToEditor}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    aria-label="Insert YouTube video"
                  >
                    Insert
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
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
                const url =
                  result?.info && typeof result.info === "object" && result.info.secure_url
                    ? result.info.secure_url
                    : "";
                if (url) {
                  setImageUrl(url);
                  setError("");
                } else {
                  setError("Image upload failed. Please try again.");
                }
              }}
              onError={(error) => {
                console.error("Upload error:", error);
                setError("Image upload failed. Please try again.");
              }}
            >
              {({ open }) => (
                <>
                  <button
                    type="button"
                    onClick={() => open()}
                    className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100 px-4 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition"
                    aria-label={imageUrl ? "Change featured image" : "Upload featured image"}
                  >
                    {imageUrl ? "Change Featured Image" : "Upload Featured Image"}
                  </button>
                  {imageUrl && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Featured image preview:
                      </p>
                      <img
                        src={imageUrl.replace(
                          "/upload/",
                          "/upload/w_150,h_100,c_fill,q_auto,f_auto/",
                        )}
                        alt="Featured image preview"
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
            disabled={isSubmitting || (mode === "wysiwyg" && !editor)}
            className={`bg-black dark:bg-gray-900 text-white mt-4 px-4 py-2 rounded-md transition-all duration-300 ${
              isSubmitting
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-800 dark:hover:bg-gray-700"
            }`}
            aria-label="Publish blog post"
          >
            {isSubmitting ? "Creating..." : "Publish Blog Post"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Page;