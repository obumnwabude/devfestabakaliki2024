import { useEffect, useState } from 'react';

interface UnitProps {
  bgIndex: number;
  colorIndex: number;
  didChange: boolean;
  unit: string;
  value: number;
}

const Unit = ({ didChange, value, unit, colorIndex, bgIndex }: UnitProps) => {
  return (
    <div
      className="rounded-xl p-2 sm:p-4 w-full border-2 animate-movebg animate-countdown"
      style={{ '--bg-i': bgIndex, '--color-i': colorIndex } as any}
    >
      <div
        className={`text-3xl font-bold sm:text-5xl md:text-7xl ${
          didChange || unit === 'seconds' ? 'animate-movedown' : ''
        }`}
      >
        {value < 10 ? `0${value}` : value}
      </div>
      <div className="max-[400px]:text-[8px] text-sm sm:text-base font-medium uppercase">
        {unit}
      </div>
    </div>
  );
};

export const Countdown = () => {
  const timestamp = 1731139200; // 9th Nov, 2024, 9 AM UTC + 1
  const [colors, setColors] = useState(['red', 'green', 'yellow', 'blue']);
  const [colorTicker, setColorTicker] = useState(0);
  const [diff, setDiff] = useState(timestamp - Math.floor(Date.now() / 1000));
  const [secs, setSecs] = useState(diff % 60);
  const [mins, setMins] = useState(Math.floor((diff % 3600) / 60));
  const [hrs, setHrs] = useState(Math.floor((diff % 86400) / 3600));
  const [days, setDays] = useState(Math.floor(diff / 86400));
  const [valuesChanged, setValuesChanged] = useState({
    days: false,
    hrs: false,
    mins: false
  });

  useEffect(() => {
    setValuesChanged({
      days: days != Math.floor(diff / 86400),
      hrs: hrs != Math.floor((diff % 86400) / 3600),
      mins: mins != Math.floor((diff % 3600) / 60)
    });
    setSecs(diff % 60);
    setMins(Math.floor((diff % 3600) / 60));
    setHrs(Math.floor((diff % 86400) / 3600));
    setDays(Math.floor(diff / 86400));
    const interval = setInterval(
      () => setDiff(timestamp - Math.floor(Date.now() / 1000)),
      1000
    );
    return () => clearInterval(interval);
  }, [diff]);

  useEffect(() => {
    setColors([
      colors[colors.length - 1],
      ...colors.slice(0, colors.length - 1)
    ]);
    const interval = setInterval(() => setColorTicker(colorTicker + 1), 3000);
    return () => clearInterval(interval);
  }, [colorTicker]);

  if (diff <= 0) return <></>;

  return (
    <div className="pt-8 sm:pt-16 pb-12 lg:pb-16 max-[448px]:px-0 px-8 text-center max-w-screen-lg mx-auto">
      <h2
        className="text-xl sm:text-3xl underline mb-4 font-bold !bg-clip-text animate-movebg text-transparent"
        style={{ '--bg-i': 2 } as any}
      >
        WE GO LIVE IN
      </h2>
      <div className="flex space-x-4">
        <Unit
          didChange={valuesChanged.days}
          value={days}
          unit="days"
          colorIndex={0}
          bgIndex={3}
        />
        <Unit
          didChange={valuesChanged.hrs}
          value={hrs}
          unit="hours"
          colorIndex={1}
          bgIndex={2}
        />
        <Unit
          didChange={valuesChanged.mins}
          value={mins}
          unit="minutes"
          colorIndex={2}
          bgIndex={1}
        />
        <Unit
          didChange={true}
          value={secs}
          unit="seconds"
          colorIndex={3}
          bgIndex={0}
        />
      </div>
    </div>
  );
};
