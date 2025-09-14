import React, { useEffect, useState } from "react";

const Countdown = ({ date }) => {
  const calculateTimeLeft = () => {
    const eventTime = new Date(date).getTime();
    const now = new Date().getTime();
    const diff = eventTime - now;

    if (diff <= 0) return "Event Started!";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return `${days}d ${hours}h ${minutes}m ${seconds}s left`;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [date]);

  return <div className="countdown">{timeLeft}</div>;
};

export default Countdown;
