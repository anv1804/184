declare module 'emoji-picker-react' {
  import { FC } from 'react';

  export interface EmojiClickData {
    emoji: string;
    names: string[];
    unified: string;
    originalUnified: string;
    activeSkinTone: string;
  }

  interface Props {
    onEmojiClick: (emojiData: EmojiClickData) => void;
    searchPlaceholder?: string;
    width?: number | string;
    height?: number | string;
    preload?: boolean;
    skinTonesDisabled?: boolean;
  }

  const EmojiPicker: FC<Props>;
  export default EmojiPicker;
} 