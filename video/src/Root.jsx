import { Composition } from "remotion";
import { LayrShowcase } from "./LayrShowcase";

export const RemotionRoot = () => {
  return (
    <Composition
      id="LayrShowcase"
      component={LayrShowcase}
      durationInFrames={450}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
