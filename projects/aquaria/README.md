# aquaria

Scaffolding for end-to-end and REST API testing with Python, pytest, and selenium.

## Requirements

- Python 3.12.
- [Poetry](https://python-poetry.org)

## Environment

While these environment variables are not required (there are defaults) you may want to consider setting them if you need changes to the environment.

The following are examples.

```sh
export cosmos_config_test_e2e_headless='false'
export cosmos_config_test_e2e_base_url='https://todomvc.com/examples/react/dist/'

export cosmos_config_test_report_results_title='Unit Test Results'
export cosmos_config_test_report_results_path='tmp/test/project/results'

# reqres.in API key. REST API.
# We would not normally store this here. Its public free key.
export cosmos_config_test_api_key_reqres='reqres-free-v1'
export cosmos_config_test_api_base_url_reqres='https://reqres.in/api/'
```

## Usage

Install the project.

```sh
poetry install
```

Activate the virtual environment.

```sh
source .venv/bin/activate
```

Run e2e tests. By default these tests will target the [TodoMVC React app](https://todomvc.com/examples/react/dist).

```sh
pytest test/e2e
```

Run REST API tests. By default these tests will target [Reqres](https://reqres.in/api-docs).

```sh
pytest test/api
```

## Code Name

Aquaria. A ship from the Battlestar Gallactica universe.
