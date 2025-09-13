from app import app  # Import your Flask app instance from app.py

# Vercel looks for this 'handler' function
def handler(environ, start_response):
    return app.wsgi_app(environ, start_response)
