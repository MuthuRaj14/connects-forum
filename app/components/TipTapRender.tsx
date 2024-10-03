"use client"; 
import { EditorContent, useEditor, JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface TipTapReaderProps {
  json: JSONContent | null; // Define the type for the JSON content
}

export const TipTapReader: React.FC<TipTapReaderProps> = ({ json }) => {
  // Initialize a read-only editor with the provided JSON content
  const editor = useEditor({
    extensions: [StarterKit],
    content: json ?? "<p>No content available</p>", // Fallback content if json is null
    editable: false, // Make it read-only
    editorProps: {
      attributes: {
        class: "prose",
      },
    },
  });

  if (!editor) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <EditorContent editor={editor} className="prose" />
    </div>
  );
};
