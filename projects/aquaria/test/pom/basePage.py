"""Base page object model."""

import os

class BasePage:
    """Base page object model."""

    url = os.getenv("cosmos_config_test_e2e_base_url", "https://todomvc.com/examples/react/dist/")

    def is_loaded(self):
        """Is this page loaded?"""
        raise NotImplementedError("Subclasses must implement is_loaded method.")

    def load(self):
        """Load the page."""
        raise NotImplementedError("Subclasses must implement load method.")

    def get(self):
        if not self.is_loaded():
            self.load()

        return self
