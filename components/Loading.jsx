import { GridLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="mt-[15vh] flex w-full flex-1 justify-center">
      <GridLoader color="#C5FF00" />;
    </div>
  );
};

export default Loading;
