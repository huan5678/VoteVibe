import {FormDescription, FormLabel} from '#/components/ui/form';

type PollContentProps = {
  name: string;
  type: 'label' | 'description';
  value?: unknown;
};

const PollContent: React.FC<PollContentProps> = ({name, type, value}) => {
  switch (type) {
    case 'label':
      const title =
        name === 'pollTitle'
          ? '投票活動命題'
          : name === 'pollPrivateType'
          ? '是否公開'
          : name === 'pollOptions'
          ? '投票項目'
          : name === 'pollImageUrl'
          ? '投票活動封面'
          : name === 'pollDescription'
          ? '投票活動描述'
          : name === 'pollStartTime'
          ? '排程開始時間'
          : name === 'pollEndTime'
          ? '排程結束時間'
          : name === 'pollStartNow'
          ? '立即開始'
          : null;
      return <FormLabel>{title}</FormLabel>;
    case 'description':
      const description =
        name === 'pollTitle'
          ? '請輸入投票活動標題，不得低於兩個字'
          : name === 'pollPrivateType'
          ? value === 'public'
            ? '所有人都可以看到投票內容'
            : '只有獲得投票連結的人可以看到投票內容'
          : name === 'pollOptions'
          ? '候選項目'
          : name === 'pollImageUrl'
          ? '圖片大小僅 50MB 以下'
          : name === 'pollDescription'
          ? '用於活動的內文說明，支援Markdown語法 (1000 字以內 )'
          : name === 'pollStartTime'
          ? '用於自動排程投票開始的時間'
          : name === 'pollEndTime'
          ? '排程自動結束投票的時間'
          : name === 'pollStartNow'
          ? '完成送出後立即開始投票'
          : null;
      return <FormDescription>{description}</FormDescription>;
  }
};

export default PollContent;
