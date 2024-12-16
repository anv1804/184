declare module 'emoji-picker-react' {
  import { FC } from 'react';

  export interface EmojiClickData {
    emoji: string;
    getImageUrl: () => string;
    names: string[];
    unified: string;
    unifiedWithoutSkinTone: string;
  }

  interface Props {
    onEmojiClick: (emojiData: EmojiClickData, event: MouseEvent) => void;
    searchPlaceholder?: string;
    width?: number | string;
    height?: number | string;
    preload?: boolean;
    skinTonesDisabled?: boolean;
    searchDisabled?: boolean;
    lazyLoadEmojis?: boolean;
    theme?: 'light' | 'dark' | 'auto';
  }

  const EmojiPicker: FC<Props>;
  export default EmojiPicker;
} 