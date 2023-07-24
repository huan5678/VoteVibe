import { Button } from "#/components/ui/button";
import { EyeOpenIcon, Pencil1Icon } from "@radix-ui/react-icons";
import { EditorContext, MDEditorProps, commands } from "@uiw/react-md-editor";
import dynamic from "next/dynamic";
import { useContext } from "react";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { FormValues } from "./editor";

const ViewButton = () => {
  const editorContext = useContext(EditorContext);
  const { preview, dispatch } = editorContext;
  const click = () => {
    dispatch &&
      dispatch({
        preview: preview === "edit" ? "preview" : "edit",
      });
  };
  if (preview === "edit") {
    return (
      <Button
        type="button"
        aria-label="edit mode"
        title="編輯模式"
        onClick={click}
      >
        <Pencil1Icon className="h-3 w-3" />
      </Button>
    );
  }
  return (
    <Button
      type="button"
      aria-label="preview mode"
      title="預覽模式"
      onClick={click}
    >
      <EyeOpenIcon className="h-3 w-3" />
    </Button>
  );
};

const codePreview = {
  name: "preview",
  keyCommand: "preview",
  value: "preview",
  icon: <ViewButton />,
};

const MDEditor = dynamic<MDEditorProps>(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);

interface MdEditProps {
  form: UseFormReturn<FormValues, any, undefined>;
  field: ControllerRenderProps<FormValues, "voteDescription">;
}

export const MdEdit = ({ form, field }: MdEditProps) => {
  return (
    <>
      <MDEditor
        id="voteDescription"
        value={form.watch("voteDescription")}
        onChange={(value) => form.setValue("voteDescription", value as string)}
        preview="edit"
        commands={[
          commands.bold,
          commands.italic,
          commands.strikethrough,
          commands.group(
            [
              commands.title1,
              commands.title2,
              commands.title3,
              commands.title4,
              commands.title5,
              commands.title6,
            ],
            {
              name: "title",
              groupName: "title",
              buttonProps: { "aria-label": "Insert title" },
            }
          ),
          commands.divider,
          commands.hr,
          commands.link,
          commands.quote,
          commands.code,
          commands.codeBlock,
          commands.image,
          commands.divider,
          commands.unorderedListCommand,
          commands.orderedListCommand,
          commands.checkedListCommand,
        ]}
        extraCommands={[codePreview, commands.divider, commands.fullscreen]}
      />
    </>
  );
};
