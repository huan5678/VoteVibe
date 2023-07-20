'use client';

import useTypewriterEffect from '#/hooks/typewriterEffect';

const TypewriterText = ({innerText, stop, className}: any) => {
  console.log('stop', stop);
  const {text, typing}: any = useTypewriterEffect({innerText, stop});
  if (typing === 'isStop' && stop) {
    stop();
  }
  return <span className={`after:animate-blink after:content-['|'] ${className}`}>{text}</span>;
};

export default TypewriterText;
