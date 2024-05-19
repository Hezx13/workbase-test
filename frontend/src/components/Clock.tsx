import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';

const Clock = () => {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const formattedTime = new Intl.DateTimeFormat('default', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(time);

  return (
    <Typography variant="h6">
      {formattedTime}
    </Typography>
  );
};

export default Clock;
