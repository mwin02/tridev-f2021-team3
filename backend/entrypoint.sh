#!/bin/sh

# File name: entrypoint.sh
# Author: Queues Team
# Description: This is the script that is run when Docker is started.

if [ "$DATABASE" = "postgres" ]; then
    echo "Waiting for postgres..."

    while ! nc -z $SQL_HOST $SQL_PORT; do
        sleep 0.1
    done

    echo "PostgreSQL started"
fi

if [ "$FLASK_ENV" = "development" ]; then
    echo "Running the server locally..."
    python runner.py
fi

exec "$@"
