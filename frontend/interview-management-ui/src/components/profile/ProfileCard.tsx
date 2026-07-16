import {
  Avatar,
  Box,
  Chip,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import ProfileField from "./ProfileField";

function ProfileCard() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const fullName = user.fullName ?? "";
  const email = user.email ?? "";
  const role = user.role || "User";
  const profilePicture = user.profilePicture ?? "";

  const username =
    email && email.includes("@")
      ? email.split("@")[0]
      : "";

  return (
    <Box>
      <Typography
        sx={{
          fontSize: 36,
          fontWeight: 700,
          mb: 4,
        }}
      >
        My Profile
      </Typography>

      <Paper
        elevation={0}
        sx={{
          p: 5,
          borderRadius: 4,
          border: "1px solid #E5E7EB",
        }}
      >
        {/* Avatar */}

        <Stack
          sx={{
            alignItems: "center",
            gap: 2,
            mb: 5,
          }}
        >
          <Avatar
            src={profilePicture}
            alt={fullName}
            sx={{
              width: 110,
              height: 110,
              fontSize: 42,
              bgcolor: "#E5E7EB",
            }}
          >
            {fullName.charAt(0)}
          </Avatar>
        </Stack>

        {/* Profile Fields */}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 4,
          }}
        >
          <ProfileField
            label="Full Name"
            value={fullName}
          />

          <ProfileField
            label="Email Address"
            value={email}
          />

          <ProfileField
            label="Role"
            value={role}
          />

          <ProfileField
            label="Username"
            value={username}
          />

          <ProfileField
            label="Joined On"
            value="14 Jul 2026"
          />

          <Box>
            <Typography
              sx={{
                mb: 1,
                fontWeight: 600,
              }}
            >
              Status
            </Typography>

            <Chip
              label="Active"
              color="success"
            />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default ProfileCard;