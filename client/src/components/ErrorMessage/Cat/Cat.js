import React from "react";
import PropTypes from "prop-types";

const Cat = props => {
  const {
    type = "",
    text = "%20",
    fontSize = "50",
    color = "white",
    filter = "",
    width = "",
    height = ""
  } = props;

  const uniqueNum = Math.random();
  const url = `https://cataas.com/cat/${type}/says/${text}?s=${fontSize}&c=${color}&filter=${filter}&width=${width}&height=${height}&uniqueNum=${uniqueNum}`;

  return <img alt={text} src={url} />;
};

export default React.memo(Cat);

Cat.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
  fontSize: PropTypes.string,
  color: PropTypes.string,
  filter: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string
};
