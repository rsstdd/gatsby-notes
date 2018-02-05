module.exports = {
  blogPostDir: "javascript", // The name of directory that contains your posts.
  siteTitle: "Ross's Notes", // Site title.
  siteTitleAlt: "Ross' Notes", // Alternative site title for SEO.
  siteLogo: "/logos/logo-1024.png", // Logo used for SEO and manifest.
  siteUrl: "https://d2zkjkmvqm13rb.cloudfront.net/", // Domain of your website without pathPrefix.
  pathPrefix: "/gatsby-material-starter", // Prefixes all links. For cases when deployed to example.github.io/gatsby-material-starter/.
  fixedFooter: false, // Whether the footer component is fixed, i.e. always visible
  siteDescription: "A Collection of Web Dev Notes.", // Website description used for RSS feeds/meta description tag.
  siteRss: "/rss.xml", // Path to the RSS file.
  siteFBAppID: "", // FB Application ID for using app insights
  siteGATrackingID: "", // Tracking code ID for google analytics.
  postDefaultCategoryID: "Tech", // Default category for posts.
  userName: "Ross Todd", // Username to display in the author segment.
  userTwitter: "@rosstdd", // Optionally renders "Follow Me" in the UserInfo segment.
  userLocation: "Seattle, WA", // User location to display in the author segment.
  userAvatar: "https://s3.amazonaws.com/rsstdd-portfolio/headshot.jpg",
  userDescription: "I'm Ross, a full stack developer with a background in higher educaton",
  // Links to social profiles/projects you want to display in the author segment/navigation bar.
  userLinks: [
    {
      label: "GitHub",
      url: "https://github.com/rsstdd/notes",
      iconClassName: "fa fa-github"
    },
    {
      label: "Twitter",
      url: "https://twitter.com/rsstdd",
      iconClassName: "fa fa-twitter"
    },
    {
      label: "Email",
      url: "mailto:rosstod@gmail.com",
      iconClassName: "fa fa-envelope"
    }
  ],
  copyright: "Copyright © 2017. Ross Todd" // Copyright string for the footer of the website and RSS feed.
};
