"""End-to-end tests for the Todo page."""
import time
import pytest
from ..pom.todoPage import TodoPage

@pytest.fixture(scope="class")
def page(driver_chrome) -> TodoPage:
    """Page fixture."""

    driver = driver_chrome
    return TodoPage(driver).get()

class TestTodo:
    """Test suite for the Todo page."""

    def test_header_is_visible(self, page: TodoPage):
        """The header element should be visible."""

        assert page.header.is_displayed()

    def test_todo_input_is_visible(self, page: TodoPage):
        """The todo input element should be visible."""

        assert page.todo_input.is_displayed()

    def test_add_todo_item_one(self, page: TodoPage):
        """Should be able to add a todo item."""

        todo_text = "Test todo item one."
        page.todo_input.send_keys(todo_text + "\n")
        todo_items = page.todo_items

        assert any(todo_text == item.text for item in todo_items), "Todo item was not added successfully."

    def test_add_todo_item_two(self, page: TodoPage):
        """Should be able to add a second todo item."""

        todo_text = "Test todo item two."
        page.todo_input.send_keys(todo_text + "\n")

        todo_items = page.todo_items

        assert any(todo_text == item.text for item in todo_items), "Second todo item was not added successfully."

    def test_add_todo_item_three(self, page: TodoPage):
        """Should be able to add a third todo item."""

        todo_text = "Test todo item three."
        page.todo_input.send_keys(todo_text + "\n")
        todo_items = page.todo_items

        assert any(todo_text == item.text for item in todo_items), "Third todo item was not added successfully."


    def test_total_todo_items_count(self, page: TodoPage):
        """Total todo items should be three."""

        todo_items = page.todo_items

        assert len(todo_items) == 3, f"Expected 3 todo items, found {len(todo_items)}."
        time.sleep(5)
