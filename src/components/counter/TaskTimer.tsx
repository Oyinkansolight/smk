import { useEffect, useState } from 'react';
import { BiTimer } from 'react-icons/bi';

const TaskTimer = ({ timeLimit }) => {
  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    const countdownDate = new Date().getTime() + timeLimit;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeRemaining('Time Up!');
      } else {
        // const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeRemaining(`${hours}H ${minutes}M ${seconds}S`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='text-3xl font-semibold flex items-center space-x-2'>
      <BiTimer className='text-blue-500' /> <span>{timeRemaining}</span>
    </div>
  );
};

export default TaskTimer;
