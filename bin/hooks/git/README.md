# git

General git hooks.

See [official git documentation](https://git-scm.com/docs/githooks) for details.

## install

Install project git hooks.

```shell
bin/hooks/git/install
```

## Skip Hooks

When you do not want hooks to run, use the no verify option.

The following is an example.

```sh
git add package.json
git commit -m 'Upade postinstall script.' --no-verify   # OR the shorter: -n
```
