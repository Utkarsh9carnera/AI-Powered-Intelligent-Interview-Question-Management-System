import { Box, TextField, Typography } from "@mui/material";

interface ProfileFieldProps {
  label: string;
  value: string;
}

function ProfileField({ label, value }: ProfileFieldProps) {
  return (
    <Box>
      <Typography
        sx={{
          mb: 1,
          fontWeight: 600,
          fontSize: 15,
          color: "#111827",
        }}
      >
        {label}
      </Typography>

      <TextField
  fullWidth
  value={value}
  slotProps={{
  htmlInput: {
    readOnly: true,
  },
}}
  sx={{
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
      bgcolor: "#FFFFFF",
    },
    "& input": {
      fontSize: 16,
      py: 1.6,
    },
  }}
/>
    </Box>
  );
}

export default ProfileField;