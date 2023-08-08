export type DeviceType = 'desktop' | 'mobile' | 'tablet' | null;

export type VoteFormValues = {
  voteTitle: string;
  voteDescription: string;
  voteOptions: {
    value: string;
    isEditing: boolean;
  }[];
  voteType: 'public' | 'private';
  voteImageUrl: string | Promise<string>;
  voteStartTime: string | Date | null;
  voteEndTime: string | Date;
  voteStartNow: boolean;
};
