import {useCallback} from 'react';
import {useFormContext} from 'react-hook-form';

import Input from '#/components/ui/input';
import {Label} from '#/components/ui/label';
import {useToast} from '#/components/ui/use-toast';
import {supabase} from '#/lib/utils/connection';

import {VoteFormValues} from '#/types';

function UploadImage({onUploadSuccess}: {onUploadSuccess: (path: string) => void}) {
  const {register} = useFormContext<VoteFormValues>();
  const {toast} = useToast();

  const onFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files?.length) {
        const file = event.target.files[0];
        const maxSize = 1024 * 1024 * 5; // SUPABASE limit file size 5MB

        if (file.size > maxSize) {
          toast({
            variant: 'destructive',
            title: 'Uh oh! Something went wrong.',
            description: 'The file size exceeds the limit of 5MB.',
          });
          return;
        }

        const filePath = `${Date.now()}-${file.name}`; // Ensure the file name is unique

        const {error} = await supabase.storage
          .from('VoteImages')
          .upload(`VoteCover/${filePath}`, file);

        if (error) {
          console.error('Error uploading image: ', error);
        } else {
          console.log('Image uploaded successfully');
          const {data} = await supabase.storage
            .from('VoteImages')
            .getPublicUrl(`VoteCover/${filePath}`);
          onUploadSuccess(data.publicUrl);
        }
      }
    },
    [onUploadSuccess, toast]
  );
  return (
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor="picture">上傳圖片</Label>
      <Input
        id="picture"
        {...register('voteImageUrl')}
        type="file"
        accept="image/*"
        onChange={onFileChange}
      />
    </div>
  );
}

export default UploadImage;
