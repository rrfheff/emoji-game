import { useRef, useState } from 'react';

const Index = () => {
  const [step, setStep] = useState(0);
  const [answer, setAnswer] = useState('');
  const [name, setName] = useState('');
  const [hasAnswered, setHasAnswered] = useState(false);
  const [result, setResult] = useState(false);
  const [order, setOrder] = useState(0);
  const [error, setError] = useState('');
  async function verify(answer: string) {
    setError('');
    const res = await fetch(`http://www.w23kg7.top:8899/verify?answer=${answer}&name=${name}`);
    const { right, order, error } = await res.json();
    setHasAnswered(true);
    setResult(right);
    setOrder(order);
    setError(error);
    if (right) {
      setTimeout(() => {
        setResult(false);
        setHasAnswered(false);
      }, 3000);
    }
  }
  return (
    <div className="text-xl flex items-center flex-col mt-200">
      {
        step === 0 && (
          <>
            <label>Enter your name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="text-2xl border border-black" />
            <button className="mt-24 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-20 py-10 me-8 mb-8 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => setStep(1)}>
              Next
            </button>
          </>
        )
      }
      {
        step === 1 && (
          <>
            <label>Enter your answer:</label>
            <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} className="text-2xl border border-black" />
            {hasAnswered && !result && (
              <div className="text-red-500">incorrect</div>
            )}
            {error && (
              <div className="text-red-500">{error}</div>
            )}
            <dialog open={result} className="bg-white w-full h-full text-2xl">
              <p className="text-center text-green-500 text-4xl">Correct!</p>
              <p className="text-center text-2xl">Your order: {order}</p>
            </dialog>
            <button type="button" className="mt-24 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-20 py-10 me-8 mb-8 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => verify(answer)}>
              Verify
            </button>
          </>
        )
      }
    </div>
  );
};

export default Index;
