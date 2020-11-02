const typeDefs = `type Query {
    getSite(site_name: String!): Website
    getAllSites: [Website]
  }
  type Website {
      site_name: String
      title: String
      meta_desc: String
      meta_keywords: String
      screen_shot: String
      hyperlinks: [String]
      otherlinks: [String]
  }
  type Mutation {
      addWebsite(site_name: String, title: String, meta_desc: String, meta_keywords: String, screen_shot: String, hyperlinks: [String], otherlinks: [String]): Website,
      addSite(site_name: String): Website,
  }`;
module.exports = typeDefs;