/**
 * @typedef {Object} Config
 * @prop {string} message
 *
 * Anytime a user opens an issue, add them as a collaborator to the repository.
 * @param {Object} robot
 * @param {Config} defaults
 * @param {String} [configFilename]
 */
module.exports = (robot, defaults, configFilename = 'remind-merge.yml') => {
  if (!defaults.message) {
    throw new Error('You need to include a `message` string in your `defaults` object.');
  }
  
  robot.on('pull_request.closed', async context => {
    const {number} = context.payload;

    const repoConfig = await context.config(configFilename);
    const config = Object.assign({}, defaults, repoConfig);

    return context.github.issues.createComment(context.repo({
      number,
      body: config.message
    }));
  });
};
