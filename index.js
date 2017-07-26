/**
 * @typedef {Object} Config
 * @prop {string} message
 *
 * Comments to remind a user to delete the branch from a merged pull request
 * @param {Object} robot
 * @param {Config} config
 */
module.exports = (robot, config) => {
  robot.on('pull_request.closed', async context => {
    return context.github.issues.createComment(context.repo({
      number: context.payload.number,
      body: config.message
    }));
  });
};
