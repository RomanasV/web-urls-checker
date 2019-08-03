import React, { PureComponent } from "react";
import { Grid, Link, Typography, Divider, Button } from "@material-ui/core/";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

// import InboxIcon from "@material-ui/icons/Inbox";
// import DraftsIcon from "@material-ui/icons/Drafts";

const LinksList = props => {
  const { link, index, checkUrl } = props;

  return (
    <Grid container>
      <Grid item xs={1}>
        <Button href={link.link} target="_blank" size="small" color="primary">
          Visit
        </Button>
        <Button
          size="small"
          color="secondary"
          onClick={() => checkUrl(link.link)}
        >
          Check
        </Button>
        {/* <ListItemText primary={link.status} /> */}
      </Grid>
      <Grid item container xs={11}>
        <ListItem button divider key={index} dense>
          <Grid item xs={2}>
            <ListItemText primary={link.status} />
          </Grid>
          <Grid item xs={10}>
            <Link
              //   href={link.link}
              //   component="button"
              underline="none"
              color="inherit"
            >
              {link.link}
            </Link>
          </Grid>
        </ListItem>
      </Grid>
    </Grid>
  );
};

export default LinksList;
