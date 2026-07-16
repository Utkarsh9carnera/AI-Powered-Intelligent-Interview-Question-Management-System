import { useState } from "react";

import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Collapse,
} from "@mui/material";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import PeopleOutlineRoundedIcon from "@mui/icons-material/PeopleOutlineRounded";
import QuizRoundedIcon from "@mui/icons-material/QuizRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";

import { useNavigate, useLocation } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [settingsOpen, setSettingsOpen] = useState(
    location.pathname.startsWith("/settings")
  );

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role = user.role || "Viewer";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <Box
      sx={{
        width: 240,
        bgcolor: "#FFFFFF",
        borderRight: "1px solid #E5E7EB",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          px: 3,
          py: 4,
          cursor: "pointer",
        }}
        onClick={() => navigate("/dashboard")}
      >
        <AutoStoriesIcon
          sx={{
            color: "#2563EB",
            fontSize: 36,
          }}
        />

        <Typography
          sx={{
            fontWeight: 700,
            fontSize: 24,
          }}
        >
          AI Interview
        </Typography>
      </Box>

      {/* Menu */}
      <List sx={{ px: 2 }}>
        {/* Home */}
        <ListItemButton
          selected={location.pathname === "/dashboard"}
          onClick={() => navigate("/dashboard")}
          sx={{
            borderRadius: 3,
            mb: 1,
            py: 1.4,
          }}
        >
          <ListItemIcon>
            <HomeRoundedIcon color="primary" />
          </ListItemIcon>

          <ListItemText primary="Home" />
        </ListItemButton>

        {/* Search History */}
        <ListItemButton
          selected={location.pathname === "/search-history"}
          onClick={() => navigate("/search-history")}
          sx={{
            borderRadius: 3,
            mb: 1,
          }}
        >
          <ListItemIcon>
            <HistoryRoundedIcon />
          </ListItemIcon>

          <ListItemText primary="Search History" />
        </ListItemButton>

        {/* Profile */}
        <ListItemButton
          selected={location.pathname === "/profile"}
          onClick={() => navigate("/profile")}
          sx={{
            borderRadius: 3,
            mb: 1,
          }}
        >
          <ListItemIcon>
            <PersonOutlineRoundedIcon />
          </ListItemIcon>

          <ListItemText primary="Profile" />
        </ListItemButton>

        {/* Settings */}
        <ListItemButton
          onClick={() => setSettingsOpen(!settingsOpen)}
          selected={location.pathname.startsWith("/settings")}
          sx={{
            borderRadius: 3,
            mb: 1,
          }}
        >
          <ListItemIcon>
            <SettingsOutlinedIcon />
          </ListItemIcon>

          <ListItemText primary="Settings" />

          {settingsOpen ? (
            <ExpandLessRoundedIcon />
          ) : (
            <ExpandMoreRoundedIcon />
          )}
        </ListItemButton>

        <Collapse in={settingsOpen} timeout="auto" unmountOnExit>
          <List
            disablePadding
            sx={{
              pl: 1,
            }}
          >
            {role === "Root" && (
              <ListItemButton
                selected={location.pathname === "/settings/admins"}
                onClick={() => navigate("/settings/admins")}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  py: 0.7,
                  minHeight: 40,
                }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <AdminPanelSettingsRoundedIcon fontSize="small" />
                </ListItemIcon>

                <ListItemText
                  primary="Manage Admins"
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontSize: 14,
                    },
                  }}
                />
              </ListItemButton>
            )}

            {(role === "Root" || role === "Admin") && (
              <ListItemButton
                selected={
                  location.pathname === "/settings/question-managers"
                }
                onClick={() => navigate("/settings/question-managers")}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  py: 0.7,
                  minHeight: 40,
                }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <GroupsRoundedIcon fontSize="small" />
                </ListItemIcon>

                <ListItemText
                  primary="Manage Question Managers"
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontSize: 14,
                    },
                  }}
                />
              </ListItemButton>
            )}

            {(role === "Root" || role === "Admin") && (
              <ListItemButton
                selected={location.pathname === "/settings/viewers"}
                onClick={() => navigate("/settings/viewers")}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  py: 0.7,
                  minHeight: 40,
                }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <PeopleOutlineRoundedIcon fontSize="small" />
                </ListItemIcon>

                <ListItemText
                  primary="Manage Viewers"
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontSize: 14,
                    },
                  }}
                />
              </ListItemButton>
            )}

            {(role === "Root" ||
              role === "Admin" ||
              role === "Question Manager") && (
              <ListItemButton
                selected={location.pathname === "/settings/questions"}
                onClick={() => navigate("/settings/questions")}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  py: 0.7,
                  minHeight: 40,
                }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <QuizRoundedIcon fontSize="small" />
                </ListItemIcon>

                <ListItemText
                  primary="Manage Questions"
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontSize: 14,
                    },
                  }}
                />
              </ListItemButton>
            )}

            {(role === "Root" ||
              role === "Admin" ||
              role === "Question Manager") && (
              <ListItemButton
                selected={location.pathname === "/settings/metadata"}
                onClick={() => navigate("/settings/metadata")}
                sx={{
                  borderRadius: 2,
                  py: 0.7,
                  minHeight: 40,
                }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <CategoryRoundedIcon fontSize="small" />
                </ListItemIcon>

                <ListItemText
                  primary="Manage Metadata"
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontSize: 14,
                    },
                  }}
                />
              </ListItemButton>
            )}
          </List>
        </Collapse>
      </List>

      <Box sx={{ flexGrow: 1 }} />

      <Divider />

      {/* Logout */}
      <List sx={{ p: 2 }}>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: 3,
          }}
        >
          <ListItemIcon>
            <LogoutRoundedIcon />
          </ListItemIcon>

          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Box>
  );
}

export default Sidebar;