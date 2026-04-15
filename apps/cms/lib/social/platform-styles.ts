export type PlatformId = 'twitter' | 'instagram' | 'linkedin' | 'facebook' | 'tiktok';

export const PLATFORM_STYLES: Record<PlatformId, {
  name: string;
  color: string;
  bgColor: string;
  textColor: string;
  charLimit: number;
  handle: string;
}> = {
  twitter: {
    name: 'X (Twitter)',
    color: '#000000',
    bgColor: '#000000',
    textColor: '#ffffff',
    charLimit: 280,
    handle: '@robroy_konfusion',
  },
  instagram: {
    name: 'Instagram',
    color: '#E1306C',
    bgColor: '#833AB4',
    textColor: '#ffffff',
    charLimit: 2200,
    handle: '@robroykonfusion',
  },
  linkedin: {
    name: 'LinkedIn',
    color: '#0077B5',
    bgColor: '#0077B5',
    textColor: '#ffffff',
    charLimit: 3000,
    handle: 'Rob Roy & Konfusion',
  },
  facebook: {
    name: 'Facebook',
    color: '#1877F2',
    bgColor: '#1877F2',
    textColor: '#ffffff',
    charLimit: 63206,
    handle: 'Rob Roy & Konfusion',
  },
  tiktok: {
    name: 'TikTok',
    color: '#010101',
    bgColor: '#010101',
    textColor: '#ffffff',
    charLimit: 2200,
    handle: '@robroykonfusion',
  },
};

export const PLATFORM_IDS: PlatformId[] = ['twitter', 'instagram', 'linkedin', 'facebook', 'tiktok'];
