const yaml = require('js-yaml');

module.exports = async context => {
  const path = '.github/teacherbot.yml';
  let config;

  try {
    const res = await context.github.repos.getContent(context.repo({path}));
    this.config = yaml.load(Buffer.from(res.data.content, 'base64').toString()) || {};
  } catch (err) {

    this.config = Object.assign( {}, require('./defaults') || {} );
  }

  return this.config;
}
