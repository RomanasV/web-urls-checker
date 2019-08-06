import React from "react";
import PropTypes from "prop-types";
import Cat from "./Cat/Cat";

import { Typography, Grid } from "@material-ui/core/";

const StatsField = props => {
  const { error, catPic } = props;

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item>
        <Typography variant="h5">{error}</Typography>
      </Grid>

      {catPic && (
        <Grid item>
          <Cat height="300" type="gif" />
        </Grid>
      )}
    </Grid>
  );
};

export default React.memo(StatsField);

StatsField.propTypes = {
  error: PropTypes.string,
  catPic: PropTypes.bool
};
