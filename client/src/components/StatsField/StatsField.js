import React from "react";
import PropTypes from "prop-types";
import { Typography, Grid } from "@material-ui/core/";

const StatsField = props => {
  const { stats } = props;
  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item>
        <Typography>
          {stats.checked} links checked: {stats.passed} passed, {stats.failed}{" "}
          failed.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default React.memo(StatsField);

StatsField.propTypes = {
  stats: PropTypes.object
};
