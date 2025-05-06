import { useFetchData } from "6pp";
import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  Group as GroupIcon,
  Message as MessageIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import { Box, Container, Paper, Skeleton, Stack, Typography } from "@mui/material";
import moment from "moment";
import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { DoughnutChart, LineChart } from "../../components/specific/Charts";
import { CurveButton, SearchField } from "../../components/styles/StyledComponent";
import { server } from "../../constants/config";
import { useErrors } from "../../hooks/hook";

const Dashboard = () => {
  const {
    data,
    loading,
    error,
  } = useFetchData({
    url: `${server}/api/v1/admin/stats`,
    key: "dashboard-stats",
    credentials: "include", 
    successCallback: (res) => {
      console.log("Stats fetched successfully", res);
    },
    errorCallback: (err) => {
      console.error("Failed to fetch stats", err);
    },
  });
  
  const stats = data?.stats || {};
  
  useErrors([{ isError: !!error, error }]);
  
    const Appbar = (
        <Paper
          elevation={3}
          sx={{
            padding: "1rem",
            margin: "1rem 0",
            borderRadius: "1rem",
            background: "linear-gradient(145deg, #ffafbd, #ffc3a0)",
            transition: "all 0.3s ease-in-out",
            "&:hover": { boxShadow: "0 8px 20px rgba(0,0,0,0.1)" },
          }}
        >
          <Stack
            direction="row"
            justifyContent='center'
            alignItems="center"
            spacing={2}
            flexWrap="wrap"
            rowGap={2}
          >
            <AdminPanelSettingsIcon
              sx={{
                fontSize: "2.5rem",
                color: "#8e44ad",
                transition: "color 0.3s ease",
                "&:hover": { color: "#f39c12" },
              }}
            />
      
            <SearchField
              placeholder="Search..."
              sx={{
                minWidth: { xs: "100%", sm: "200px" },
                flex: 1,
                background: "#fff",
                borderRadius: "1rem",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                transition: "box-shadow 0.3s ease-in-out",
                "&:focus": { boxShadow: "0 2px 10px rgba(0,0,0,0.1)" },
              }}
            />
      
            <CurveButton
              sx={{
                px: 3,
                background: "#f39c12",
                color: "#fff",
                transition: "background-color 0.3s ease-in-out",
                "&:hover": { background: "#e67e22" },
              }}
            >
              Search
            </CurveButton>
      
            <Box flexGrow={1} />
      
            <Typography
              display={{ xs: "none", md: "block" }}
              color="rgba(0,0,0,0.7)"
              textAlign="center"
            >
              {moment().format("dddd, D MMMM YYYY")}
            </Typography>
      
            <NotificationsIcon
              sx={{
                fontSize: "2rem",
                color: "#8e44ad",
                transition: "color 0.3s ease",
              }}
            />
          </Stack>
        </Paper>
      );
      

  const Widgets = (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing="2rem"
      justifyContent="space-between"
      alignItems="center"
      margin="2rem 0"
    >
      <Widget title="Users" value={stats?.usersCount} Icon={<PersonIcon sx={{ color: "#fff" }} />} />
      <Widget title="Chats" value={stats?.totalChatsCount} Icon={<GroupIcon sx={{ color: "#fff" }} />} />
      <Widget title="Messages" value={stats?.messagesCount} Icon={<MessageIcon sx={{ color: "#fff" }} />} />
    </Stack>
  );

  return (
    <AdminLayout>
      {loading ? (
        <Skeleton height={"100vh"} />
      ) :
     ( <Container component="main">
        {Appbar}
        <Stack
          direction={{ xs: "column", lg: "row" }}
          flexWrap="wrap"
          justifyContent="center"
          alignItems={{ xs: "center", lg: "stretch" }}
          sx={{ gap: "2rem" }}
        >
          <Paper
  elevation={3}
  sx={{
    padding: "2rem 3.5rem",
    borderRadius: "1rem",
    width: "100%",
    maxWidth: "45rem",
    background: "linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)",
    transition: "all 0.3s ease-in-out",
    "&:hover": { boxShadow: "0 6px 20px rgba(0,0,0,0.1)" }
  }}
>
  <Typography
    margin="2rem 0"
    variant="h4"
    color="#2F4F4F"
  >
    Last Messages
  </Typography>
  <LineChart value={stats?.messagesChart || []}/>
</Paper>

          <Paper
            elevation={3}
            sx={{
              padding: "1rem",
              borderRadius: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: { xs: "100%", sm: "50%" },
              position: "relative",
              maxWidth: "25rem",
              backgroundColor: "#0093E9",
              backgroundImage: "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)",
              transition: "all 0.3s ease-in-out",
              "&:hover": { boxShadow: "0 6px 20px rgba(0,0,0,0.1)" },
            }}
          >
            <DoughnutChart labels={["Single Chats", "Group Chats"]}  value={[
                  stats?.totalChatsCount - stats?.groupsCount || 0,
                  stats?.groupsCount || 0,
                ]}/>
            <Stack
              position="absolute"
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing="0.5rem"
              width="100%"
              height="100%"
            >
              <GroupIcon sx={{ color: "#fff" }} />
              <Typography color="#fff">Vs</Typography>
              <PersonIcon sx={{ color: "#fff" }} />
            </Stack>
          </Paper>
        </Stack>
        {Widgets}
      </Container>)}
    </AdminLayout>
  );
};

const Widget = ({ title, value, Icon }) => (
  <Paper
    elevation={3}
    sx={{
      padding: "2rem",
      margin: "2rem 0",
      borderRadius: "1.5rem",
      width: "20rem",
      background: "linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)",
      transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
      "&:hover": {
        transform: "translateY(-8px)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
      },
    }}
  >
    <Stack alignItems="center" spacing="1rem">
      <Typography
        sx={{
          color: "#fff",
          borderRadius: "50%",
          border: `5px solid #fff`,
          width: "5rem",
          height: "5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1.5rem",
        }}
      >
        {value}
      </Typography>
      <Stack direction="row" spacing="1rem" alignItems="center">
        {Icon}
        <Typography color="#fff" fontWeight="bold">
          {title}
        </Typography>
      </Stack>
    </Stack>
  </Paper>
);

export default Dashboard;
