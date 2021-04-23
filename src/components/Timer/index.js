import useTimer from "../../hooks/useTimer";

export default function Timer({ onToggle }) {
  const { time: { hour, min }, handleStart, handleStop } = useTimer();

  return (
    <div onClick={handleStart} onSubmit={handleStop}>
      {`${hour}:${min}`}
    </div>
  );
}