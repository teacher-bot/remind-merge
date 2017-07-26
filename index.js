const configurable = require('configurable');

/**
 * @typedef {Object} Config
 * @prop {string} message
 *
 * Comments to remind a user to delete the branch from a merged pull request
 * @param {Object} robot
 * @param {Config} config
 * @param {string} [configFilename]
 */
module.exports = (robot, defaults = {}, configFilename = 'remind-merge.yml') => {
  robot.on('pull_request.closed', async context => {
    const config = await configurable(context, defaults, configFilename);
    return context.github.issues.createComment(context.repo({
      number: context.payload.number,
      body: config.message
    }));
  });
};
