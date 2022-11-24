import { Suspense } from "react";
import styled from "styled-components";
import Container from "@mui/material/Container";
import { DndProvider } from "react-dnd";
import Topbar from "../Topbar";
import AppDrawer from "../AppDrawer";
import getDndBackend from "../DragDropBackend";
import CollageGrid from "../CollageGrid";
import Notifications from "../Notifications";
import CollageActions from "../CollageActions";
import CollageFloatingMenu from "../CollageFloatingMenu";
import CollagePhotos from "../CollagePhotos";
import UploadyConnector from "../UploadyConnector";
import CollageUploadDropZone from "../CollageUploadDropZone";
import PageSpinner from "../PageSpinner";

const AppContainer = styled.div`
  width: 100%;
  height: calc(100% - 64px);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;

  ${({ theme }) => theme.breakpoints.down("lg")} {
    padding: 0 10px;
  }
`;

//TODO: add link to docs in the top bar
//TODO: add I button at the bottom with info about the creator of the tool + link to GH repo

const CollageCreator = () => {
	return (
		<UploadyConnector>
			<DndProvider backend={getDndBackend()}>
				<Suspense fallback={<PageSpinner/>}>
					<Notifications/>
					<CollageUploadDropZone>
						<Topbar/>
						<AppContainer>
							<CollageActions/>
							<Container maxWidth="xl" sx={{ display: "flex", pb: 50 }}>
								<CollageGrid/>
								<CollageFloatingMenu/>
							</Container>
							<CollagePhotos/>
						</AppContainer>
						<AppDrawer/>
					</CollageUploadDropZone>
				</Suspense>
			</DndProvider>
		</UploadyConnector>
	);
};

export default CollageCreator;
