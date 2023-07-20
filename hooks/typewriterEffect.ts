import {useEffect, useState} from 'react';

const useTypewriterEffect = ({innerText, stop}: any) => {
  const textState = ['istyping', 'isdeleting', 'isStop'];

  const [typing, setTyping] = useState(textState[0]);

  const [text, setText] = useState('');
  function sleep(ms: any) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (typing === 'istyping' && text !== innerText) {
        setText(innerText.slice(0, text.length + 1));
      } else if (text === innerText && typing === 'istyping') {
        if (stop) {
          setTyping(textState[2]);
        } else {
          sleep(2000).then(() => {
            setTyping(textState[1]);
          });
        }
      } else if ((text === innerText && typing === 'isdeleting') || typing === 'isdeleting') {
        setText(innerText.slice(0, text.length - 1));
        if (text.length <= 2) {
          setTyping(textState[0]);
        }
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [text, typing]);
  return {text, typing};
};

export default useTypewriterEffect;
