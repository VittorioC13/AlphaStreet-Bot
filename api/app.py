from flask import Flask, render_template, request, jsonify, redirect, url_for, session, send_from_directory, flash, abort
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta
import json
import os
import glob 
from pathlib import Path
import re
from dataclasses import dataclass, asdict
from typing import List, Union
from pymongo import MongoClient, ASCENDING
from functools import lru_cache
from pymongo.server_api import ServerApi
import certifi
from dotenv import load_dotenv
from bson import ObjectId
from hashlib import md5
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, SelectField, DateField
from wtforms.validators import DataRequired
from typing import Optional

app = Flask(__name__)
app.secret_key = 'your-secret-key-change-this-in-production'
app.conversations = None
app.messages = None

# Database Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'postgresql://postgres.raxegckgsveacgflvwbd:wdsjkdmmhaq@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
    'pool_pre_ping': True,
    'pool_recycle': 300,
}

# Initialize SQLAlchemy
db = SQLAlchemy(app)

# Database initialization
def init_db():
    """Initialize the database with only User table"""
    with app.app_context():
        db.create_all()

# Initialize Flask-Login
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

# Database Models
class User(db.Model, UserMixin):
    __tablename__ = 'user'
    
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(80), unique = True, nullable = False)
    password_hash = db.Column(db.String(255), nullable = False)
    premium_status = db.Column(db.String(20), default = 'none')  # none, basic, premium, max
    premium_expires_at = db.Column(db.DateTime, nullable = True)

    
    @property
    def has_valid_premium(self):
        """Check if user has valid premium access (basic/premium/max and not expired)"""
        if self.premium_status == 'none':
            return False
        if not self.premium_expires_at:
            return True  # Legacy users without expiration date
        return self.premium_expires_at > datetime.utcnow()
    
    @property
    def has_view_access(self):
        """Check if user has access to view reports (premium/max only, not basic)"""
        if self.premium_status in ['premium', 'max']:
            if not self.premium_expires_at:
                return True  # Legacy users without expiration date
            return self.premium_expires_at > datetime.utcnow()
        return False
    
def serialize_user(user: User):
    return {
        "id": user.id,
        "username": user.username,
        "premium_status": user.premium_status
    }
    
@login_manager.unauthorized_handler
def unauthorized_handler():
    if request.path.startswith('/api/'):
        return jsonify({'authenticated': False, 'error': 'unauthorized'}), 401
    return redirect(url_for('login', next=request.url))

@app.route("/api/auth/user", methods=['GET'])
def api_auth_user():
    if current_user.is_authenticated:
        return jsonify({
            'authenticated': True,
            'user': serialize_user(current_user)
        }), 200
    return jsonify({'authenticated': False}), 401

# User loader for Flask-Login
@login_manager.user_loader
def load_user(user_id):
    return db.session.get(User, int(user_id))

@app.route('/')
def index():
    """Main landing page"""
    return render_template('index.html')

@app.route('/api/login', methods=['GET', 'POST'])
def login():
    """Login endpoint"""
    if request.method == 'POST':
        data = request.get_json()
        username = data.get('username')  # Accept any username, not just email
        password = data.get('password')
        
        try:
            user = User.query.filter_by(username=username).first()

            if user and check_password_hash(user.password_hash, password):  # Assuming password is stored as plain text or hashed
                login_user(user)
                return jsonify({'success': True, 'redirect': '/dashboard'})
            else:
                return jsonify({'success': False, 'error': 'Invalid credentials'}), 401
        except Exception as e:
            print(f"Login error: {e}")
            return jsonify({'success': False, 'error': 'Database error'}), 500
    
    # GET request - show login form
    return render_template('login.html')

@app.route('/api/register', methods=['POST'])
def register():
    """User registration endpoint"""
    data = request.get_json()
    username = data.get('username')  # Accept any username, not just email
    password = data.get('password')
    name = data.get('name')
    
    if not username or not password or not name:
        return jsonify({'success': False, 'error': 'Missing required fields'}), 400
    
    try:
        # Check if user already exists
        existing_user = User.query.filter_by(username=username).first()
        if existing_user:
            return jsonify({'success': False, 'error': 'Username already registered'}), 400
        
        # Using werkzeug to saltedHash the passwords
        password_hash = generate_password_hash(password, "pbkdf2:sha256", 16)

        # Create new user with no premium status
        user = User(
            username=username, 
            password_hash=password_hash,
            premium_status='none',
            premium_expires_at=None
        )
        
        db.session.add(user)
        db.session.commit()
        
        # Log in the new user
        login_user(user)
        
        return jsonify({'success': True, 'redirect': '/dashboard'})
    except Exception as e:
        db.session.rollback()
        print(f"Registration error: {e}")
        return jsonify({'success': False, 'error': 'Database error'}), 500
