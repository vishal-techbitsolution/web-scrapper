const websiteModel = require('../model/websiteModel');
const cheerio = require('cheerio');
const request = require('request');
const Screenshot = require('node-server-screenshot');
const moment = require('moment');
const { isUrl } = require('../helper/utils');
const resolvers = {
    Query: {
        getAllSites: ()=> websiteModel.find(),
        getSite: async (_,{site_name}) => {
            let result = await websiteModel.findOne({site_name});
            if (!result) {
                try {
                    let url = new URL(site_name);
                    request({
                        uri: url,
                      }, async function(error, response, body) {
                        let $ = cheerio.load(body);
                        let title = $("title").text();
                        let meta_desc = "";
                        let meta_keywords = "";
                        let hyperlinks = [];
                        let otherlinks = [];
                        const socialPlatform = [
                            'facebook', 'twitter', 'linkedin', 'youtube', 'instagram'
                        ];
                        meta_desc = $('meta[name="description"]').attr('content');
                        meta_keywords = $('meta[name="keywords"]').attr('content');
                        $("a").each(function() {
                          let link = $(this);
                          let linkedURL = link.attr("href");
                          if (isUrl(linkedURL)) {
                              socialPlatform.map((p) => {
                                  if(linkedURL.indexOf(p) !== -1) {
                                    otherlinks.push();
                                  } else {
                                    hyperlinks.push(url + linkedURL);     
                                  }
                              });
                          } else {
                              hyperlinks.push(url + linkedURL);
                          }
                        });
                        const screen_shot = moment().format('x') + '.png';
                        await Screenshot.fromURL(site_name, screen_shot, async function(){
                            const model = new websiteModel({site_name, title, meta_desc, meta_keywords, screen_shot, hyperlinks, otherlinks});
                            result = await model.save();
                        });
                    });
                } catch (error) {
                    console.log(JSON.stringify(error));
                }
            }
            return result;
        }
    },
    Mutation: {
        addWebsite: async (_, { site_name, title, meta_desc, meta_keywords, screen_shot, hyperlinks, otherlinks }) => {
            const model = new websiteModel({site_name, title, meta_desc, meta_keywords, screen_shot, hyperlinks, otherlinks});
            await model.save();
            return model;
        },
    }
}
module.exports = resolvers;
