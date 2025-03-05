# pyproject.toml

Updating from Poetry 1 to 2 required a couple changes to the `pyproject.toml`.
Mostly removing default initialization entries that do not apply to non-package
projects like this. Additionally adding `package-mode = false` to make that
obvious.
