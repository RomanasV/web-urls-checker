const axios = require("axios");
const cheerio = require("cheerio");
const url = require("url");
const uuid = require("uuid/v4");

exports.links_get_all = (req, res) => {
  const pageUrl = mainUrlNormalizer(req.body.link);
  fetchLinks(pageUrl);

  async function fetchLinks(pageUrl) {
    try {
      const response = await axios.get(pageUrl);
      const links = await scrapeAllPageLinks(response, pageUrl);

      const updatedLinks = await links.map(async link => {
        const id = uuid();
        try {
          await axios(link);
          return { id, link, response: true };
        } catch {
          return { id, link, response: false };
        }
      });
      const checkedLinks = await Promise.all(updatedLinks);
      res.json({ checkedLinks, parsedUrl: pageUrl });
    } catch {
      const errorMessage = `"${pageUrl}" is not a valid url.`;
      res.json({ error: errorMessage, pageUrl });
    }
  }

  const scrapeAllPageLinks = (response, pageUrl) => {
    const $ = cheerio.load(response.data);
    const links = $("a");
    const urls = [];

    links.each((index, element) => {
      const link = $(element).attr("href");
      if (link) {
        const normalizedLink = linkNormalizer(link, pageUrl);
        normalizedLink && urls.push(normalizedLink);
      }
    });
    return urls;
  };

  function mainUrlNormalizer(link) {
    const parsedUrl = url.parse(link);

    if (parsedUrl.protocol === "https:" || parsedUrl.protocol === "http:") {
      return parsedUrl.href;
    } else {
      return "http://" + parsedUrl.href;
    }
  }

  function linkNormalizer(link, mainLink) {
    const mainUrl = url.parse(mainLink);
    const subUrl = url.parse(link);

    if (subUrl.query === null) {
      if (subUrl.protocol === "https:" || subUrl.protocol === "http:") {
        return subUrl.href;
      } else if (subUrl.path !== null && subUrl.protocol === null) {
        if (subUrl.href.startsWith("//")) {
          return mainUrl.protocol + subUrl.path;
        } else {
          return mainUrl.protocol + "//" + mainUrl.hostname + subUrl.path;
        }
      }
    }
  }
};
