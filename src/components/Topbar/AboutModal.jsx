import styled from "styled-components";
import Typography from "@mui/material/Typography";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import GitHubIcon from "@mui/icons-material/GitHub";
import ConfirmationModal from "../ConfirmationDialog";
import TooltipIconButton from "../TooltipIconButton";
import Logo from "../Logo";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;

  .profile-pic {
    border-radius: 100%;
    width: 64px;
    height: 64px;
    box-shadow: ${({ theme }) => theme.shadows[21]};
  }
	
	p {
		font-size: 1.2rem;
		line-height: 1.5rem;
	}
`;

const LinksContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
`;

const AboutModal = ({ onClose }) => {
	return (<ConfirmationModal
			title="About"
			confirmLabel="Close"
			onClose={onClose}
			showCancel={false}
		>
			<Content>
				<Logo />
				<Typography variant="h4">Cloudinary Collage Creator</Typography>

				<p style={{ textAlign: "center" }}>
					This application uses the {" "}
					<a
						target="_blank"
						href="https://cloudinary.com/documentation/image_collage_generation">
						API</a> from {" "}
					<a
						target="_blank" href="https://cloudinary.com">Cloudinary</a>
					{" "} to generate the collage image.
					<br/><br/>
					All of the code for this application is available on <a href="https://github.com/yoavniran/cld-collage-creator" target="_blank">Github</a>.
				</p>

				<Typography variant="h6">Created by Yoav Niran</Typography>

				<img
					className="profile-pic"
					src="https://res.cloudinary.com/yoav-cloud/image/upload/x_-10,c_crop,w_500/v1673874946/profile/cartoon/yoav-cartoon-1"
				/>

				<LinksContainer>
					<TooltipIconButton
						icon={<GitHubIcon fontSize="large"/>}
						tooltipSimple
						tooltipTitle="Yoav Niran on Github"
						href="https://github.com/yoavniran"
						target="_blank"
					/>
					<TooltipIconButton
						icon={<TwitterIcon fontSize="large"/>}
						tooltipSimple
						tooltipTitle="poeticGeek on Twitter"
						href="https://twitter.com/poeticGeek"
						target="_blank"
					/>
					<TooltipIconButton
						icon={<YouTubeIcon fontSize="large"/>}
						tooltipSimple
						tooltipTitle="literaryCoder on Youtube"
						href="https://www.youtube.com/channel/UCat8KZuECL05oybIbyqzsyQ"
						target="_blank"
					/>
					<TooltipIconButton
						icon={<InstagramIcon fontSize="large"/>}
						tooltipSimple
						tooltipTitle="literaryCoder on Instagram"
						href="https://instagram.com/literaryCoder"
						target="_blank"
					/>
				</LinksContainer>
			</Content>
		</ConfirmationModal>
	);
};

export default AboutModal;
