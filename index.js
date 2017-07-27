// A plugin is a Node module that exports a function which takes a `robot` argument
module.exports = robot => {
  const defaults = Object.assign({}, {
    remindMerge:
    {
      message: ':wave: hiya Please remember to delete your branch after merging or closing if you haven\'t done so already.'
    }
  } || {});

  robot.on('pull_request.closed', async context => {
    const {sender, number} = context.payload;
    const login = sender.login;

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
