import { Box } from "@mui/material";

import Sidebar from "./Sidebar";
import Navbar from "../layout/Navbar";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "#F8FAFC",
      }}
    >
      <Sidebar />

<Box
  sx={{
    flex: 1,
    overflow: "auto",
    p: 3,
  }}
>
  {children}
</Box>
    </Box>
  );
}

export default DashboardLayout;