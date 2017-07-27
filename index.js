// A plugin is a Node module that exports a function which takes a `robot` argument
module.exports = robot => {
  let config;
  const defaults = Object.assign({}, {
    remindMerge:
    {
      message: ':wave: hiya Please remember to delete your branch after merging or closing if you haven\'t done so already.'
    }
  } || {});

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
