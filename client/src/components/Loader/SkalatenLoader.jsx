import useFakeLoader from "../../Hooks/useFakeLoader";
import SkeletonGrid from "./SkeletonGrid";
import SkeletonSlider from "./SkeletonSlider";

const StructureLoader = ({ type = "grid", children, time = 1500 }) => {
  const loading = useFakeLoader(time);

  if (loading) {
    if (type === "slider") return <SkeletonSlider />;
    return <SkeletonGrid />;
  }

  return children;
};

export default StructureLoader;