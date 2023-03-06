from flask import Flask, request, jsonify
from flask_swagger_ui import get_swaggerui_blueprint
import requests
app = Flask(__name__)

import music_route
SWAGGER_URL = '/swagger'
API_URL = '/static/swagger.yaml'
SWAGGER_BLUEPRINT = get_swaggerui_blueprint(
    SWAGGER_URL, API_URL, config = {
        'app_name' : 'Tune Twin API'
    }
)
app.register_blueprint(SWAGGER_BLUEPRINT, url_prefix = SWAGGER_URL)



if __name__ == "__main__":
    app.run(port=8000, debug=True)