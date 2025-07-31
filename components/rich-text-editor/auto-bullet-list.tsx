import { Extension } from "@tiptap/core";

// Custom extension for automatic bullet lists (Notion-style)
export const AutoBulletList = Extension.create({
  name: "autoBulletList",

  addInputRules() {
    return [
      {
        find: /^- $/,
        type: "paragraph",
        handler: ({ chain, range }) => {
          chain().deleteRange(range).toggleBulletList().run();
        },
      },
    ];
  },
});
