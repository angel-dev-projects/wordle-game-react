import { useEffect, useState } from "react";

interface CountdownProps {}

const Countdown: React.FC<CountdownProps> = () => {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  const now = new Date();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date().getTime();
      const difference = tomorrow.getTime() - now;

      if (difference <= 0) {
        clearInterval(intervalId);
        setTimeLeft(0);
      } else {
        setTimeLeft(difference);
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [tomorrow]);

  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <div>
      <p>Time until next word:</p>
      <p>
        {hours} hours {minutes} minutes {seconds} seconds
      </p>
    </div>
  );
};

export default Countdown;
