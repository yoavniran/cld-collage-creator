import styled from "styled-components";
import { motion } from "framer-motion";

const XeroxBar = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 10px;
	left: 0;
	z-index: 1000;
  filter: blur(30px);

  background: linear-gradient(175deg,
  rgba(241, 241, 246, 0.1) 40%,
  rgba(255, 255, 255, 0.5) 60%,
  rgba(245, 254, 255, 1) 100%);

  box-shadow: 0 0 2px 12px #FFF;
`;

const XeroxOverlay = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	left: 0;
	
  background-color: #bbb;
  background-repeat: no-repeat;
  background-image: linear-gradient(to right, #ddd, #777), linear-gradient(to right, #ccc, #777), linear-gradient(to right, #ddd, #777), linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.08), rgba(0,0,0,0)), linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.08), rgba(0,0,0,0)), linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.08), rgba(0,0,0,0)), linear-gradient(to right, rgba(0,0,0,0.2), rgba(0,0,0,0) 3%);

  background-size: .5% 5%, .5% 5%, .5% 5%,
  10% 8%, 10% 8%, 10% 8%,
  100% 100%;

  background-position: 0 10%, 0 50%, 0 90%,
  0  9%, 0 50%, 0 91%,
  0 0;

  .grid-cell {
    .MuiPaper-root {
      filter: brightness(1.1) saturate(1.2) contrast(0.4);
    }
  }

  &:before,
  &:after {
    content: '';
    position: absolute;
  }

  &:before {
    width: calc(100%);
    height: calc(100%);
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    background-repeat: no-repeat;
    background-image: linear-gradient(to right, rgba(255, 255, 255, 0) 60%, rgba(255, 255, 255, 0.25) 65%, rgba(255, 255, 255, 0.2) 75%, rgba(255, 255, 255, 0) 80%), linear-gradient(to right, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.1) 41%, rgba(255, 255, 255, 0.1) 41.5%, rgba(255, 255, 255, 0) 42%), linear-gradient(75deg, rgba(0, 0, 0, 0.4) 15%, rgba(0, 0, 0, 0) 30%), repeating-linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) 2%, rgba(0, 0, 0, 0.15) 5%, rgba(0, 0, 0, 0.15) 7%, rgba(0, 0, 0, 0) 12%), repeating-linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) 0.8%, rgba(0, 0, 0, 0.03) 1%, rgba(0, 0, 0, 0.03) 1.6%);
  }

  &:after {
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 3;
    background-image: linear-gradient(to right, rgba(0, 0, 0, 0) 15%, rgba(0, 0, 0, 0.15) 25%, rgba(0, 0, 0, 0.15) 30%, rgba(0, 0, 0, 0) 40%), linear-gradient(to left, rgba(0, 0, 0, 0) 10%, rgba(0, 0, 0, 0.1) 25%, rgba(0, 0, 0, 0.1) 30%, rgba(0, 0, 0, 0) 40%), linear-gradient(-140deg, rgba(0, 0, 0, 0.02) 2%, rgba(0, 0, 0, 0.07) 3%, rgba(0, 0, 0, 0.08) 3.2%, rgba(255, 255, 255, 0.04) 3.25%, rgba(255, 255, 255, 0.04) 3.5%, rgba(255, 255, 255, 0) 3.55%);
    box-shadow: 2px 1px 0 #ccc, 3px 2px 0 #bbb, 4px 3px 0 #ccc, 6px 4px 0 #aaa, 0 3px 12px rgba(0, 0, 0, 0.2), 6px 5px 7px 1px rgba(0, 0, 0, 0.4);
  }

`;

const XEROX_INITIAL = { top: 0, filter: "blur(30px)" };

const XEROX_ANIMATE = {
	top: "100%",
	filter: "blur(15px)",
	transitionEnd: {
		display: "none",
	},
};

const XEROX_TRANSITION = {
	duration: 0.6,
	ease: "backInOut",
	repeat: 1,
	repeatType: "reverse",
};

const GridXerox = ({ onAnimateFinish }) => {
	// const x = useMotionValue(0);
	// const xSmooth = useSpring(x, { damping: 50, stiffness: 400 });

	const onAnimateDone = () => {
		onAnimateFinish();
	};

	return (
		<>
			<XeroxOverlay />
		<XeroxBar
			initial={XEROX_INITIAL}
			animate={XEROX_ANIMATE}
			transition={XEROX_TRANSITION}
			onAnimationComplete={onAnimateDone}
		/>
		</>
	);
} ;

export default GridXerox;
