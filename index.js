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
 * Anytime a user merges a pull request, they are reminded to delete their branch.
 * @param {Object} robot
 * @param {Config} defaults
 * @param {String} [configFilename]
 */
module.exports = (robot, defaults, configFilename = 'remind-merge.yml') => {
  checkForDefaults(defaults);

  robot.on('pull_request.closed', async context => {
    const {number} = context.payload;

    let config;
    try {
      const {remindMerge} = await context.config(configFilename);
      config = Object.assign(defaults, remindMerge);
    } catch (err) {
      config = defaults;
    }

    return context.github.issues.createComment(context.repo({
      number,
      body: config.message
    }));
  });

  console.log('Yay, the teacher-bot/remind-merge plugin was loaded!');

  // For more information on building plugins:
  // https://github.com/probot/probot/blob/master/docs/plugins.md

  // To get your plugin running against GitHub, see:
  // https://github.com/probot/probot/blob/master/docs/development.md

};
