import { useState } from "react";
import styled from "styled-components";
import Paper from "@mui/material/Paper";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import { Resizable } from "re-resizable";

const FIRST_TIME_HEIGHT = 250;

const RESIZE_DIRS = {
	top: true,
	right: false,
	bottom: false,
	left: false,
	topRight: false,
	bottomRight: false,
	bottomLeft: false,
	topLeft: false,
};

const StyledResizable = styled(Resizable)`
  bottom: 0;
	z-index: 100;
`;

const ResizableDrawer = styled(Paper)`
  position: relative;
  	height: 100%;
		box-shadow: 0 0 ${({ $isResizing }) => $isResizing ? "0" : "12"}px 6px ${({ theme }) => theme.palette.grey[900]};
	
  > .MuiPaper-root {
    height: ${({ $height }) => $height}px;
    overflow: visible;
  }
`;

const Toggler = styled.div`
  height: 12px;
  width: 100%;
  cursor: ns-resize;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.palette.grey[800]};

  svg {
    cursor: grab;
    margin-top: -6px;
  }
`;

const ContentContainer = styled.div`
  height: 100%;
  overflow-y: auto;
`;

const ToggleHandle = ({ onDoubleClick }) => {
	return (
		<Toggler onDoubleClick={onDoubleClick}>
			<DragHandleIcon
				color="action"
				size="small"
			/>
		</Toggler>
	);
};

const ResizableBottomContainer = ({ children, height, minHeight = 0, setHeight }) => {
	const [ownHeight, setOwnHeight] = useState(minHeight);
	const [isResizing, setResizing] = useState(false);
	const effectiveHeight = height || minHeight || (!setHeight && ownHeight);

	const onResizeStop = (e, direction, ref, delta) => {
		setResizing(false);
		const updater = (prev) => prev + delta.height;

		if (setHeight) {
			setHeight(updater);
		} else {
			setOwnHeight(updater);
		}
	};

	const onResizeStart = () => {
		setResizing(true);
	};

	const jumpToDefaultSize = () => {
		//TODO: re-resizable doesnt support dbl-click :( https://github.com/bokuweb/re-resizable/issues/753
		setHeight(FIRST_TIME_HEIGHT);
	};

	return (
		<StyledResizable
			size={{
				height: effectiveHeight,
				width: "100%",
			}}
			maxHeight="60%"
			minHeight={minHeight}
			onResizeStop={onResizeStop}
			onResizeStart={onResizeStart}
			enable={RESIZE_DIRS}
			style={{ position: "fixed" }}
			handleComponent={{
				top: <ToggleHandle onDoubleClick={jumpToDefaultSize}/>,
			}}
			handleStyles={{ top: { zIndex: 2000 } }}
		>
			<ResizableDrawer
				$isResizing={isResizing}
				className="hover-opaque"
				sx={{ bgcolor: "primary" }}
			>
				<ContentContainer>
					{children}
				</ContentContainer>
			</ResizableDrawer>
		</StyledResizable>
	);
};

export default ResizableBottomContainer;
