from app import app

def handler(environ, start_response):
    return app.wsgi_app(environ, start_response)
