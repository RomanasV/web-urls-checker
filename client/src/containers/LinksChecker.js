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
    pageUrlValidation: null
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
      pageUrlValidation: null
    });
    event.preventDefault();

    const link = {
      link: this.state.pageUrl
    };

    axios
      .post("http://localhost:5000/", link)
      .then(res => {
        if (res.data.error) {
          console.log(res.data.error);
          this.setState({ pageUrlValidation: res.data.error, loading: false });
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
      .catch(err => console.log(err));
  };

  handleSubUrlCheck = link => {
    this.setState({ pageUrl: link });
  };

  handleStats = data => {
    const checked = data.length;
    const passed = data.filter(
      link => link.status === 200 || link.status === 999
    ).length;
    const failed = checked - passed;

    const stats = {
      checked,
      passed,
      failed
    };

    return stats;
  };

  render() {
    const { links, stats, loading, pageUrlValidation, pageUrl } = this.state;

    return (
      <>
        <InputForm
          onFormSubmit={this.handleSubmit}
          loading={loading}
          pageUrl={pageUrl}
          onUrlChange={this.handlePageUrlChange}
          pageUrlValidation={pageUrlValidation}
        />
        <Container maxWidth="md">
          <Grid container direction="row" justify="center" alignItems="center">
            {stats && <StatsField stats={stats} />}
            {pageUrlValidation && <ErrorMessage error={pageUrlValidation} />}
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
