# Add issue openers as collaborators

This [Probot](https://github.com/probot/probot/) [plugin](https://github.com/probot/probot/#plugins) automatically reminds users to delete their branch after the merge a pull request.

### Get Started

1. Install this app
1. You're done! But you can also customize the responses.

### Configuring Customized Responses

You can use the [default responses](lib/defaults.js), but if you'd like to specify your own, create a file inside a `.github` folder, titled `teacherbot.yml` and include the following text:

```yml
remindMerge: {
    message: ':wave: hiya Please remember to delete your branch after merging or closing if you haven\'t done so already.'
  }
```

### Permissions

When you enable this app, it will have [access to certain permissions](https://developer.github.com/v3/apps/permissions/). You will need to select:
- `GET /repositories/:repository_id/pulls/:id/merge (:read)`
- `POST /repositories/:repository_id/pulls/comments (:write) [B]`

### But why?

Perhaps you maintain a project with many contributors and you'd like to keep stale branches from piling up, or you want your users to automatically become collaborators as part of a [tutorial or self-paced course](https://services.github.com/on-demand/intro-to-github/join-class-repository). The possibilities are endless.

### Features

- Responds to recently merged pull requests.
- Allows for customized responses.

### Getting Help and Contributing

Just open a new issue in this repo if you find a bug, have a suggestion, or would like to chat about contributing. We also welcome pull requests.

# Made with :heart: by :octocat:s and friends

This Probot plugin is made by the friendly :octocat:s from GitHub Professional Services with help from the open source community. This plugin is an extension of the paid engagements that we provide to companies large and small. If you are intersted in how GitHub Professional Services can help you and your team or organization, [contact us](https://services.github.com/contact/).

For information regarding the different engagements we provide, please refer to the [Services](https://services.github.com/) web site.
