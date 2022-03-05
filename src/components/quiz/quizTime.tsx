import { useEffect, useState } from 'react';
import get from 'lodash/get';
import { ClockCircleOutlined } from '@ant-design/icons';
import { useStopwatch } from 'react-timer-hook';

const QuizTime = (props: any) => {
  let { time, sendEvent, quizDetails } = props;
  const [initialise, setInitialise] = useState(false);
  const stopwatchOffset = new Date();
  const initialTime = get(quizDetails, 'totalLogTime')
    ? parseInt(get(quizDetails, 'totalLogTime', 0))
    : 0;

  stopwatchOffset.setSeconds(stopwatchOffset.getSeconds() + initialTime);
  const { seconds, minutes, hours } = useStopwatch({
    autoStart: true,
    offsetTimestamp: stopwatchOffset,
  });

  useEffect(() => {
    time.current = hours * 60 * 60 + minutes * 60 + seconds;
    if (hours === 0 && minutes === 0 && seconds === 0) {
      return;
    } else {
      if ((seconds - initialTime) % 30 === 0) {
        if (initialise) {
          sendEvent(30);
        } else {
          setInitialise(true);
        }
      }
    }
  }, [seconds]);

  return (
    <span className="theme-color">
      <ClockCircleOutlined /> {hours > 0 ? `${hours} hrs` : ''}{' '}
      {minutes ? ` ${minutes} mins` : ''}
      {seconds ? ` ${seconds} s` : ''}
    </span>
  );
};

export default QuizTime;
