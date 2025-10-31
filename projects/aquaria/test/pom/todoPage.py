"""Todo page object model."""

from selenium.webdriver.common.by import By
from selenium.webdriver.remote.webdriver import WebDriver
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

from .basePage import BasePage

class TodoPage(BasePage):
    """Page object model for the TodoMVC page."""

    url = "https://todomvc.com/examples/react/dist/"

    header_locator = (By.CSS_SELECTOR, "[data-testid='header']")
    todo_input_locator = (By.CSS_SELECTOR, "[data-testid='text-input']")
    todo_items_locator = (By.CSS_SELECTOR, "[data-testid='todo-item']")

    def __init__(self, driver: WebDriver):
        self.driver = driver

    def load(self):
        """Load the page."""
        self.driver.get(self.url)

    def is_loaded(self):
        """Is this page loaded?"""

        try:
            WebDriverWait(self.driver, 10).until(EC.visibility_of_element_located(self.header))
            return True
        except:
            return False
    
    @property
    def header(self):
        """Get the header element."""
        return self.driver.find_element(*self.header_locator)

    @property
    def todo_input(self):
        """Get the todo input element."""
        return self.driver.find_element(*self.todo_input_locator)
    
    @property
    def todo_items(self):
        """Get the list of todo items."""
        return self.driver.find_elements(*self.todo_items_locator)
