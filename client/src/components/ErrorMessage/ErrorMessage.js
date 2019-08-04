import React from "react";
import PropTypes from "prop-types";

import { Typography, Grid } from "@material-ui/core/";

const StatsField = props => {
  const { error } = props;
  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item>
        <Typography color="error">{error.errorMessage}</Typography>
      </Grid>
    </Grid>
  );
};

export default React.memo(StatsField);

StatsField.propTypes = {
  error: PropTypes.object
};
