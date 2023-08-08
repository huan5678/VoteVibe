'use client';

import {Fragment, useState} from 'react';
import {lowlight} from 'lowlight';
import {useEditor, EditorContent, Editor} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Placeholder from '@tiptap/extension-placeholder';
import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';
import {ControllerRenderProps, UseFormReturn} from 'react-hook-form';

import {Button} from '#/components/ui/button';
import {Separator} from '#/components/ui/separator';

import 'remixicon/fonts/remixicon.css';
import {DeviceType, VoteFormValues} from '#/types';

type MenuItemProps = {
  icon: string;
  title: string;
  action: () => void;
  isActive?: () => boolean;
  device: DeviceType;
};

const MenuItem: React.FC<MenuItemProps> = ({icon, title, action, isActive = null, device}) =>
  device === 'mobile' ? (
    <Button
      variant="ghost"
      type="button"
      className={`${isActive && isActive() ? 'bg-gray-700 text-white' : ''}`}
      onClick={action}
      title={title}
    >
      <i className={`ri-${icon} mr-4`} />
    </Button>
  ) : (
    <Button
      variant="outline"
      size="icon-sm"
      type="button"
      className={`${isActive && isActive() ? 'bg-gray-700 text-white' : ''}`}
      onClick={action}
      title={title}
    >
      <i className={`ri-${icon}`} />
    </Button>
  );

type MenuBarProps = {
  editor: Editor;
  device: 'mobile' | 'tablet' | 'desktop' | null;
};

const MenuBar: React.FC<MenuBarProps> = ({editor, device}) => {
  const [open, setOpen] = useState(false);
  if (!editor) return null;

  const items = [
    {
      icon: 'bold',
      title: 'Bold',
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: () => editor.isActive('bold'),
    },
    {
      icon: 'italic',
      title: 'Italic',
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive('italic'),
    },
    {
      icon: 'strikethrough',
      title: 'Strike',
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: () => editor.isActive('strike'),
    },
    {
      icon: 'code-view',
      title: 'Code',
      action: () => editor.chain().focus().toggleCode().run(),
      isActive: () => editor.isActive('code'),
    },
    {
      type: 'divider',
    },
    {
      type: 'dropdown',
      icons: [
        {
          icon: 'h-1',
          title: 'Heading 1',
          action: () => editor.chain().focus().toggleHeading({level: 1}).run(),
          isActive: () => editor.isActive('heading', {level: 1}),
        },
        {
          icon: 'h-2',
          title: 'Heading 2',
          action: () => editor.chain().focus().toggleHeading({level: 2}).run(),
          isActive: () => editor.isActive('heading', {level: 2}),
        },
        {
          icon: 'h-3',
          title: 'Heading 3',
          action: () => editor.chain().focus().toggleHeading({level: 3}).run(),
          isActive: () => editor.isActive('heading', {level: 3}),
        },
        {
          icon: 'h-4',
          title: 'Heading 4',
          action: () => editor.chain().focus().toggleHeading({level: 4}).run(),
          isActive: () => editor.isActive('heading', {level: 4}),
        },
      ],
    },
    {
      icon: 'paragraph',
      title: 'Paragraph',
      action: () => editor.chain().focus().setParagraph().run(),
      isActive: () => editor.isActive('paragraph'),
    },
    {
      icon: 'list-unordered',
      title: 'Bullet List',
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive('bulletList'),
    },
    {
      icon: 'list-ordered',
      title: 'Ordered List',
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive('orderedList'),
    },
    {
      icon: 'code-box-line',
      title: 'Code Block',
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: () => editor.isActive('codeBlock'),
    },
    {
      type: 'divider',
    },
    {
      icon: 'double-quotes-l',
      title: 'Blockquote',
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: () => editor.isActive('blockquote'),
    },
    {
      icon: 'separator',
      title: 'Horizontal Rule',
      action: () => editor.chain().focus().setHorizontalRule().run(),
    },
    {
      type: 'divider',
    },
    {
      icon: 'text-wrap',
      title: 'Hard Break',
      action: () => editor.chain().focus().setHardBreak().run(),
    },
    {
      icon: 'format-clear',
      title: 'Clear Format',
      action: () => editor.chain().focus().clearNodes().unsetAllMarks().run(),
    },
    {
      type: 'divider',
    },
    {
      icon: 'arrow-go-back-line',
      title: 'Undo',
      action: () => editor.chain().focus().undo().run(),
    },
    {
      icon: 'arrow-go-forward-line',
      title: 'Redo',
      action: () => editor.chain().focus().redo().run(),
    },
  ];

  return (
    <div className="grid grid-cols-3 items-center p-4 pb-6 md:flex md:gap-2 lg:flex-nowrap">
      {items.map((item, index) => (
        <Fragment key={index}>
          {item.type === 'divider' && device !== 'mobile' ? (
            <div className="ml-2 mr-3 h-5 w-[.0625rem] bg-gray-100" />
          ) : item.type === 'dropdown' ? (
            <div className="relative">
              <Button
                variant="outline"
                type="button"
                className="whitespace-nowrap"
                title="Heading"
                onClick={() => setOpen(!open)}
              >
                <span className="mr-2">標題</span>
                <i className="ri-arrow-down-s-line" />
              </Button>
              <div
                className={`${
                  open ? 'visible' : 'invisible'
                } absolute left-0 top-full rounded bg-white shadow-lg`}
              >
                <div className="flex flex-col gap-1 p-2 md:flex-row">
                  {item.icons &&
                    item.icons.map((icon, index) => (
                      <div className="whitespace-nowrap" key={index} onClick={() => setOpen(false)}>
                        <MenuItem {...icon} device={device} />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ) : item.type !== 'divider' ? (
            <MenuItem {...item} device={device} />
          ) : null}
        </Fragment>
      ))}
    </div>
  );
};

type TipTapEditProps = {
  form: UseFormReturn<VoteFormValues, any, undefined>;
  field: ControllerRenderProps<VoteFormValues, 'voteDescription'>;
  device: DeviceType;
};

lowlight.registerLanguage('html', html);
lowlight.registerLanguage('css', css);
lowlight.registerLanguage('js', js);
lowlight.registerLanguage('ts', ts);

const TipTapEdit: React.FC<TipTapEditProps> = ({form, field, device}: TipTapEditProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Highlight,
      Placeholder.configure({
        placeholder: '請輸入內容...',
        emptyNodeClass:
          'cursor-text before:content-[attr(data-placeholder)] before:absolute before:top-2 before:left-2 before:text-mauve-11 before:opacity-50 before-pointer-events-none',
      }),
    ],
    onUpdate({editor}) {
      field.onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none',
      },
    },
  });

  if (!editor) return null;

  return (
    <div className="flex flex-col gap-2 rounded border border-gray-200 shadow">
      <MenuBar editor={editor} device={device} />
      <Separator />
      <EditorContent editor={editor} className="px-6 pb-6 pt-4" />
    </div>
  );
};

export default TipTapEdit;
