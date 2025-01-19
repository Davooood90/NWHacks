import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import StarIcon from "@mui/icons-material/Star";
import GroupIcon from "@mui/icons-material/Group";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { useNavigate } from "react-router-dom";
import StarBorderPurple500OutlinedIcon from "@mui/icons-material/StarBorderPurple500Outlined";
import SvgIcon from "@mui/material/SvgIcon";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import InnerNav from "./InnerNav";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: "transparent", // Making AppBar transparent
  color: theme.palette.text.primary, // Setting text color to grey/black
  boxShadow: "none", // Remove shadow
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function TemporaryDrawer() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState("Home");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const menuItems = [
    { text: "Home", icon: <HomeOutlinedIcon />, path: "/" },
    {
      text: "Features",
      icon: <StarBorderPurple500OutlinedIcon />,
      path: "/features",
    },
    { text: "Team", icon: <GroupsOutlinedIcon />, path: "/team" },
    {
      text: "Support",
      icon: <ChatBubbleOutlineOutlinedIcon />,
      path: "/support",
    },
    {
      text: "App",
      icon: (
        <SvgIcon>
          <path
            d="M2.56991 17.1011L1.32705 17.5512L1.23318 16.2335C1.08601 14.1675 1.65672 12.5702 2.67954 11.3081C3.67187 10.0836 5.04322 9.23334 6.39263 8.53888C7.00269 8.22492 7.63185 7.93147 8.23566 7.64985C8.30383 7.61806 8.37167 7.58641 8.43913 7.55491C9.11274 7.2403 9.75085 6.9381 10.3421 6.61713C11.5408 5.96648 12.4198 5.30323 12.9169 4.48483L14.1103 2.51988L14.7338 4.73021L13.7714 5.00303C14.7338 4.73021 14.7339 4.73054 14.734 4.73089L14.7342 4.73169L14.7348 4.73363L14.7363 4.73894L14.7407 4.75513C14.7443 4.76837 14.7491 4.7865 14.755 4.8093C14.7668 4.85488 14.7829 4.91919 14.8019 5.00054C14.8399 5.16314 14.8897 5.39449 14.9399 5.68097C15.0402 6.25232 15.144 7.05166 15.1581 7.9678C15.186 9.7759 14.8656 12.1741 13.3234 14.1308C11.9051 15.9302 10.4984 17.0353 8.77763 17.5992C7.09692 18.15 5.2242 18.1457 2.97378 17.9602L2.88397 16.9864C2.78092 17.0244 2.67626 17.0626 2.56991 17.1011ZM12.8085 5.2743L12.8085 5.27457L12.8085 5.2743Z"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            fill="transparent"
          />
        </SvgIcon>
      ),
      path: "/app",
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <InnerNav />
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "#E8DEF8",
          },
        }}
        variant="temporary"
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems.map(({ text, icon, path }) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                onClick={() => {
                  setCurrentPage(text);
                  navigate(path);
                }}
                sx={{
                  m: 1,
                  borderRadius: 10,
                  bgcolor: currentPage === text ? "#d1c4e9" : "transparent",
                  "&:hover": {
                    bgcolor: "#e0d7f9",
                  },
                }}
              >
                <ListItemIcon
                  sx={{ color: currentPage === text ? "#5e35b1" : "#757575" }}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  primaryTypographyProps={{
                    fontWeight: currentPage === text ? "bold" : "normal",
                    color: currentPage === text ? "#5e35b1" : "#757575",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
