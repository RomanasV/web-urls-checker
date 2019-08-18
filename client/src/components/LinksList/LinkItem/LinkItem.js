import React from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Link,
  Button,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Box
} from "@material-ui/core/";
import { CheckCircleOutline, ErrorOutline } from "@material-ui/icons";
import ListItem from "@material-ui/core/ListItem";

const LinkItem = props => {
  const [open, setOpen] = React.useState(false);
  const { link, checkUrl } = props;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const modal = (
    <Dialog fullWidth maxWidth="lg" open={open} onClose={handleClose}>
      <DialogTitle>
        <Typography>
          <strong>Original path:</strong> <em>{link.originalLink}</em>
        </Typography>
        <Typography>
          <strong>Modified path:</strong> <em>{link.link}</em>
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box
          component="pre"
          my={2}
          p={1}
          whiteSpace="pre-wrap"
          bgcolor="#F0F0F0"
          color="black"
        >
          <code>{link.linkInHtml.trim()}</code>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <ListItem divider dense>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item md={1} sm={1} xs={1}>
          {link.response ? (
            <CheckCircleOutline />
          ) : (
            <ErrorOutline color="error" />
          )}
        </Grid>

        <Grid item md={4} sm={11} xs={11}>
          <Button href={link.link} target="_blank" size="small" color="inherit">
            Visit
          </Button>

          <Button
            size="small"
            color="secondary"
            onClick={() => checkUrl(link.link)}
          >
            Check This Path
          </Button>

          <Button size="small" color="primary" onClick={handleOpen}>
            Watch in HTML
          </Button>
        </Grid>

        <Grid item md={7} sm={12} xs={12}>
          <Typography noWrap>
            <Link
              href={link.link}
              target="_blank"
              underline="none"
              color="inherit"
            >
              {link.link}
            </Link>
          </Typography>
        </Grid>
      </Grid>
      {modal}
    </ListItem>
  );
};

export default React.memo(LinkItem);

LinkItem.propTypes = {
  link: PropTypes.object,
  checkUrl: PropTypes.func
};
