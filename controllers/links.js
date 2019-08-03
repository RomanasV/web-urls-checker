const axios = require("axios");
const cheerio = require("cheerio");
const url = require("url");

exports.links_get_all = (req, res) => {
  const pageUrl = url.parse(mainUrlNormalizer(req.body.link));

  fetchLinks();

  async function fetchLinks() {
    try {
      const response = await axios.get(pageUrl.href);
      const links = await scrapeAllPageLinks(response, pageUrl);
      const updatedLinks = await links.map(async link => {
        try {
          const linkResponse = await axios(link);

          return { link, status: linkResponse.status };
        } catch (error) {
          return { link, status: error.response.status };
        }
      });
      const results = await Promise.all(updatedLinks);

      res.json(results);
    } catch (error) {
      console.log(error);
    }
  }

  const scrapeAllPageLinks = (response, pageUrl) => {
    const $ = cheerio.load(response.data);
    const links = $("a");
    let urls = [];

    links.each((index, element) => {
      const link = $(element).attr("href");
      console.log("-------");
      console.log($(element).html());
      const normalizedLink = linkNormalizer(link, pageUrl);
      normalizedLink && urls.push(normalizedLink);
    });
    console.log(urls);
    return urls;
  };

  function mainUrlNormalizer(mainUrl) {
    const parsedUrl = url.parse(mainUrl);

    if (parsedUrl.protocol === "https:" || parsedUrl.protocol === "http:") {
      return parsedUrl.href;
    } else {
      return "http://" + parsedUrl.href;
    }
  }

  function linkNormalizer(link, pageUrl) {
    const subUrl = url.parse(link);
    let updatedUrlData = {};

    if (subUrl.protocol === "https:" || subUrl.protocol === "http:") {
      return subUrl.href;
    } else if (subUrl.path !== null) {
      return pageUrl.protocol + "//" + pageUrl.hostname + subUrl.path;
    } else {
      return;
    }
  }
};
