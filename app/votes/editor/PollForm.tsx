'use client';

import {useEffect, useState} from 'react';
import Image from 'next/image';
import {useFieldArray, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';
import {Cross2Icon, PlusIcon} from '@radix-ui/react-icons';

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '#/components/ui/form';
import {Button} from '#/components/ui/button';
import Input from '#/components/ui/input';
import {Switch} from '#/components/ui/switch';
import {RadioGroup, RadioGroupItem} from '#/components/ui/radio-group';
import {Card, CardContent, CardHeader, CardTitle} from '#/components/ui/card';
import {Separator} from '#/components/ui/separator';

import {getDeviceType} from '#/lib/utils/getDevice';

import TipTapEdit from './TipTapEdit';
import PollContent from './PollContent';
import UploadImage from './UploadImage';

import {DeviceType, PollFormValues} from '#/types';

const formSchema = z.object({
  pollTitle: z.string().min(2, {
    message: '標題至少要兩個字',
  }),
  pollDescription: z.optional(
    z.string().max(1000, {
      message: '內容描述最多 1000 字',
    })
  ),
  pollOptions: z.array(z.object({value: z.string(), isEditing: z.boolean()})).min(1, {
    message: '至少要一個選項',
  }),
  pollPrivateType: z.enum(['public', 'private']),
  pollImageUrl: z.string(),
  pollStartTime: z.optional(z.string()),
  pollEndTime: z.optional(z.string()),
  pollStartNow: z.boolean(),
});

export default function PollForm() {
  const [defaultImagePath, setDefaultImagePath] = useState('');
  const [deviceType, setDeviceType] = useState<DeviceType>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newOption, setNewOption] = useState('');
  const [defaultEndTime, setDefaultEndTime] = useState<Date | undefined>();

  const form = useForm<PollFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pollTitle: '',
      pollDescription: '',
      pollOptions: [],
      pollPrivateType: 'public',
      pollImageUrl: '',
      pollStartTime: '',
      pollEndTime: defaultEndTime,
      pollStartNow: false,
    },
  });

  const {register, control, handleSubmit, setValue, reset} = form;

  useEffect(() => {
    const fetchRandomImage = async () => {
      const res = await fetch('/api/getRandomImage?images');
      const data = await res.json();
      reset({
        ...form.getValues(),
        pollImageUrl: data.name,
      });
      setDefaultImagePath(data.name);
      const sevenDaysFromNow = new Date();
      sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
      setDefaultEndTime(sevenDaysFromNow);
    };
    fetchRandomImage();
  }, [form, reset]);

  useEffect(() => {
    const handleResize = () => {
      console.log('resize', getDeviceType());
      setDeviceType(getDeviceType());
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const {fields, remove} = useFieldArray({
    control,
    name: 'pollOptions',
  });

  const onSubmit = (data: PollFormValues) => {
    console.log(
      '%csubmit',
      'color: white;background-color:black;padding:4px;border-radius:4px;font-size:14px;font-weight',
      data
    );
  };

  return (
    <Card className="scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-rounded-md scrollbar-track-transparent min-h-[50vh] flex-auto overflow-y-auto">
      <CardHeader>
        <CardTitle className="text-3xl">發起新投票</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Separator />
        <Form {...form}>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col justify-between gap-y-4 md:flex-row md:flex-wrap md:gap-8 lg:flex-nowrap">
              <div className="md:flex-auto">
                <FormField
                  control={control}
                  name="pollTitle"
                  render={({field}) => (
                    <FormItem>
                      <PollContent name={field.name} type="label" />
                      <FormControl>
                        <Input placeholder="請輸入投票活動的名稱" {...register('pollTitle')} />
                      </FormControl>
                      <PollContent name={field.name} type="description" />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={control}
                  name="pollPrivateType"
                  render={({field}) => (
                    <FormItem>
                      <PollContent name={field.name} type="label" />
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
                      <PollContent name={field.name} type="description" value={field.value} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="md:w-full lg:w-auto">
                <FormField
                  control={control}
                  name="pollImageUrl"
                  render={({field}) => (
                    <FormItem>
                      <PollContent name={field.name} type="label" />
                      <FormControl>
                        <div className="flex flex-col gap-4 md:w-full md:flex-row md:gap-8">
                          {defaultImagePath && (
                            <Card>
                              <CardContent className="flex items-center justify-center p-2">
                                <Image
                                  className="rounded-md object-cover"
                                  src={field.value}
                                  alt="image"
                                  width={
                                    deviceType === 'mobile'
                                      ? 768
                                      : deviceType === 'tablet'
                                      ? 250
                                      : 160
                                  }
                                  height={
                                    deviceType === 'mobile'
                                      ? 350
                                      : deviceType === 'tablet'
                                      ? 250
                                      : 160
                                  }
                                />
                              </CardContent>
                            </Card>
                          )}
                          <div className="flex flex-auto flex-col gap-4">
                            <UploadImage
                              onUploadSuccess={(path) => form.setValue('pollImageUrl', path)}
                            />
                            <Button
                              type="button"
                              onClick={() => form.setValue('pollImageUrl', defaultImagePath)}
                            >
                              使用預設圖片
                            </Button>
                            <PollContent name={field.name} type="description" />
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={control}
              name="pollOptions"
              render={({field}) => (
                <FormItem>
                  <PollContent name={field.name} type="label" />
                  <FormControl>
                    <div className="flex flex-col gap-6">
                      {fields.map((field, index) => (
                        <div
                          className={`flex items-center justify-between ${
                            field !== fields.at(-1) ? 'border-b border-gray-200 pb-4' : ''
                          }`}
                          key={field.id}
                        >
                          {index === editingIndex ? (
                            <Input
                              placeholder=""
                              {...register(`pollOptions.${index}.value`)}
                              defaultValue={field.value}
                              onBlur={(e) => {
                                fields[index].value = e.target.value;
                                setEditingIndex(null);
                              }}
                            />
                          ) : (
                            <p>{field.value}</p>
                          )}
                          <div className="flex gap-2">
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
                        </div>
                      ))}

                      <div className="flex items-center gap-2">
                        <Input
                          placeholder="新增投票選項"
                          value={newOption}
                          onChange={(e) => setNewOption(e.target.value)}
                        />
                        <Button
                          type="button"
                          onClick={() => {
                            const newFields = [...fields, {value: newOption, isEditing: false}];
                            setValue('pollOptions', newFields);
                            setNewOption('');
                          }}
                        >
                          <PlusIcon />
                        </Button>
                      </div>
                    </div>
                  </FormControl>
                  <PollContent name={field.name} type="description" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="pollDescription"
              render={({field}) => (
                <FormItem>
                  <PollContent name={field.name} type="label" />
                  <FormControl>
                    <TipTapEdit form={form} field={field} device={deviceType} />
                  </FormControl>
                  <PollContent name={field.name} type="description" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <FormField
                control={control}
                name="pollStartTime"
                render={({field}) => (
                  <FormItem>
                    <PollContent name={field.name} type="label" />
                    <FormControl>
                      <Input
                        type="datetime-local"
                        disabled={form.watch('pollStartNow')}
                        {...register('pollStartTime')}
                      />
                    </FormControl>
                    <PollContent name={field.name} type="description" />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="pollEndTime"
                render={({field}) => (
                  <FormItem>
                    <PollContent name={field.name} type="label" />
                    <FormControl>
                      <Input type="datetime-local" {...register('pollEndTime')} />
                    </FormControl>
                    <PollContent name={field.name} type="description" />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="ms-auto">
                <FormField
                  control={control}
                  name="pollStartNow"
                  render={({field}) => (
                    <FormItem>
                      <PollContent name={field.name} type="label" />
                      <FormControl className="ms-4">
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <PollContent name={field.name} type="description" />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button type="submit" className="ms-auto">
              發起新投票
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
