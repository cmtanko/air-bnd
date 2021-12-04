import PropTypes from "prop-types";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography
} from "@mui/material";

import CardMedia from "@mui/material/CardMedia";

export const ProductCard = ({ product, ...rest }) => (
  <Card
    sx={{
      display: "flex",
      flexDirection: "column",
      height: "100%"
    }}
    {...rest}
  >
    <CardContent>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          pb: 3
        }}
      >
        <CardMedia
          component="img"
          height="240"
          image={product.media}
          alt="hotels"
        />
      </Box>
      <Typography align="center" color="textPrimary" gutterBottom variant="h5">
        {product.title}
      </Typography>
      <Typography align="center" color="textPrimary" variant="body1">
        {product.description.toString().slice(0,100)}
      </Typography>
    </CardContent>
    <Box sx={{ flexGrow: 1 }} />
    <Divider />
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
        <Grid
          item
          sx={{
            alignItems: "center",
            display: "flex"
          }}
        >
          <Typography
            color="textSecondary"
            display="inline"
            sx={{ pl: 1 }}
            variant="body2"
          >
            66 Km away
          </Typography>
        </Grid>
        <Grid
          item
          sx={{
            alignItems: "center",
            display: "flex"
          }}
        >
          <Typography
            color="textSecondary"
            display="inline"
            sx={{ pl: 1 }}
            variant="body2"
          >
            {product.totalDownloads}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  </Card>
);

ProductCard.propTypes = {
  product: PropTypes.object.isRequired
};
