import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { alpha } from "@mui/system/colorManipulator";
import { isMobile } from "react-device-detect";

const CircleMotion = {
	hidden: { opacity: 0, scale: 0.1 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			ease: "easeIn",
			duration: 0.2,
		}
	},
};

const ActionContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	user-select: none;
`;

const ActionBackground = styled(motion.div)`
  background-color: ${({ theme }) => alpha(theme.palette.secondary.dark, 0.5)};
	padding: 4px;
  border-radius: 100%;
  justify-content: center;
  align-items: center;
	display: flex;
	transition: background-color 0.5s;
  aspect-ratio: 1 / 1;
	
	&:hover {
    background-color: ${({ theme }) => alpha(theme.palette.secondary.dark, 0.75)};
		
		button {
			width: 100%;
		}
	}
	
	button {
		padding: 10px;
	}
`;

const ActionCircle = ({ children, forceShow }) => {
	const show = forceShow || isMobile;

	return show && (
		<ActionContainer className="action-circle-container">
			<ActionBackground
				className="action-circle"
				whileHover={{ scale: 1.2 }}
				whileTap={{ scale: 0.8 }}
				variants={CircleMotion}
				initial="hidden"
				animate="visible"
			>
				{children}
			</ActionBackground>
		</ActionContainer>
	);
};

const OverlayContainer = styled.div`
  display: flex;
  position: absolute;
  width: 1px;
  align-content: center;
  height: 100%;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
  left: 50%;
  transform: translateX(-50%);
  gap: 20px;
`;

const ContainerActions = ({ actions, firstAlwaysShow = false, containerRef, className, delay = 250 }) => {
	const ownRef = useRef(null);
	const [isMouseOver, setMouseOver] = useState(false);
	const mouseOverCounterRef = useRef(null);

	const clearMouseOverHandler = () => {
		if (mouseOverCounterRef.current) {
			clearTimeout(mouseOverCounterRef.current);
			mouseOverCounterRef.current = null;
		}
	};

	useEffect(() => {
		const elm = containerRef?.current || ownRef.current.parentElement;

		const onMouseEnter = () => {
			mouseOverCounterRef.current = setTimeout(() => {
				setMouseOver(true);
			}, delay);
		};

		const onMouseLeave = () => {
			clearMouseOverHandler();
			setMouseOver(false);
		};

		elm.addEventListener("mouseenter", onMouseEnter);
		elm.addEventListener("mouseleave", onMouseLeave);

		return () => {
			clearMouseOverHandler();
			elm.removeEventListener("mouseenter", onMouseEnter);
			elm.removeEventListener("mouseleave", onMouseLeave);
		};
	}, []);

	return (
		<OverlayContainer
			ref={ownRef}
			className={className}
		>
			{actions
				.filter(Boolean)
				.map((action, index) =>
					<ActionCircle
						key={action.key}
						index={index}
						forceShow={action.forceShow || isMouseOver || (index === 0 && firstAlwaysShow)}>
						{action.component}
					</ActionCircle>,
				)}
		</OverlayContainer>
	);
};

export default ContainerActions;
