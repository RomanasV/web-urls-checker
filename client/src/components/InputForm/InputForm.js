import React from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Grid,
  IconButton,
  InputBase,
  LinearProgress
} from "@material-ui/core/";
import SearchIcon from "@material-ui/icons/Search";

const InputForm = props => {
  const { onFormSubmit, loading, pageUrl, onUrlChange } = props;

  return (
    <AppBar position="sticky" color="default" style={{ marginBottom: 20 }}>
      <Grid container direction="row" justify="center" alignItems="center">
        <form onSubmit={onFormSubmit}>
          <InputBase
            placeholder="Enter your page URL"
            value={pageUrl}
            onChange={onUrlChange}
          />
          <IconButton type="submit" disabled={loading || !pageUrl}>
            <SearchIcon />
          </IconButton>
        </form>
      </Grid>
      {loading && <LinearProgress color="primary" />}
    </AppBar>
  );
};

export default React.memo(InputForm);
InputForm.propTypes = {
  onFormSubmit: PropTypes.func,
  loading: PropTypes.bool,
  pageUrl: PropTypes.string,
  onUrlChange: PropTypes.func
};
