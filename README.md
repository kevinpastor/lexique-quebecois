# Lexique Québécois

## Git

<!--
The following section was based of [CRLF vs. LF: Normalizing Line Endings in Git](https://www.aleksandrhovhannisyan.com/blog/crlf-vs-lf-normalizing-line-endings-in-git/).
-->

To keep a consistent end of line character between developers, the `autocrlf` setting of Git should be set to `true`.

```bash
git config --global core.autocrlf true
```

If the previous command was run after the repository was clone, Git's working tree might mismatch with your current configuration. Simply run the following commands in order to fix the issue.

```bash
git rm --cached -r .
git reset --hard
```
