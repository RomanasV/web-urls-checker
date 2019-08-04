import React from "react";
import PropTypes from "prop-types";
import LinkItem from "./LinkItem/LinkItem";
import List from "@material-ui/core/List";

const LinksList = props => {
  const { links, checkUrl } = props;

  return (
    <List>
      {links &&
        links.map(link => (
          <LinkItem key={link.id} link={link} checkUrl={checkUrl} />
        ))}
    </List>
  );
};

export default React.memo(LinksList);

LinkItem.propTypes = {
  links: PropTypes.array,
  checkUrl: PropTypes.func
};
