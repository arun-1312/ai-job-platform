import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import bcrypt
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Initialize Flask App and CORS
app = Flask(__name__)
CORS(app)

# --- Supabase Connection ---
url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

# --- API Routes ---

# --- 1. Sign-up Route ---
@app.route('/api/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')

        if not name or not email or not password:
            return jsonify({'message': 'Please enter all fields.'}), 400

        # Check if user already exists
        response = supabase.table('users').select('email').eq('email', email).execute()
        if response.data:
            return jsonify({'message': 'User with this email already exists.'}), 400

        # Hash the password
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

        # Insert the new user
        insert_response = supabase.table('users').insert({
            'name': name,
            'email': email,
            'password': hashed_password
        }).execute()

        if insert_response.data:
            new_user = insert_response.data[0]
            print('New user created:', new_user)
            # We can integrate JWT later as per the project plan
            return jsonify({'user': new_user, 'message': 'User created successfully!'}), 201
        else:
            raise Exception("Failed to insert user")

    except Exception as e:
        print('Signup error:', e)
        return jsonify({'message': str(e) or 'Server error during sign up.'}), 500


# --- 2. Login Route ---
@app.route('/api/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({'message': 'Please enter all fields.'}), 400

        # Find the user by email
        response = supabase.table('users').select('*').eq('email', email).execute()
        
        if not response.data:
            return jsonify({'message': 'Invalid credentials. User not found.'}), 400

        user = response.data[0]

        # Check if the password is correct
        if not bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
            return jsonify({'message': 'Invalid credentials. Password incorrect.'}), 400
        
        # Remove password from the response data for security
        del user['password']

        return jsonify({
            'user': user,
            'message': 'Login successful!'
        }), 200

    except Exception as e:
        print('Login error:', e)
        return jsonify({'message': str(e) or 'Server error during login.'}), 500


# Start the server
if __name__ == '__main__':
    app.run(debug=True, port=5000)
