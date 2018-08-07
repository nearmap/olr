# Contributing to OLR

Thanks for your interest in contributing to OpenLayers React Components.


## Submitting Bug Reports

Please use the [GitHub issue tracker](https://github.com/nearmap/olr/issues). Before creating a new issue, do a quick search to see if the problem has been reported already.


## Contributing Code

Please try to use ISSUE and PULL REQUEST templates where provided.

Follow the Angular commit message guidelines when committing code, or use the provided `npm run git` command to run _commitizen_ commits.

Our preferred means of receiving contributions is through [pull requests](https://help.github.com/articles/using-pull-requests). Make sure
that your pull request follows our pull request guidelines below before submitting it.

Please also follow code style, use the linter provided to help with styling.  All code must pass 100% test coverage and cover all use cases before merge.


## Contributor License Agreement

Your contribution will be under our [license](https://raw.githubusercontent.com/nearmap/olr/master/LICENSE) as per [GitHub's terms of service](https://help.github.com/articles/github-terms-of-service/#6-contributions-under-repository-license).


## Pull request guidelines

Before working on a pull request, create an issue explaining what you want to contribute. This ensures that your pull request won't go unnoticed, and that you are not contributing something that is not suitable for the project. Once a core developer has set the `pull request accepted` label on the issue, you can submit a pull request. The pull request description should reference the original issue.

Your pull request must:

 * Follow OLR's coding style.

 * Pass the integration tests run automatically by the Travis Continuous
   Integration system.

 * Address a single issue or add a single item of functionality.

 * Contain a clean history of small, incremental, logically separate commits,
   with no merge commits.

 * Use clear commit messages in Angular standard.

 * Be possible to merge automatically.


### Address a single issue or add a single item of functionality

Please submit separate pull requests for separate issues.  This allows each to
be reviewed on its own merits.


### Contain a clean history of small, incremental, logically separate commits, with no merge commits

The commit history explains to the reviewer the series of modifications to the
code that you have made and breaks the overall contribution into a series of
easily-understandable chunks.  Any individual commit should not add more than
one new class, component or one new function.  Do not submit commits that change thousands of lines or that contain more than one distinct logical change.  Trivial
commits, e.g. to fix lint errors, should be merged into the commit that
introduced the error.  See the [Atomic Commit Convention on Wikipedia](http://en.wikipedia.org/wiki/Atomic_commit#Atomic_Commit_Convention) for more detail.

`git apply --patch` and `git rebase` can help you create a clean commit
history.
[Reviewboard.org](http://www.reviewboard.org/docs/codebase/dev/git/clean-commits/)
and [Pro GIT](http://git-scm.com/book/en/Git-Tools-Rewriting-History) have
explain how to use them.


### Use clear commit messages

Commit messages should be short, and appropriately typed and scoped. We follow
https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines
for the formatting of commit messages.

> NOTE that general changes should be typed as **chore**, minor/major changes should be typed as **feat**.

Git commit message should look like:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

Please keep the type, scope and subject line short, no more than 50 characters.

### Be possible to merge automatically

Occasionally other changes to `master` might mean that your pull request cannot
be merged automatically.  In this case you may need to rebase your branch on a
more recent `master`, resolve any conflicts, and `git push --force` to update
your branch so that it can be merged automatically.
