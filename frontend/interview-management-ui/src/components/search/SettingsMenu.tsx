import { useState } from "react";
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";

import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import { useNavigate } from "react-router-dom";

function SettingsMenu() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role = user.role || "Viewer";

  console.log("Logged in role:", role);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigateTo = (path: string) => {
    handleClose();
    navigate(path);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <SettingsOutlinedIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              width: 260,
              borderRadius: 3,
              mt: 1,
            },
          },
        }}
      >
        {/* My Profile */}
        <MenuItem onClick={() => navigateTo("/profile")}>
          <ListItemIcon>
            <PersonOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="My Profile" />
        </MenuItem>

        {/* Root */}
        {role === "Root" && (
          <>
            <MenuItem onClick={() => navigateTo("/settings/admins")}>
              <ListItemIcon>
                <GroupOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Manage Admins" />
            </MenuItem>

            <MenuItem onClick={() => navigateTo("/settings/question-managers")}>
              <ListItemIcon>
                <BadgeOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Manage Question Managers" />
            </MenuItem>

            <MenuItem onClick={() => navigateTo("/settings/viewers")}>
              <ListItemIcon>
                <GroupOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Manage Viewers" />
            </MenuItem>

            <MenuItem onClick={() => navigateTo("/settings/questions")}>
              <ListItemIcon>
                <MenuBookOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Manage Questions" />
            </MenuItem>

            <MenuItem onClick={() => navigateTo("/settings/metadata")}>
              <ListItemIcon>
                <SellOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Manage Metadata" />
            </MenuItem>
          </>
        )}

        {/* Admin */}
        {role === "Admin" && (
          <>
            <MenuItem onClick={() => navigateTo("/settings/question-managers")}>
              <ListItemIcon>
                <BadgeOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Manage Question Managers" />
            </MenuItem>

            <MenuItem onClick={() => navigateTo("/settings/viewers")}>
              <ListItemIcon>
                <GroupOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Manage Viewers" />
            </MenuItem>

            <MenuItem onClick={() => navigateTo("/settings/questions")}>
              <ListItemIcon>
                <MenuBookOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Manage Questions" />
            </MenuItem>

            <MenuItem onClick={() => navigateTo("/settings/metadata")}>
              <ListItemIcon>
                <SellOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Manage Metadata" />
            </MenuItem>
          </>
        )}

        {/* Question Manager */}
        {role === "Question Manager" && (
          <>
            <MenuItem onClick={() => navigateTo("/settings/questions")}>
              <ListItemIcon>
                <MenuBookOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Manage Questions" />
            </MenuItem>

            <MenuItem onClick={() => navigateTo("/settings/metadata")}>
              <ListItemIcon>
                <SellOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Manage Metadata" />
            </MenuItem>
          </>
        )}

        <Divider />

        <MenuItem onClick={logout}>
          <ListItemIcon>
            <LogoutOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </MenuItem>
      </Menu>
    </>
  );
}

export default SettingsMenu;