const configs = require('./lib/configs');

// A plugin is a Node module that exports a function which takes a `robot` argument
module.exports = robot => {

  robot.on('pull_request.closed', async context => {
    const {sender, number} = context.payload;
    const login = sender.login;

    const config = await configs(context);

    return context.github.issues.createComment(context.repo({
      number,
      body: config.remindMerge.message
    }));
  });

};
