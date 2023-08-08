import {FormDescription, FormLabel} from '#/components/ui/form';

type VoteContentProps = {
  name: string;
  type: 'label' | 'description';
  value?: unknown;
};

const VoteContent: React.FC<VoteContentProps> = ({name, type, value}) => {
  switch (type) {
    case 'label':
      const title =
        name === 'voteTitle'
          ? '投票活動命題'
          : name === 'voteType'
          ? '是否公開'
          : name === 'voteOptions'
          ? '投票項目'
          : name === 'voteImageUrl'
          ? '投票活動封面'
          : name === 'voteDescription'
          ? '投票活動描述'
          : name === 'voteStartTime'
          ? '排程開始時間'
          : name === 'voteEndTime'
          ? '排程結束時間'
          : name === 'voteStartNow'
          ? '立即開始'
          : null;
      return <FormLabel>{title}</FormLabel>;
    case 'description':
      const description =
        name === 'voteTitle'
          ? '請輸入投票活動標題，不得低於兩個字'
          : name === 'voteType'
          ? value === 'public'
            ? '所有人都可以看到投票內容'
            : '只有獲得投票連結的人可以看到投票內容'
          : name === 'voteOptions'
          ? '候選項目'
          : name === 'voteImageUrl'
          ? '圖片大小僅 50MB 以下'
          : name === 'voteDescription'
          ? '用於活動的內文說明，支援Markdown語法 (1000 字以內 )'
          : name === 'voteStartTime'
          ? '用於自動排程投票開始的時間'
          : name === 'voteEndTime'
          ? '排程自動結束投票的時間'
          : name === 'voteStartNow'
          ? '完成送出後立即開始投票'
          : null;
      return <FormDescription>{description}</FormDescription>;
  }
};

export default VoteContent;
