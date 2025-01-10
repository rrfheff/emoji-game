import { useRef, useState } from 'react';
import { emojiList } from '@/assets/emoji';

const Index = () => {
  const [index, setIndex] = useState(0);
  const [timer, setTimer] = useState(60);
  const timerIndexRef = useRef(0);
  const emoji = emojiList[index];

  const interval = (timer: number, timerIndex: number) => {
    setTimer(timer);
    if (timer <= 0) {
      return;
    }
    setTimeout(() => {
      if (timerIndexRef.current !== timerIndex) {
        return;
      }
      interval(timer - 1, timerIndex);
    }, 1000);
  };
  async function update(answer: string) {
    interval(60, ++timerIndexRef.current);
    fetch(`http://www.w23kg7.top:8899/update?answer=${answer}`, {
      method: 'GET',
      headers: {
        mode: 'no-cors',
      },
    });
  }
  return (
    <div className="text-xs flex items-center flex-col mt-200">
      <p>
        {[...emoji].map((i, _index) => (
          <p
            className="inline-block"
            style={{ fontSize: '14rem' }}
            key={_index}
          >
            {i}
          </p>
        ))}
      </p>
      <div className="flex p-40">
        {index > 0 && (
          <button
            className="p-20 text-xl"
            onClick={() => {
              setIndex(index - 1);
              timerIndexRef.current++;
            }}
          >
            👈prev
          </button>
        )}
        {index < emojiList.length - 1 && (
          <button
            className="p-20 text-xl"
            onClick={() => {
              setIndex(index + 1);
              timerIndexRef.current++;
            }}
          >
            next👉
          </button>
        )}
      </div>
      <button className="text-2xl" onClick={() => update(emoji)}>
        start
      </button>
      <div className="text-6xl">{timer} s remain</div>
    </div>
  );
};

export default Index;
