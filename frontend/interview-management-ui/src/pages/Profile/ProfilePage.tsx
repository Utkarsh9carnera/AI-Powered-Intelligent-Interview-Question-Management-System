import { Box } from "@mui/material";
import ProfileCard from "../../components/profile/ProfileCard";

function ProfilePage() {
  return (
    <Box
      sx={{
        p: 5,
      }}
    >
      <ProfileCard />
    </Box>
  );
}

export default ProfilePage;