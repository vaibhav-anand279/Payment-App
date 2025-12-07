interface HeadersProps {
  label: string;
}

const Headers = ({ label }: HeadersProps) => {
  return (
    <div className="text-4xl font-bold pt-6 text-indigo-700 ">
      {label}
    </div>
  );
};

export default Headers;
