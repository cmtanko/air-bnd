import { useState, useEffect } from "react";

import {
  Box,
  Card,
  Grid,
  Button,
  Divider,
  TextField,
  CardHeader,
  CardContent
} from "@mui/material";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { wrapper } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../redux/actions/userAction";

const states = [
  {
    value: "vic",
    label: "VIC"
  }
];

export const getServerSideProps = wrapper.getServerSideProps((store) => {
  return async ({ req, query }) => {
    const session = await getSession({ req });
    if (!session) {
      return {
        redirect: {
          destination: "/login",
          permanent: false
        }
      };
    }

    return {
      props: {}
    };
  };
});

export const AccountProfileDetails = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: ""
  });

  const { user: loadedUser, loading } = useSelector((state) => state.auth);
  const {
    error,
    isUpdated,
    loading: updateLoading
  } = useSelector((state) => state.user);

  useEffect(() => {
    if (loadedUser) {
      setUser({
        email: loadedUser.email,
        firstName: loadedUser.name.split(" ")[0],
        lastName: loadedUser.name.split(" ")[1]
      });
    }

    if (error) {
      toast.error(error);
    }

    if (isUpdated) {
      router.push("/");
    }
  }, [dispatch, isUpdated, error, loadedUser]);

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    dispatch(
      updateProfile({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      })
    );
  };

  return (
    <form autoComplete="off" noValidate>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                name="firstName"
                onChange={handleChange}
                required
                value={user.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Last name"
                name="lastName"
                onChange={handleChange}
                required
                value={user.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                value={user.email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                disabled
                name="phone"
                onChange={handleChange}
                type="number"
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Country"
                name="country"
                disabled
                onChange={handleChange}
                required
                value="Australia"
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Select State"
                name="state"
                disabled
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value="VIC"
                variant="outlined"
              >
                {states.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2
          }}
        >
          <Button color="primary" variant="contained" onClick={handleSubmit}>
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};
