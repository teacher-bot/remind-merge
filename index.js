/**
 * @typedef {Object} Config
 * @prop {string} message
 *
 * Anytime a user opens an issue, add them as a collaborator to the repository.
 * @param {Object} robot
 * @param {Config} [defaults]
 */

module.exports = (robot, defaults = {}) => {
  let config;

  defaults = Object.assign({}, {
    remindMerge:
    {
      message: ':wave: hiya Please remember to delete your branch after merging or closing if you haven\'t done so already.'
    }
  }, defaults || {});

  robot.on('pull_request.closed', async context => {
    const {number} = context.payload;

    try {
      config = await context.config('teacherbot.yml');
    } catch (err) {
      config = defaults;
    }

    return context.github.issues.createComment(context.repo({
      number,
      body: config.remindMerge.message
    }));
  });
};
