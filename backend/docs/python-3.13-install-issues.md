# Python 3.13

Experiencing installation issues when using python 3.13. Reverting to 3.12 does
not have the issue.

## `Pydantic` install problem

```text
$ poetry install
Creating virtualenv backend in /Users/rgant/Programming/HelloPatient/hellopatient-chatbot/backend/.venv
Installing dependencies from lock file

Package operations: 16 installs, 0 updates, 0 removals

  - Installing idna (3.7)
  - Installing sniffio (1.3.1)
  - Installing typing-extensions (4.7.1)
  - Installing annotated-types (0.5.0)
  - Installing anyio (3.7.1)
  - Installing pydantic-core (2.14.6): Failed

PEP517 build of a dependency failed

Backend subprocess exited when trying to invoke build_wheel

    | Command '['/var/folders/0z/3f6c6fvd75b9t93szh2_jjs00000gn/T/tmpcui6iir_/.venv/bin/python', '/Users/rgant/.local/pipx/venvs/poetry/lib/python3.13/site-packages/pyproject_hooks/_in_process/_in_process.py', 'build_wheel', '/var/folders/0z/3f6c6fvd75b9t93szh2_jjs00000gn/T/tmpqlzzqq4y']' returned non-zero exit status 1.
    |
    | Running `maturin pep517 build-wheel -i /var/folders/0z/3f6c6fvd75b9t93szh2_jjs00000gn/T/tmpcui6iir_/.venv/bin/python --compatibility off`
    | 💥 maturin failed
    |   Caused by: Cargo metadata failed. Do you have cargo in your PATH?
    |   Caused by: No such file or directory (os error 2)
    | Error: command ['maturin', 'pep517', 'build-wheel', '-i', '/var/folders/0z/3f6c6fvd75b9t93szh2_jjs00000gn/T/tmpcui6iir_/.venv/bin/python', '--compatibility', 'off'] returned non-zero exit status 1

Note: This error originates from the build backend, and is likely not a problem with poetry but one of the following issues with pydantic-core (2.14.6)

  - not supporting PEP 517 builds
  - not specifying PEP 517 build requirements correctly
  - the build requirements are incompatible with your operating system or Python version
  - the build requirements are missing system dependencies (eg: compilers, libraries, headers).

You can verify this by running pip wheel --no-cache-dir --use-pep517 "pydantic-core (==2.14.6)".
```
