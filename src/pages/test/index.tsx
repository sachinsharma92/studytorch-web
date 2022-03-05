import { useStopwatch } from 'react-timer-hook';

const TestScreen = () => {
  const stopwatchOffset = new Date();
  const t = 4300;
  const hr = parseInt(`${t / 3600}`) + 1;
  const min = parseInt(`${(t / 60) % 60}`);
  const sec = t % 60;
  console.log({
    t,
    hr,
    min,
    sec,
  });
  stopwatchOffset.setSeconds(stopwatchOffset.getSeconds() + t);
  // stopwatchOffset.setMinutes(min);
  // stopwatchOffset.setHours(hr);

  const { seconds, minutes, hours } = useStopwatch({
    autoStart: true,
    offsetTimestamp: stopwatchOffset,
  });

  return (
    <p>
      {hours}:{minutes}:{seconds}
    </p>
  );
};

export default TestScreen;

//const hours = parseInt(t/3600)
//const min = parseInt((t/60)%60 )
// const sec=t%60
