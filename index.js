const defaultsShape = {
  message: 'string',
};

function checkForDefaults(defaults) {
  const errors = Object.keys(defaultsShape).filter(key => !Object.prototype.hasOwnProperty.call(defaults, key));
  if (errors.length > 0) errors.forEach(err => console.error(`Key \`${err}\` of type \`${defaultsShape[err]}\` is missing.`));
}

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
  checkForDefaults(defaults);
  
  robot.on('pull_request.closed', async context => {
    const {number} = context.payload;

    let repoConfig;
    try {
      repoConfig = await context.config(configFilename);
    } catch (err) {
      repoConfig = defaults;
    }

    const config = Object.assign(defaults, repoConfig);

    return context.github.issues.createComment(context.repo({
      number,
      body: config.message
    }));
  });
};
