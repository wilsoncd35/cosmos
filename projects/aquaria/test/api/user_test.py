import os
import requests

class TestUser:
    """Test user API endpoints."""

    base_url = os.getenv("cosmos_config_test_api_base_url_reqres", "https://reqres.in/api")
    api_key = os.getenv("cosmos_config_test_api_key_reqres", "reqres-free-v1")

    def test_get_users(self):
        """Should return list of users."""

        response = requests.get(f"{self.base_url}/users",
            headers={"x-api-key": self.api_key,
                     "accept": "application/json"
                     },

            params={"page": 1,
                    "per_page": 3
                    }
        )

        assert response.status_code == 200
        assert len(response.json().get('data', [])) == 3
