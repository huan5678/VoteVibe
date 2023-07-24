"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { useFieldArray, useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Cross2Icon, PlusIcon } from "@radix-ui/react-icons";

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "#/components/ui/form";

import { Button } from "#/components/ui/button";
import Input from "#/components/ui/input";

import { supabase } from "#/lib/utils/connection";
import { RadioGroup, RadioGroupItem } from "#/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import { useToast } from "#/components/ui/use-toast";
import { MdEdit } from "./MdEdit";

export type FormValues = {
  voteTitle: string;
  voteDescription: string;
  voteOptions: {
    value: string;
    isEditing: boolean;
  }[];
  voteType: "public" | "private";
  voteImageUrl: string;
};

const formSchema = z.object({
  voteTitle: z.string().min(2, {
    message: "標題至少要兩個字",
  }),
  voteDescription: z.string().max(1000, {
    message: "內容描述最多 1000 字",
  }),
  voteOptions: z
    .array(z.object({ value: z.string(), isEditing: z.boolean() }))
    .min(1, {
      message: "至少要一個選項",
    }),
  voteType: z.enum(["public", "private"]),
  voteImageUrl: z.string(),
});

function UploadImage({
  onUploadSuccess,
}: {
  onUploadSuccess: (path: string) => void;
}) {
  const { register } = useFormContext<FormValues>();
  const { toast } = useToast();

  const onFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files?.length) {
        const file = event.target.files[0];
        const maxSize = 1024 * 1024 * 5; // SUPABASE limit file size 5MB

        if (file.size > maxSize) {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "The file size exceeds the limit of 5MB.",
          });
          return;
        }

        const filePath = `${Date.now()}-${file.name}`; // Ensure the file name is unique

        const { error } = await supabase.storage
          .from("VoteImages")
          .upload(`VoteCover/${filePath}`, file);

        if (error) {
          console.error("Error uploading image: ", error);
        } else {
          console.log("Image uploaded successfully");
          const { data } = await supabase.storage
            .from("VoteImages")
            .getPublicUrl(`VoteCover/${filePath}`);
          onUploadSuccess(data.publicUrl);
        }
      }
    },
    [onUploadSuccess, toast]
  );
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      {/* @ts-expect-error */}
      <Input
        {...register("voteImageUrl")}
        type="file"
        accept="image/*"
        onChange={onFileChange}
      />
    </div>
  );
}

const VoteContent = ({
  name,
  type,
  value,
}: {
  name: String;
  type: String;
  value?: unknown;
}) => {
  switch (type) {
    case "label":
      const title =
        name === "voteTitle"
          ? "投票活動標題"
          : name === "voteType"
          ? "是否公開"
          : name === "voteOptions"
          ? "投票項目"
          : name === "voteImageUrl"
          ? "投票活動封面"
          : name === "voteDescription"
          ? "投票活動描述"
          : null;
      return (
        <>
          {/* @ts-expect-error */}
          <FormLabel>{title}</FormLabel>
        </>
      );
    case "description":
      const description =
        name === "voteTitle"
          ? "請輸入投票活動標題，不得低於兩個字"
          : name === "voteType"
          ? value === "public"
            ? "所有人都可以看到投票內容"
            : "只有獲得投票連結的人可以看到投票內容"
          : name === "voteOptions"
          ? "投票項目"
          : name === "voteImageUrl"
          ? "圖片大小僅 50MB 以下"
          : name === "voteDescription"
          ? "用於活動的內文說明，支援Markdown語法"
          : null;
      return (
        <>
          {/* @ts-expect-error */}
          <FormDescription>{description}</FormDescription>
        </>
      );
  }
};

export default function VoteForm() {
  const defaultImage = "/ballot_vote.svg";

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      voteTitle: "",
      voteDescription: "",
      voteOptions: [],
      voteType: "public",
      voteImageUrl: defaultImage,
    },
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "voteOptions",
  });

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newOption, setNewOption] = useState("");

  const onSubmit = (data: FormValues) => {
    console.log(form.watch("voteImageUrl"));
    console.log(form.getValues("voteImageUrl"));
    console.log(data);
  };

  return (
    <div className="container flex min-h-screen items-center justify-center">
      <Card className="min-h-[50vh] flex-auto">
        <CardHeader>
          <CardTitle className="text-3xl">發起新投票</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Form {...form}>
            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex justify-between gap-2">
                <FormField
                  control={control}
                  name="voteTitle"
                  render={({ field }) => (
                    <FormItem>
                      <VoteContent name={field.name} type="label" />
                      <FormControl>
                        <Input
                          placeholder="請輸入投票活動的名稱"
                          {...register("voteTitle")}
                        />
                      </FormControl>
                      <VoteContent name={field.name} type="description" />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="voteType"
                  render={({ field }) => (
                    <FormItem>
                      <VoteContent name={field.name} type="label" />
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="public" />
                            </FormControl>
                            <FormLabel className="font-normal">公開</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="private" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              不公開
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <VoteContent
                        name={field.name}
                        type="description"
                        value={field.value}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={control}
                name="voteImageUrl"
                render={({ field }) => (
                  <FormItem>
                    <VoteContent name={field.name} type="label" />
                    <FormControl>
                      <div className="flex gap-4">
                        {field.value.length > 0 && (
                          <Card>
                            <CardContent className="flex items-center justify-center p-2">
                              <Image
                                className="object-cover"
                                src={field.value}
                                alt="image"
                                width={160}
                                height={160}
                              />
                            </CardContent>
                          </Card>
                        )}
                        <div className="flex flex-col gap-4">
                          <UploadImage
                            onUploadSuccess={(path) =>
                              form.setValue("voteImageUrl", path)
                            }
                          />
                          <Button
                            onClick={() =>
                              form.setValue("voteImageUrl", defaultImage)
                            }
                          >
                            使用預設圖片
                          </Button>
                          <VoteContent name={field.name} type="description" />
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="voteOptions"
                render={({ field }) => (
                  <FormItem>
                    <VoteContent name={field.name} type="label" />
                    <FormControl>
                      <div className="flex flex-col gap-2">
                        {fields.map((field, index) => (
                          <div className="flex gap-2" key={field.id}>
                            {index === editingIndex ? (
                              <Input
                                placeholder=""
                                {...register(`voteOptions.${index}.value`)}
                                defaultValue={field.value}
                                onBlur={(e) => {
                                  fields[index].value = e.target.value;
                                  setEditingIndex(null);
                                }}
                              />
                            ) : (
                              <p>{field.value}</p>
                            )}

                            <Button
                              type="button"
                              onClick={() => {
                                if (editingIndex === index) {
                                  setEditingIndex(null);
                                } else {
                                  setEditingIndex(index);
                                }
                              }}
                            >
                              edit
                            </Button>
                            <Button type="button" onClick={() => remove(index)}>
                              <Cross2Icon />
                            </Button>
                          </div>
                        ))}

                        <div className="flex gap-2">
                          <Input
                            placeholder="新增投票選項"
                            value={newOption}
                            onChange={(e) => setNewOption(e.target.value)}
                          />
                          <Button
                            type="button"
                            onClick={() => {
                              const newFields = [
                                ...fields,
                                { value: newOption, isEditing: false },
                              ];
                              setValue("voteOptions", newFields);
                              setNewOption("");
                            }}
                          >
                            <PlusIcon />
                          </Button>
                        </div>
                      </div>
                    </FormControl>
                    <VoteContent name={field.name} type="description" />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="voteDescription"
                render={({ field }) => (
                  <FormItem>
                    <VoteContent name={field.name} type="label" />
                    <FormControl>
                      <MdEdit form={form} field={field} />
                    </FormControl>
                    <VoteContent name={field.name} type="description" />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="ml-auto">
                Create Poll
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
