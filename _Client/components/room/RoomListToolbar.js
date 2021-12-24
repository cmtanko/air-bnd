import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  FormControl,
  Typography
} from "@mui/material";
import { useRouter } from "next/router";
import { Search as SearchIcon } from "../../icons/search";

export const ProductListToolbar = (props) => {
  const router = useRouter();
  const [location, setLocation] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    if (location.trim()) {
      router.push(`/?location=${location}`);
    } else {
      router.push("/");
    }
  };

  return (
    <Box {...props}>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -1
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
          Hotels
        </Typography>
      </Box>
      <Box sx={{ mt: 1 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <form onSubmit={submitHandler}>
                <TextField
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon fontSize="small" color="action">
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    )
                  }}
                  placeholder="Search hotels by location"
                  variant="outlined"
                />
              </form>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
