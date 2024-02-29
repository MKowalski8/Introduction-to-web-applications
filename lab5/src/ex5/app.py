from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt


app = Flask(__name__)
bcrypt = Bcrypt(app)
CORS(app)

app.config["JWT_SECRET_KEY"] = "super-secret"
jwt = JWTManager(app)

@app.route('/login', methods=["POST"])
def login():
    username = request.json.get("username", None)
    hashed_password  = request.json.get("password", None)
    
    is_valid = bcrypt.check_password_hash(hashed_password, 'test')

    # print(hashed_password)
    # print(is_valid)
    if username != "test" or not is_valid:
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=username)

    return jsonify(token=access_token)


@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200



if __name__ == '__main__':
    app.run()
