'use client';
import Typewriter from 'typewriter-effect';

interface TypewriterEffectProps {
  content: string[];
  className?: string;
}

export default function TypewriterEffect({content, className}: TypewriterEffectProps) {
  const config = {
    strings: content.map((str) => `<span class=${className}>${str}</span>`),
    autoStart: true,
    loop: true,
  };
  return <Typewriter options={config} />;
}
