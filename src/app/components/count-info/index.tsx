type Props = {
  count: number;
  title: string;
};

const CountInfo: React.FC<Props> = ({ count = 0, title = 0 }) => {
  return (
    <div className="flex flex-col items-center space-x-2 p-4">
      <span className="text-4xl font-semibold">{count}</span>
      <span>{title}</span>
    </div>
  );
};

export default CountInfo;
