export type DeviceType = 'desktop' | 'mobile' | 'tablet' | null;

export type PollFormValues = {
  pollTitle: string;
  pollDescription: string;
  pollOptions: {
    value: string;
    isEditing: boolean;
  }[];
  pollPrivateType: 'public' | 'private';
  pollImageUrl: string | Promise<string>;
  pollStartTime: string | Date | null;
  pollEndTime: string | Date;
  pollStartNow: boolean;
};
