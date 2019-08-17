import React from "react";
import PropTypes from "prop-types";
import { Typography, Grid, Link } from "@material-ui/core/";

const StatsField = props => {
  const { stats, pageUrl } = props;
  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item>
        <Typography>
          Page scanned:{" "}
          <Link href={pageUrl} target="_blank">
            {pageUrl}
          </Link>
        </Typography>
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
  stats: PropTypes.object,
  pageUrl: PropTypes.string
};
