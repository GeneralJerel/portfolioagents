declare namespace JSX {
  interface IntrinsicElements {
    'vapi-widget': {
      'public-key': string;
      'assistant-id': string;
      mode?: 'voice' | 'chat';
      theme?: 'light' | 'dark';
      'base-bg-color'?: string;
      'accent-color'?: string;
      'cta-button-color'?: string;
      'cta-button-text-color'?: string;
      'border-radius'?: 'small' | 'medium' | 'large';
      size?: 'small' | 'medium' | 'large' | 'full';
      position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'center';
      title?: string;
      'start-button-text'?: string;
      'end-button-text'?: string;
      'chat-first-message'?: string;
      'chat-placeholder'?: string;
      'voice-show-transcript'?: string;
      'consent-required'?: string;
      'consent-title'?: string;
      'consent-content'?: string;
      'consent-storage-key'?: string;
    };
  }
}









