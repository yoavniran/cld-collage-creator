import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { SketchPicker } from "react-color";
import { DndProvider, useDrag, useDrop, useDragLayer } from "react-dnd";
import { HTML5Backend, getEmptyImage } from "react-dnd-html5-backend";
import randomColor from "randomcolor";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ScienceIcon from "@mui/icons-material/Science";
import { RingLoader } from "react-spinners";

import createManifest from "./createManifest";
import "./App.css";

const ASSETS_IDS = [
	"conference/fred-tromp-796678-unsplash",
	"conference/boris-misevic-764621-unsplash",
	"conference/aleks-dahlberg-291864-unsplash",
	"conference/adrihani-rashid-219472-unsplash",
	"conference/adrian-188051-unsplash",
	"conference/drew-patrick-miller-4563-unsplash",
	"conference/salmen-bejaoui-1091982-unsplash",
	"conference/weroad-1102821-unsplash",
	"conference/joel-holland-1096388-unsplash",
	"qardsiro5vkq8nzzosb2.jpg",
	"website-donate-mobile_miz3kh.jpg",
];

const DEFAULTS = {
	size: 3,
	color: "#000",
	border: 1,
	cells: [1, 2, 3, 4, 5, 6, 7, 8, 9],
	crop: "scale",

	cloud: "yoav-cloud",
	preset: "uw_unsigned",
};

const getTableData = ({ cells, size }) => {
	const groups = cells.reduce((res, cell, index) => {
		res[cell] = res[cell] || [];
		res[cell].push(index);
		return res;
	}, { });

	const data = Object.entries(groups)
		.reduce((res, [cell, indexes]) => {
			let rows = 1, cols = 1;

			const firstIndex = indexes[0] + 1
			let row = Math.ceil(firstIndex  / size);
			const initRow = row;
			let col = (firstIndex % size) || size;
			const initCol = col;

			if (indexes.length > 1) {
				indexes.forEach((gridIndex, pos) => {
					// const tmpCol = (gridIndex + 1) % size;
					const currentCol = ((gridIndex + 1) % size) || size;

					if (pos > 0)  {
						const currentRow = Math.ceil((gridIndex + 1) / size);

						if (currentRow > row) {
							rows += 1;
							row = currentRow;
						}

						if (currentCol > col) {
							cols += 1;
							col = currentCol;
						}
					}
				});
			}

			res[initRow - 1][initCol - 1] = {
				cell,
				cols,
				rows,
			};

			return res;
		}, new Array(size).fill(null).map(() => new Array(size).fill(null)));

	return data;
};

const generateColors = (count) => randomColor({
		hue: "blue",
		format: "rgba",
		alpha: 0.6,
		count,
	});

const getDefaults = () => {
	const collage =  {
		...DEFAULTS,
		cells: [...DEFAULTS.cells],
		images: {},
		colors: generateColors(DEFAULTS.cells.length),
	};

	collage.tableData = getTableData(collage);

	return collage;
};

const createCollage = (state, setState) => {
	const checkIsReady = (images, tableData) => {
		const isReady = !tableData.find((row) =>
			row.find((data) => data && !images[data.cell]));

		console.log("FOUND READY STATUS = ", isReady);

		return isReady;
	};

	const remapCells = (cells, init = false) => {
		const remapMap = {};
		let current = 1;

		return cells.map((cell) => {
			let res = cell;
			let advance = 0;

			if (init) {
				res = current;
			} else {
				if (remapMap[cell]) {
					res = remapMap[cell];
				} else if (cell > current) {
					res = current;
					remapMap[cell] = current;
					advance = 1
				}
			}

			if (init || cell >= current) {
				advance = 1
			}

			current += advance;

			return res;
		}, []);
	};

	const update = (updated) => {
		setState((latest) => {
			//dont allow cells updates from outside
			delete updated.cells;

			//dont allow images updates from outside
			delete updated.images;

			if (typeof updated.size !== "undefined") {
				if (updated.size) {
					//need to calculate cells
					if (updated.size > latest.size) {
						//add more cells
						const moreCells = Math.pow(updated.size, 2) - latest.cells.length;

						updated.cells = remapCells([
							...latest.cells,
							...new Array(moreCells).fill(null),
							// ...(new Array(moreCells).fill(null).map((_, index) => latest.cells[latest.cells.length - 1] + index + 1)),
						], true);

						updated.colors = generateColors(updated.cells.length);
					} else if (updated.size < latest.size) {
						//remove cells
						const lessCells = (latest.cells.length - Math.pow(updated.size, 2)) * -1;
						updated.cells = latest.cells.slice(0, lessCells);
					}

					updated.tableData = getTableData(updated);
				} else {
					updated.size = latest.size;
				}
			}

			console.log("UPDATING GRID !!!!!!! ", {
				before: latest,
				updated,
			});

			return {
				...latest,
				...updated,
				isReady: checkIsReady(latest.images, updated.tableData || latest.tableData),
			};
		});
	};

	const setCellImage = (cell, id) => {
		setState((latest) => {
			const images = {
				...latest.images,
				[cell]: id,
			};

			return {
				...latest,
				images,
				isReady: checkIsReady(images, latest.tableData),
			};
		});
	};

	const setExpansion = (start, end) => {
		let useStart = start, useEnd = end;

		if (end < start) {
			useStart = end;
			useEnd = start;
		}

		setState((latest) => {
			const { size, cells } = latest;
			const startPos = cells.indexOf(useStart) + 1;
			const startRow = Math.ceil(startPos / size);
			const startCol = (startPos % size) || size;
			const endPos = cells.indexOf(useEnd) + 1;
			const endRow = Math.ceil(endPos / size);
			const endCol = (endPos % size) || size;

			console.log("PLACES ", {
				start: [startRow, startCol],
				end: [endRow, endCol],
			});

			const newCells = [...cells];
			const startIndex = cells.indexOf(useStart) + 1;

			if (startRow === endRow) {
				const colsToChange = endCol - startCol;
				newCells.splice(startIndex, colsToChange, ...(new Array(colsToChange).fill(null).map(() => start)));
			} else if (startCol === endCol) {
				newCells.forEach((_, index) => {
					const col = ((index + 1) % size) || size;
					const row = Math.ceil((index + 1) / size);

					if (col === startCol && row <= endRow) {
						newCells[index] = start;
					}
				});
			} else {
				newCells.forEach((_, index) => {
					const col = ((index + 1) % size) || size;
					const row = Math.ceil((index + 1) / size);

					if (col >= startCol && col <= endCol && row >=startRow && row <= endRow) {
						newCells[index] = start;
					}
				});
			}

			const remapped = remapCells(newCells);

			return {
				...latest,
				cells: remapped,
				tableData: getTableData({ cells: remapped, size }),
			};
		});
	};

	const reset = () => {
		setState((latest) => {
			const newCells =new Array(Math.pow(latest.size, 2)).fill(null).map((_, index) => index + 1);

			return {
				...latest,
				images: {},
				cells: newCells,
				border: DEFAULTS.border,
				color: DEFAULTS.color,
				tableData: getTableData({ cells: newCells, size: latest.size }),
			};
		});
	};

	return {
		update,
		setCellImage,
		setExpansion,
		reset,
		...state,
	};
};

const CollageContext = createContext(null);

const SideMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  border-right: 1px solid #8c8989;
  padding: 10px;
  justify-content: flex-start;
  align-items: center;

  .MuiInputBase-formControl {
    margin-bottom: 10px;

    input {
      min-width: 200px;
    }
  }

  .incdecIcon {
    cursor: pointer;
  }
	
	label {
		position: relative;
	}
`;

const useCollage = () => {
	return useContext(CollageContext);
};

const StyledDivider = styled(Divider)`
  width: 90%;
  color: rgba(98, 101, 105, 0.6);
  margin: 20px 0;
`;

const StyledStack = styled(Stack)`
  width: 100%;
`;

const SideMenu = () => {
	const { cloud, preset, size, color, border, crop, update } = useCollage();

	return <SideMenuContainer>
		<InputLabel>
			Grid Size
		</InputLabel>
		<TextField
			type="number"
			value={size}
			id="outlined-basic"
			variant="outlined"
			onChange={(e) => {
				update({ size: parseInt(e.target.value) });
			}}
			inputProps={{ min: 2, max: 10 }}
		/>

		<br/>
		<InputLabel>
			Grid Border
		</InputLabel>
		<SketchPicker color={color} onChange={({ hex }) => update({ color: hex })}/>

		<br/>
		<InputLabel>
			Border Width
		</InputLabel>
		<StyledStack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
			<RemoveIcon onClick={() => {
				if (border > 1) {
					update({ border: border - 1 });
				}
			}}
			            className="incdecIcon"
			/>
			<Slider
				aria-label="Size"
				value={border}
				onChange={(e, value) => {
					update({ border: value });
				}}
				marks
				step={1}
				min={1}
				max={5}
			/>
			<AddIcon onClick={() => {
				if (border < 5) {
					update({ border: border + 1 });
				}
			}}
			         className="incdecIcon"
			/>
		</StyledStack>

		<br/>
		<InputLabel>
			Crop
		</InputLabel>
		<Select
			sx={{ minWidth: "200px" }}
			value={crop}
			onChange={(e) => {
				update({ crop: e.target.value})
			}}
		>
			<MenuItem value="fill">Fill</MenuItem>
			<MenuItem value="crop">Crop</MenuItem>
			<MenuItem value="scale">Scale</MenuItem>
			<MenuItem value="fit">Fit</MenuItem>
		</Select>

		<StyledDivider/>

		<InputLabel>
			Cloud Name
		</InputLabel>
		<TextField value={cloud} id="outlined-basic" variant="outlined"/>

		<InputLabel>
			Upload Preset
		</InputLabel>
		<TextField value={preset} id="outlined-basic" variant="outlined"/>
	</SideMenuContainer>;
};

const GRID_SIZE = 900;

const GridBox = styled(Box)`
  width: ${GRID_SIZE}px;
  height: ${GRID_SIZE}px;
  margin: 0 20px;
  //border: solid ${({ $color, $border }) => `${$border}px ${$color}`};
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  background-color: ${({ $color }) => $color};
	position: relative;
`;

const CellContainer = styled(Paper)`
  ${({ $size }) => `
		width: ${$size}px;
		height: ${$size}px;
	`}

  color: #f1f1f1;
  position: relative;
  z-index: 1;
  background-color: transparent;
  margin-bottom: ${({ $border }) => $border}px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: bold;
  //background-color: rgb(53, 255, 1);
  ${({ $imgOver }) => $imgOver ? "background-color: #35FF01FF;" : ""}
  ${({
       $otherCellOver,
       $otherCellAllowed
     }) => $otherCellOver ? `background-color: ${$otherCellAllowed ? "rgba(255,177,0,0.84)" : "#E52760FF"};` : ""}
  ${({ $dragLayer }) => $dragLayer ? "background-color: #FFF;" : ""}
  ${({ $dragged }) => $dragged ? "background-color: #FFF;" : ""}
`;

const isValidExpansion = (start, end, cells) => {
	 let isValid = false

	 const cellsWithStart = cells.filter((c) => c === start);

	 if (start !== end) {
		 if (cellsWithStart.length < 2) {
			 //allow only to expand from a single cell
			 const cellsWithEnd = cells.filter((c) => c === end);

			 if (cellsWithEnd.length < 2) {
				 //allow only to expand to a single cell
				 isValid = true;
			 }
		 }
	 }

	 // if (!isValid) {
		//  console.log("!!!!!!!!!! NOT VALID !!!!! ", { start, end, cells} );
	 // }

	 return isValid;
 };

const GridCell = ({ cell, size, border, overExpanded, setAssetOverCell }) => {
	const { setCellImage, images, tableData, cells, setExpansion } = useCollage();
	const ref = useRef();

	const [{ isDragOver, canDrop, draggedType }, drop] = useDrop(
		() => ({
			accept: [DRAG_TYPES.ASSET, DRAG_TYPES.CELL],
			drop: (data, monitor) => {
				console.log("CELL BEING DROPPED ON  ", data, monitor.getItemType());

				if (monitor.getItemType() === DRAG_TYPES.ASSET) {
					setCellImage(cell, data.id);
				}
				else if (monitor.getItemType() === DRAG_TYPES.CELL) {
					if (isValidExpansion(data.cell, cell, cells, tableData))
					setExpansion(data.cell, cell);
				}
			},
			hover: (data, monitor) => {
				if (monitor.getItemType() === DRAG_TYPES.ASSET) {
					setAssetOverCell(cell);
				}
			},
			canDrop:  ({ cell: startCell }, monitor) => {
				return monitor.getItemType() === DRAG_TYPES.ASSET ||
					isValidExpansion(startCell, cell, cells, tableData);
			},
			collect: (monitor) => ({
				isDragOver: !!monitor.isOver(),
				draggedType: monitor.getItemType(),
				canDrop: monitor.canDrop(),
			}),
		}),
		[cell, cells, tableData]
	);

	const [{ isDragging }, drag, preview] = useDrag(() => ({
		type: DRAG_TYPES.CELL,
		item: { cell },
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging()
		})
	}), [cell]);

	drag(ref);
	drop(ref);

	useEffect(() => {
		preview(getEmptyImage(), { captureDraggingState: true });
	}, []);

	return <CellContainer
		$size={size}
		$border={border}
		$imgOver={overExpanded || (draggedType === DRAG_TYPES.ASSET && isDragOver)}
		$otherCellOver={draggedType === DRAG_TYPES.CELL && isDragOver}
		$otherCellAllowed={canDrop}
		$dragged={isDragging}
		ref={ref}
	>
		{!isDragging && cell}
		{images[cell] && <StyledDeleteOutlineIcon
			htmlColor="white"
			fontSize="large"
			onClick={() => {
				setCellImage(cell, null);
			}}
		/>}
	</CellContainer>;
};

const CellDragLayer = ({ size, border }) => {
	const { itemType, isDragging, item, currentOffset } = useDragLayer((monitor) => ({
		isDragging: monitor.isDragging(),
		item: monitor.getItem(),
		itemType: monitor.getItemType(),
		// initialOffset: monitor.getInitialSourceClientOffset(),
		currentOffset: monitor.getSourceClientOffset(),
	}));

	return isDragging && itemType === DRAG_TYPES.CELL ? <CellContainer
		style={{
			position: "fixed",
			zIndex: 100,
			left: 0,
			top: 0,
			pointerEvents: "none",
			transform: `translate(${currentOffset.x}px, ${currentOffset.y}px)`,
		}}
		$size={size}
		$border={border}
		$dragLayer={true}
	>
		{item.cell}
	</CellContainer> : null;
};

const CollageGrid = ({ setAssetOverCell, assetOverCell }) => {
	const { size, color, border, cells } = useCollage();

	const bordersTotal = border * (size + 1),
		cellSize = (GRID_SIZE - bordersTotal) / size;

	return <GridBox $color={color} $border={border}>
		<BackgroundGrid cellSize={cellSize}/>

		{cells.map((cell, index) =>
			<GridCell
				key={index}
				cell={cell}
				size={cellSize}
				border={border}
				overExpanded={assetOverCell === cell}
				setAssetOverCell={setAssetOverCell}
			/>)}

		<CellDragLayer size={cellSize} border={border} />
	</GridBox>;
};

const BackgroundGridContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
	z-index: 0;
	
	table, tr {
		border: 0
	}
	
  td {
	  border: ${({ $border, $color }) => `${$border}px solid ${$color}`}; 
  }
	
  table {
    width: 100%;
    height: 100%;
    border-collapse: collapse;
  }
`;

const TableCell = styled.td`
    ${({ $size }) => `
				width: ${$size}px;
				height: ${$size}px;
			`}
    
    ${({ $bgColor }) => `${$bgColor ? `background-color: ${$bgColor};` : ""}`}     
    
		position: relative;
  	line-height: 0;
`;

const CellImage = ({ id, rows, cols, cellSize }) =>  {
	const { cloud } = useCollage();

	const width = Math.floor(cols * cellSize),
		height = Math.floor(rows * cellSize);

	return <img src={`https://res.cloudinary.com/${cloud}/image/upload/w_${width},h_${height},c_scale/${id}`} />
};

const StyledDeleteOutlineIcon = styled(DeleteOutlineIcon)`
	cursor: pointer;
	position: absolute;
	bottom: 10%;
	left: 50%;
	transform: translateX(-50%);
	z-index: 100;
	opacity: 0.4;
	transition: opacity 0.5s;
	
	&:hover {
		opacity: 1;
	}
`;

const BackgroundGrid = ({ cellSize }) => {
	const { border, color, tableData, colors, images, size } = useCollage();

	return <BackgroundGridContainer $border={border} $color={color}>
		<table>
			<tbody>
			{tableData.map((row, i) => <tr key={i}>
				{row.map((cellData, j) => {
						const { cell, rows, cols } = cellData || {};

						const pos = (j % size) + (size * i);
						// console.log("RENDERING CELL !!!!!!!!! ", {i, j, size, color:colors[pos], dataId: tableData._dataId });
						return cell ? <TableCell
							key={pos}
							rowSpan={rows}
							colSpan={cols}
							data-cell={cell}
							$bgColor={!images[cell] ? colors[pos] : null}
							$size={cellSize - border}
						>
							{images[cell] &&
								<>
									<CellImage id={images[cell]} rows={rows} cols={cols} cellSize={cellSize - border}/>
								</>}
						</TableCell> : null;
					}
				)}
			</tr>)}
			</tbody>
		</table>
	</BackgroundGridContainer>;
};

const CreatorContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
	flex-direction: column;
	position: relative;
`;

const OverlayContainer = styled.div`
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(94, 101, 101, 0.75);
  z-index: 1000;
	
	.overlaySpinner {
		z-index: 1001;
	}
`;

const LoadingOverlay = () => {
	return <OverlayContainer>
		<RingLoader color={"#3fb8cc"} loading={true} size={150} className="overlaySpinner"/>
	</OverlayContainer>
};

const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
	width: 100%;
	min-height: 100px;
	
  a {
    font-size: 18px;
    color: #181b1f;
    margin: 10px 0;
  }
`;

const Results = ({ results }) => {
	const { cloud } = useCollage();

	return <ResultsContainer>
		{results.map((result) =>
			<a key={result} href={`https://res.cloudinary.com/${cloud}/image/upload/${result}.png`} target="_blank" rel="noopener">{result}</a>)}
	</ResultsContainer>
};

const CollageCreator = () => {
	const [isGenerating, setGenerating] = useState(false);
	const [results, setResults] = useState([]);
	const [assetOverCell, setAssetOverCell] = useState(null);

	const addResult = (id) => {
		setResults((latest) => [...latest, id]);
	};

	return <CreatorContainer>
		{isGenerating && <LoadingOverlay/>}
		<Main>
			<SideMenu/>
			<CollageGrid setAssetOverCell={setAssetOverCell} assetOverCell={assetOverCell}/>
			<Generate setGenerating={setGenerating} addResult={addResult} />
		</Main>
		<AssetsSelector setAssetOverCell={setAssetOverCell}/>
		<Results results={results}/>
	</CreatorContainer>;
};

const AssetsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
	align-items: center;
	height: 150px;

  img {
    max-width: 150px;
    height: auto;
	  max-height: 100px;
    cursor: pointer;

    transition: box-shadow 0.5s;

    &:hover {
      box-shadow: 0 0 5px 1px gray;
    }
  }

  .assetContainer {
    height: 80px;
    margin: 0 10px 10px 0;
  }
`;

const DRAG_TYPES = {
	ASSET: "asset",
	CELL: "cell",
}

const Asset = ({ id, setAssetOverCell }) => {
	const { cloud } = useCollage();

	const [{ isDragging }, drag] = useDrag(() => ({
		type: DRAG_TYPES.ASSET,
		item: { id },
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging()
		}),
		end: () => {
			setAssetOverCell(null);
		},
	}), [setAssetOverCell])

	return <div
		ref={drag}
		className="assetContainer"
	>
		<img src={`https://res.cloudinary.com/${cloud}/image/upload/w_500/${id}`}/>
	</div>;
};

const Assets = ({ setAssetOverCell }) => {
	return <AssetsContainer>
		{ASSETS_IDS.map((id) => <Asset id={id} key={id} setAssetOverCell={setAssetOverCell}/>)}
	</AssetsContainer>;
};

const SelectorContainer = styled.div`
  background-color: #bbbfc4;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AssetsSelector = ({ setAssetOverCell }) => {
	const { tableData, images, setCellImage } = useCollage();

	return <SelectorContainer>
		<Assets setAssetOverCell={setAssetOverCell}/>
		<Button
			size="medium"
			sx={{ fontSize: "20px" }}
			onClick={() => {
				let assetIndex = 0;

				tableData.forEach((row) => {
					row.forEach((cellData) => {
						if (cellData && !images[cellData.cell]) {
							if (assetIndex === ASSETS_IDS.length) {
								assetIndex = 0;
							}

							setCellImage(cellData.cell, ASSETS_IDS[assetIndex]);

							assetIndex += 1;
						}
					});
				});
			}}
		>
			Fill Assets
		</Button>
	</SelectorContainer>;
};

const Main = styled.main`
  display: flex;
  align-items: stretch;
  background-color: #e0e3ec;
	padding-bottom: 10px;
`;

const GenerateContainer = styled.div`
  display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border-left: 1px solid #8c8989;
	padding-left: 20px;
`;

const ButtonWrapper = styled.div`
  width: 300px;
  height: 400px;
  border-radius: 10px;
  box-shadow: 0 0 5px 1px #8c8989;
	display: flex;
  align-items: center;
  justify-content: center;
`;

const Generate = ({ setGenerating, addResult }) => {
	const { reset, isReady, ...collageData } = useCollage();

	return <GenerateContainer>
		<Tooltip
			title={isReady ? "All Set" : "All Cells Should Be Filled"}
			placement="top"
			arrow
		>
		<ButtonWrapper>
				<Button
					size="large"
					disabled={!isReady}
					sx={{ fontSize: "28px" }}
					onClick={async () => {
						setGenerating(true);
						const result = await createManifest(collageData, `collages/collage_${Date.now()}`);
						setGenerating(false);

						if (result) {
							addResult(result);
						}
					}}
				>
					Generate
				</Button>
		</ButtonWrapper>
		</Tooltip>
		<br/>
		<Button
			size="small"
			onClick={() => {
				reset();
			}}
		>
			Reset
		</Button>
	</GenerateContainer>;
};

const Header = styled.header`
	background-color: #3347C5;
	height: 50px;
	width: 100%;
	display: flex;
	padding: 0 0 4px 10px;
	font-size: 28px;
	font-weight: bold;
	color: #FFF;
	align-items: center;
	justify-content: center;
`;

const AppOld = () => {
	const [collage, setCollage] = useState(getDefaults());
	console.log("RENDERING APP ", collage);

	return (
		<CollageContext.Provider value={createCollage(collage, setCollage)}>
			<div className="App">
				<DndProvider backend={HTML5Backend}>
					<Header>
						Cloudinary Collage Creator <ScienceIcon fontSize="28px" />
					</Header>
				<CollageCreator />
				</DndProvider>
			</div>
		</CollageContext.Provider>
	);
};

export default AppOld;

