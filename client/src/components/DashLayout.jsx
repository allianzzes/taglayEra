import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { styled, useTheme, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PeopleIcon from "@mui/icons-material/People";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import ArticleIcon from "@mui/icons-material/Article";
import PostAddIcon from "@mui/icons-material/PostAdd";
import Button from "@mui/material/Button";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  backgroundColor: "#050505",
  borderRight: "1px solid #9d0000",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  backgroundColor: "#050505",
  borderRight: "1px solid #222",
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: "#0a0a0a",
  borderBottom: "1px solid #9d0000",
  boxShadow: "0 0 15px rgba(157, 0, 0, 0.2)",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.05),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.1),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#9d0000",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#fff",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const DashLayout = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve data from local storage to keep the operator name updated
  const name = localStorage.getItem("firstName") || "Scout";
  const userType = localStorage.getItem("type");

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const handleLogout = () => {
    localStorage.clear(); // This removes the token, triggering the ProtectedRoute redirect
    navigate("/auth/signin");
  };

  return (
    <Box sx={{ display: "flex", backgroundColor: "#000", minHeight: "100vh" }}>
      <CssBaseline />
      
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={open ? handleDrawerClose : handleDrawerOpen}
            edge="start"
            sx={{ marginRight: 5, color: "#9d0000" }}
          >
            {open ? <MenuOpenIcon /> : <MenuIcon />}
          </IconButton>

          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, color: "#fff", letterSpacing: 2, fontWeight: 'bold' }}>
            OPERATOR: {name.toUpperCase()}
          </Typography>

          <Search>
            <SearchIconWrapper><SearchIcon /></SearchIconWrapper>
            <StyledInputBase placeholder="SCAN_DATABASE..." inputProps={{ "aria-label": "search" }} />
          </Search>

          <Button 
            variant="outlined" 
            onClick={handleLogout}
            sx={{ color: "#9d0000", borderColor: "#9d0000", fontWeight: 'bold', "&:hover": { borderColor: "#ff0000", backgroundColor: "rgba(157,0,0,0.1)" }}}
          >
            TERMINATE_SESSION
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} sx={{ color: "#9d0000" }}>
            {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider sx={{ backgroundColor: "#222" }} />
        
        <List sx={{ color: "#d1d1d1" }}>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              component={Link}
              to="/dashboard/dash-articles"
              selected={location.pathname === "/dashboard/dash-articles"}
              sx={{
                "&.Mui-selected": { borderLeft: "4px solid #9d0000", backgroundColor: "rgba(157,0,0,0.1)" },
                "&:hover": { backgroundColor: "rgba(157,0,0,0.15)" }
              }}
            >
              <ListItemIcon sx={{ color: location.pathname === "/dashboard/dash-articles" ? "#ff0000" : "#9d0000" }}>
                <ArticleIcon />
              </ListItemIcon>
              <ListItemText primary="INTEL_LOGS" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              component={Link}
              to="/dashboard/new-report"
              selected={location.pathname === "/dashboard/new-report"}
              sx={{
                "&.Mui-selected": { borderLeft: "4px solid #9d0000", backgroundColor: "rgba(157,0,0,0.1)" },
                "&:hover": { backgroundColor: "rgba(157,0,0,0.15)" }
              }}
            >
              <ListItemIcon sx={{ color: location.pathname === "/dashboard/new-report" ? "#ff0000" : "#9d0000" }}>
                <PostAddIcon />
              </ListItemIcon>
              <ListItemText primary="NEW_REPORT" />
            </ListItemButton>
          </ListItem>

          {userType === "admin" && (
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                component={Link}
                to="/dashboard/users"
                selected={location.pathname === "/dashboard/users"}
                sx={{
                    "&.Mui-selected": { borderLeft: "4px solid #9d0000", backgroundColor: "rgba(157,0,0,0.1)" },
                    "&:hover": { backgroundColor: "rgba(157,0,0,0.15)" }
                }}
              >
                <ListItemIcon sx={{ color: location.pathname === "/dashboard/users" ? "#ff0000" : "#9d0000" }}>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="SURVIVOR_LIST" />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: "#000", color: "#fff", minHeight: "100vh" }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashLayout;