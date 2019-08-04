import React from "react";
import PropTypes from "prop-types";
import { Grid, Link, Button } from "@material-ui/core/";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const LinkItem = props => {
  const { link, checkUrl } = props;

  return (
    <ListItem divider dense>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item md={3} xs={12}>
          <Button href={link.link} target="_blank" size="small" color="primary">
            Visit
          </Button>

          <Button
            size="small"
            color="secondary"
            onClick={() => checkUrl(link.link)}
          >
            Check This Page
          </Button>
        </Grid>
        <Grid item md={1} xs={1}>
          <ListItemText primary={link.status} />
        </Grid>
        <Grid item md={8} xs={11}>
          <Link href={link.link} underline="none" color="inherit">
            {link.link}
          </Link>
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default React.memo(LinkItem);

LinkItem.propTypes = {
  link: PropTypes.object,
  checkUrl: PropTypes.func
};
