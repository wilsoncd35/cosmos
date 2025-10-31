"""End-to-end test fixtures."""

import os
import inspect
import pytest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

@pytest.fixture(scope="class")
def driver_chrome():
    """Class level Chrome driver setup and teardown."""

    opts = Options()
    opts.browser_version = 'stable'
    opts.accept_insecure_certs = True
    opts.timeouts = { 'script': 30000, 'pageLoad': 60000, 'implicit': 3000 }
    opts.add_argument("--disable-dev-shm-usage")
    opts.add_argument('--window-size=1920,1080')

    if os.getenv("cosmos_test_e2e_headless") == 'true':
        opts.add_argument("--headless=new")

    driver = webdriver.Chrome(options=opts)
    driver.set_window_size(1920, 1080)

    yield driver

    driver.quit()

@pytest.fixture(scope="session", autouse=True)
def before_all():
    """Run once before any tests in the session and tear down after all tests."""

    # Setup.
    resources = { 'config': True }
    yield resources

    # Teardown.

def pytest_collection_modifyitems(items):
    """
    Replace the final part of each item's nodeid with the test function name
    followed by the first line of its docstring so pytest output and failure
    reports show the function name then the human-readable description.
    """
    for item in items:
        obj = getattr(item, "obj", None)

        if obj is None:
            continue
        doc = inspect.getdoc(obj)

        if not doc:
            continue
        first_line = doc.splitlines()[0].strip()

        if not first_line:
            continue

        func_name = getattr(item, "name", None) or getattr(item, "originalname", None)
        label = f"{func_name}::{first_line}" if func_name else first_line
        parts = item.nodeid.split("::")
        parts[-1] = label
        item._nodeid = "::".join(parts)
