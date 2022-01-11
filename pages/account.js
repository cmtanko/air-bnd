import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Box, Container, Grid, Typography } from "@mui/material";
import { AccountProfile } from "../_Client/components/account/account-profile";
import { AccountProfileDetails } from "../_Client/components/account/account-profile-details";
import { DashboardLayout } from "../_Client/components/dashboard-layout";

import { wrapper } from "../_Client/redux/store";
import { getSession } from "next-auth/client";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../_Client/redux/actions/userAction";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Header from "../_Client/components/Header";

const Account = () => {
  return (
    <>
      <Head>
        <title>Account | Air-bnd</title>
      </Head>
    <Header></Header>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Typography sx={{ mb: 3 }} variant="h4">
            Account
          </Typography>
          <Grid container spacing={3}>
            <Grid item lg={12} md={12} xs={12}>
              <AccountProfileDetails />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Account.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Account;
