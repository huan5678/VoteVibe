'use client';

import {useCallback, useEffect, useState} from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import {MDEditorProps, commands} from '@uiw/react-md-editor';
import {useFieldArray, useForm, useFormContext} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '#/components/ui/form';

import {Button} from '#/components/ui/button';
import {Input} from '#/components/ui/input';

import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import {supabase} from '#/lib/utils/connection';
import {Cross2Icon, PlusIcon} from '@radix-ui/react-icons';
import {RadioGroup, RadioGroupItem} from '#/components/ui/radio-group';
import {Card, CardContent, CardHeader, CardTitle} from '#/components/ui/card';

type FormValues = {
  voteTitle: string;
  voteDescription: string;
  voteOptions: {
    value: string;
    isEditing: boolean;
  }[];
  voteType: 'public' | 'private';
  voteImageUrl: string;
};

const formSchema = z.object({
  voteTitle: z.string().min(2, {
    message: '標題至少要兩個字',
  }),
  voteDescription: z.string(),
  voteOptions: z.array(z.object({value: z.string(), isEditing: z.boolean()})),
  voteType: z.enum(['public', 'private']),
  voteImageUrl: z.string(),
});

const MDEditor = dynamic<MDEditorProps>(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  {ssr: false}
);

const Markdown = dynamic(() => import('@uiw/react-markdown-preview').then((mod) => mod.default), {
  ssr: false,
});

function UploadImage({onUploadSuccess}: {onUploadSuccess: (path: string) => void}) {
  const {register} = useFormContext<FormValues>();

  const onFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files?.length) {
        const file = event.target.files[0];
        const filePath = `${file.name}-${Date.now()}`; // Ensure the file name is unique

        const {error} = await supabase.storage.from('VoteImages').upload(filePath, file);

        if (error) {
          console.error('Error uploading image: ', error);
        } else {
          console.log('Image uploaded successfully');
          onUploadSuccess(filePath);
        }
      }
    },
    [onUploadSuccess]
  );

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Input {...register('voteImageUrl')} type="file" accept="image/*" onChange={onFileChange} />
    </div>
  );
}

export default function VoteForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      voteTitle: '',
      voteDescription: '',
      voteOptions: [],
      voteType: 'public',
      voteImageUrl: '',
    },
  });

  const {
    register,
    control,
    handleSubmit,
    formState: {errors},
    setValue,
    trigger,
  } = form;

  const {fields, append, remove} = useFieldArray({
    control,
    name: 'voteOptions',
  });

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newOption, setNewOption] = useState('');

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <div className="container flex min-h-screen items-center justify-center">
      <Card className="min-h-[50vh] flex-auto">
        <CardHeader>
          <CardTitle>
            <h1 className="text-3xl">發起新投票</h1>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Form {...form}>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex justify-between gap-2">
                <FormField
                  control={control}
                  name="voteTitle"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>{field.name}</FormLabel>
                      <FormControl>
                        <Input placeholder="請輸入投票活動的名稱" {...register('voteTitle')} />
                      </FormControl>
                      <FormDescription>something will happen ...</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="voteType"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>{field.name}</FormLabel>
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
                            <FormLabel className="font-normal">不公開</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormDescription>
                        {field.value === 'public'
                          ? '所有人都可以看到投票內容'
                          : '只有獲得投票連結的人可以看到投票內容'}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={control}
                name="voteImageUrl"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>{field.name}</FormLabel>
                    <FormControl>
                      <div className="flex gap-4">
                        {field.value.length > 0 && (
                          <Image src={field.value} alt="image" width={200} height={200} />
                        )}
                        <UploadImage
                          onUploadSuccess={(path) => form.setValue('voteImageUrl', path)}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>上傳內容圖片...</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="voteOptions"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>{field.name}</FormLabel>
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
                              const newFields = [...fields, {value: newOption, isEditing: false}];
                              setValue('voteOptions', newFields);
                              setNewOption('');
                            }}
                          >
                            <PlusIcon />
                          </Button>
                        </div>
                      </div>
                    </FormControl>

                    <FormDescription>something will happen ...</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <label htmlFor="voteDescription">Description:</label>
              <MDEditor
                id="voteDescription"
                value={form.watch('voteDescription')}
                onChange={(value) => form.setValue('voteDescription', value)}
                preview="edit"
                extraCommands={[
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
                      name: 'title',
                      groupName: 'title',
                      buttonProps: {'aria-label': 'Insert title'},
                    }
                  ),
                  commands.divider,
                  commands.fullscreen,
                ]}
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
