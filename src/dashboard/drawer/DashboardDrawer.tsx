import {
  Drawer,
  ListItem,
  IconButton,
  Divider,
  ListItemIcon,
  ListItemText,
  List,
  Button,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import OfflineBoltIcon from "@material-ui/icons/OfflineBolt";
import StoreIcon from '@material-ui/icons/Store'; 
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import NeoSaveModal from "../../modal/SaveModal";
import NeoLoadModal from "../../modal/LoadModal";
import NeoShareModal from "../../modal/ShareModal";
import { NeoAboutModal } from "../../modal/AboutModal";
import BarChartIcon from "@material-ui/icons/BarChart";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import Typography from "@material-ui/core/Typography";
import { NeoReportExamplesModal } from "../../modal/ReportExamplesModal";
import {
  applicationGetConnection,
  applicationHasAboutModalOpen,
  applicationIsStandalone,
} from "../../application/ApplicationSelectors";
import { setPageNumberThunk } from "../../settings/SettingsThunks";
import { connect } from "react-redux";
import {
  setAboutModalOpen,
  setConnected,
  setWelcomeScreenOpen,
} from "../../application/ApplicationActions";
import NeoSettingsModal from "../../settings/SettingsModal";
import { createNotificationThunk } from "../../page/PageThunks";
import { getDashboardSettings, getPages } from "../DashboardSelectors";
import { updateDashboardSetting } from "../../settings/SettingsActions";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import CategoryIcon from "@material-ui/icons/Category";
import { useAuth0 } from "@auth0/auth0-react";
import { getPageNumber } from "../../settings/SettingsSelectors";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import DashboardIcon from '@material-ui/icons/Dashboard';


// The sidebar that appears on the left side of the dashboard.
export const NeoDrawer = ({
  open,
  hidden,
  connection,
  dashboardSettings,
  updateDashboardSetting,
  handleDrawerClose,
  onAboutModalOpen,
  resetApplication,
  pages,
  selectPage,
  pagenumber,
}) => {
  const iconArray=[  <BarChartIcon></BarChartIcon>, <DashboardIcon></DashboardIcon>,<StoreIcon ></StoreIcon>, <LocationOnIcon></LocationOnIcon> , <AccountTreeIcon></AccountTreeIcon> ]
  const { logout } = useAuth0();
  const [sizeW, setSizeW] = useState(true);
  // Override to hide the drawer when the application is in standalone mode.
  if (hidden) {
    return <></>;
  }

  let autoResize = () => {
    if (window.innerWidth < 400) {
      setSizeW(false);
    } else {
      setSizeW(true);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", autoResize);
    autoResize();
  }, []);

  const content = (
    <Drawer
      variant="permanent"
      style={
        open
          ? {
              position: "relative",
              overflowX: "hidden",
              width: "320px",
              transition: "width 125ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
              boxShadow: "2px 1px 10px 0px rgb(0 0 0 / 12%)",
            }
          : {
              position: "relative",
              overflowX: "hidden",
              boxShadow: " 2px 1px 10px 0px rgb(0 0 0 / 12%)",

              transition: "width 125ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
              width: sizeW ? "56px" : "0",
            }
      }
      open={open == true}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          overflowX: "hidden",
          justifyContent: "flex-start",
          padding: "0 8px",
          minHeight: "64px",
        }}
      >
        {/* <ListItem>
                    <Button
                        component="label"
                        onClick={() => logout({ returnTo: window.location.origin })}
                        style={{ backgroundColor: "white", marginLeft: "-8px" }}
                        color="default"
                        variant="outlined"
                        size="small"
                        startIcon={<ExitToAppIcon />}>Logout
                    </Button>
                </ListItem> */}

        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <div>
        {pages.map((p, i) => {
          return (
            <>
              <ListItem
                button
                onClick={() => {
                  selectPage(i);
                }}
                key={i}
                style={{
                  background: pagenumber == i ? "#bdbdbd" : "#ffffff",
                  height: "47px",
                }}
              >
                <ListItemIcon >
                  {iconArray[i]}
                </ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={
                    <Typography
                      style={{ color: pagenumber == i ? "#FFFFFF" : "#000000" }}
                    >
                      {p.title}{" "}
                    </Typography>
                  }
                />
              </ListItem>
            </>
          );
        })}
      </div>
      <Divider />
      <ListItem
        button
        onClick={() => logout({ returnTo: window.location.origin })}
      >
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
      <Divider />
      <List>
        <div>
          {/* <NeoSettingsModal dashboardSettings={dashboardSettings} updateDashboardSetting={updateDashboardSetting}></NeoSettingsModal> */}
          {/* <NeoSaveModal></NeoSaveModal>
                    <NeoLoadModal></NeoLoadModal> */}
          {/* <NeoShareModal></NeoShareModal> */}
        </div>
      </List>
      <List>
        {/* <NeoReportExamplesModal database={connection.database}></NeoReportExamplesModal> */}
        {/* <ListItem button onClick={onAboutModalOpen}>
                    <ListItemIcon>
                        <InfoOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="About" />
                </ListItem> */}
      </List>
    </Drawer>
  );
  return content;
};

const mapStateToProps = (state) => ({
  dashboardSettings: getDashboardSettings(state),
  hidden: applicationIsStandalone(state),
  aboutModalOpen: applicationHasAboutModalOpen(state),
  connection: applicationGetConnection(state),
  pages: getPages(state),
  pagenumber: getPageNumber(state),
});

const mapDispatchToProps = (dispatch) => ({
  selectPage: (number: any) => {
    dispatch(setPageNumberThunk(number));
  },
  onAboutModalOpen: (_) => dispatch(setAboutModalOpen(true)),
  updateDashboardSetting: (setting, value) => {
    dispatch(updateDashboardSetting(setting, value));
  },
  resetApplication: (_) => {
    // dispatch(setWelcomeScreenOpen(true));
    dispatch(setConnected(false));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NeoDrawer);
