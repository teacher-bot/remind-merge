const defaultsShape = {
  message: 'string',
};

/*/
function checkForDefaults(defaults) {
  const errors = Object.keys(defaultsShape).filter(key => !Object.prototype.hasOwnProperty.call(defaults, key));
  if (errors.length > 0) errors.forEach(err => console.error(`Key \`${err}\` of type \`${defaultsShape[err]}\` is missing.`));
}*/


/*
 * @typedef {Object} Config
 * @prop {string} message
 *
 * Anytime a user merges a pull request, they are reminded to delete their branch.
 * @param {Object} robot
 * @param {Config} defaults
 * @param {String} [configFilename]
 */
module.exports = (robot, defaults, configFilename = 'remind-merge.yml') => {
  //checkForDefaults(defaults);

  robot.on('pull_request.closed', async context => {
    const {
      number
    } = context.payload;

    let merged = context.payload.pull_request.state
    let branchName = context.payload.pull_request.head.ref
    let remote = context.payload.pull_request.head.repo.html_url

    let config;
    try {
      const {
        remindMerge
      } = await context.config(configFilename);
      config = Object.assign({}, defaults, remindMerge);
    } catch (err) {
      config = defaults;
    }


    let exec = require('child_process').exec,
      deleteBranch;

    deleteBranch = exec('git push ' + remote + ' -d ' + branchName,
      function(error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
          console.log('exec error: ' + error);
        }
      });


    function commentAndCleanup() {
      if (merged == "merged") {
        setTimeout(function() {
          exec
        }, 1600000);
        return context.github.issues.createComment(context.repo({
          number,
          body: "Congratulations! You merged your branch! Now, please delete your branch. If you don't delete your branch within two minutes, I'll go ahead and delete it for you."
        }));
      } else if (merged == "closed") {
        setTimeout(function() {
          exec
        }, 1600000);
        return context.github.issues.createComment(context.repo({
          number,
          body: "Are you sure you want to close this pull request without merging it? If you don't re-open this pull request or delete your branch within two minutes, I'll go ahead and delete your branch for you. Good luck!"
        }));
      }
    }

    commentAndCleanup();

  });


  console.log('Yay, the teacher-bot/remind-merge plugin was loaded!');

  // For more information on building plugins:
  // https://github.com/probot/probot/blob/master/docs/plugins.md

  // To get your plugin running against GitHub, see:
  // https://github.com/probot/probot/blob/master/docs/development.md

};
