'use client';

import dynamic from 'next/dynamic';
import {MDEditorProps, commands} from '@uiw/react-md-editor';
import {Controller, useFieldArray, useForm} from 'react-hook-form';
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

const formSchema = z.object({
  voteTitle: z.string().min(2, {
    message: '標題至少要兩個字',
  }),
  voteDescription: z.string(),
  voteOptions: z.array(z.string()),
});

const MDEditor = dynamic<MDEditorProps>(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  {ssr: false}
);

const Markdown = dynamic(() => import('@uiw/react-markdown-preview').then((mod) => mod.default), {
  ssr: false,
});

export default function VoteForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      voteTitle: '',
      voteDescription: '',
      voteOptions: [''],
    },
  });
  const {fields, append} = useFieldArray({
    control,
    name: 'voteOptions',
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="container flex min-h-screen items-center justify-center">
      <div className="flex min-h-[50vh] flex-auto flex-col justify-between rounded border bg-gray-50/10 p-4 shadow">
        <div className="p-4"></div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormField
            control={control}
            name="voteTitle"
            render={({field}) => (
              <FormItem>
                <FormLabel>{field.name}</FormLabel>
                <FormControl>
                  <Input placeholder="" {...register('voteTitle')} />
                </FormControl>
                <FormDescription>something will happen ...</FormDescription>
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
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormDescription>something will happen...</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="voteOptions"
            render={({field}) => {
              fields.map((option, index) => (
                <FormItem key={option.id}>
                  <FormLabel label={`Option ${index + 1}`} key={option.id}>
                    <Input {...register(`voteOptions[${index}]`)} defaultValue={option} />
                    {errors.voteOptions && errors.voteOptions[index] && (
                      <p>{errors.voteOptions[index].message}</p>
                    )}
                  </FormLabel>
                  <Button type="button" onClick={() => remove(index)}>
                    Remove
                  </Button>
                </FormItem>
              ));
            }}
          />
          <Button type="button" onClick={() => append('')}>
            Add option
          </Button>

          <label htmlFor="voteDescription">Description:</label>
          <Controller
            name="voteDescription"
            control={control}
            render={({field}) => {
              <MDEditor
                id="voteDescription"
                value={field.value}
                onChange={field.onChange}
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
                components={{
                  toolbar: (command, disabled, executeCommand) => {
                    if (command.keyCommand === 'code') {
                      return (
                        <button
                          aria-label="Insert code"
                          disabled={disabled}
                          onClick={(evn) => {
                            evn.stopPropagation();
                            executeCommand(command, command.groupName);
                          }}
                        >
                          Code
                        </button>
                      );
                    }
                  },
                }}
              />;
            }}
          />

          <Button type="submit">Create Poll</Button>
        </Form>
      </div>
    </div>
  );
}
