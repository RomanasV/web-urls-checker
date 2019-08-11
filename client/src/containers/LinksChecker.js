import React, { PureComponent } from "react";
import axios from "axios";
import { Container, Grid } from "@material-ui/core/";
import InputForm from "../components/InputForm/InputForm";
import StatsField from "../components/StatsField/StatsField";
import LinksList from "../components/LinksList/LinksList";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";

class LinksChecker extends PureComponent {
  state = {
    pageUrl: "",
    links: [],
    loading: false,
    stats: null,
    error: null,
    catPic: false
  };

  handlePageUrlChange = event => {
    this.setState({
      pageUrl: event.target.value
    });
  };

  handleSubmit = event => {
    this.setState({
      links: [],
      loading: true,
      stats: null,
      error: null,
      catPic: false
    });
    event.preventDefault();

    const link = {
      link: this.state.pageUrl
    };

    axios({
      method: "post",
      url: "/",
      data: link,
      timeout: 60000
    })
      .then(res => {
        if (res.data.error) {
          this.setState({ error: res.data.error, loading: false });
        } else {
          const stats = this.handleStats(res.data);
          this.setState({
            links: res.data,
            loading: false,
            pageUrl: "",
            stats
          });
        }
      })
      .catch(() => {
        const errorMessage =
          "Oops... Something went wrong. Here is a cat gif so you could feel better and forget about the error.";
        this.setState({ error: errorMessage, catPic: true, loading: false });
      });
  };

  handleSubUrlCheck = link => {
    this.setState({ pageUrl: link });
  };

  handleStats = data => {
    const checked = data.length;
    const passed = data.filter(link => link.response).length;
    const failed = checked - passed;

    const stats = {
      checked,
      passed,
      failed
    };

    return stats;
  };

  render() {
    const { links, stats, loading, error, pageUrl, catPic } = this.state;

    return (
      <>
        <InputForm
          onFormSubmit={this.handleSubmit}
          loading={loading}
          pageUrl={pageUrl}
          onUrlChange={this.handlePageUrlChange}
          error={error}
        />
        <Container maxWidth="md">
          <Grid container direction="row" justify="center" alignItems="center">
            {stats && <StatsField stats={stats} />}
            {error && <ErrorMessage error={error} catPic={catPic} />}
            {links && (
              <LinksList
                xs={12}
                links={links}
                checkUrl={link => this.handleSubUrlCheck(link)}
              />
            )}
          </Grid>
        </Container>
      </>
    );
  }
}

export default LinksChecker;
