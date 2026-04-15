import useFakeLoader from "../../Hooks/useFakeLoader";
import SkeletonGrid from "./SkeletonGrid";
import SkeletonSlider from "./SkeletonSlider";

const StructureLoader = ({
  type = "grid",
  children,
  time = 1500,
  loading: externalLoading,
  loader,
}) => {
  const fakeLoading = useFakeLoader(time);

  // 🔥 allow external control (API loading)
  const isLoading =
    typeof externalLoading === "boolean"
      ? externalLoading
      : fakeLoading;

  // 🔥 custom loader support
  if (isLoading) {
    if (loader) return loader;

    switch (type) {
      case "slider":
        return <SkeletonSlider />;

      case "grid":
      default:
        return <SkeletonGrid />;
    }
  }

  return children;
};

export default StructureLoader;