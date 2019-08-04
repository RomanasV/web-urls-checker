import React, { PureComponent } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Container,
  Grid,
  Typography,
  CircularProgress,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Divider
} from "@material-ui/core/";
import LinksList from "../components/LinksList/LinksList";
import List from "@material-ui/core/List";
import LinearProgress from "@material-ui/core/LinearProgress";

export default class LinksChecker extends PureComponent {
  state = {
    pageUrl: "",
    links: [],
    loading: false,
    stats: null
  };

  pageUrlHandler = event => {
    this.setState({
      pageUrl: event.target.value
    });
  };

  submitHandler = event => {
    this.setState({ links: [], loading: true, stats: null });
    event.preventDefault();

    const link = {
      link: this.state.pageUrl
    };

    axios
      .post("/", link)
      .then(res => {
        console.log(res.data);
        const stats = this.handleStats(res.data);
        this.setState({ links: res.data, loading: false, pageUrl: "", stats });
      })
      .catch(err => console.log(err));

    // this.setState({
    //   pageUrl: ""
    // });
  };

  handlePageCheck = link => {
    this.setState({ pageUrl: link });
  };

  handleStats = data => {
    const checked = data.length;
    const pass = data.filter(link => link.status === 200).length;
    const failed = data.filter(link => link.status !== 200).length;

    const stats = {
      checked,
      pass,
      failed
    };

    return stats;
  };

  render() {
    let links = null;
    if (this.state.links) {
      links = this.state.links.map((link, index) => (
        <LinksList link={link} index={index} checkUrl={this.handlePageCheck} />
      ));
    }

    let stats = null;
    if (this.state.stats) {
      stats = (
        <Typography>
          {this.state.stats.checked} links checked: {this.state.stats.pass}{" "}
          passed, {this.state.stats.failed} failed.
        </Typography>
      );
    }

    return (
      <>
        <Container maxWidth="md">
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={12} md={8} lg={6}>
              <form onSubmit={this.submitHandler}>
                <TextField
                  id="standard-dense"
                  label="Page URL"
                  margin="dense"
                  variant="outlined"
                  fullWidth
                  // type="url"
                  disabled={this.state.loading}
                  value={this.state.pageUrl}
                  onChange={this.pageUrlHandler}
                  required
                />
                <Button
                  variant="outlined"
                  color="primary"
                  type="submit"
                  disabled={this.state.loading || !this.state.pageUrl}
                >
                  Submit
                </Button>
              </form>
            </Grid>

            <Grid
              item
              xs={12}
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <List>
                {this.state.stats && stats}
                {this.state.loading ? (
                  <CircularProgress color="primary" />
                ) : (
                  links
                )}
              </List>
            </Grid>
          </Grid>
          {/* <LinksTable links={this.state.links} /> */}
        </Container>
      </>
    );
  }
}
