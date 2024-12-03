FROM python:3.11-alpine

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# Set the working directory
WORKDIR /usr/src/app

# Copy required files
COPY ./requirements.txt /tmp/requirements.txt
COPY ./app /usr/src/app
COPY ./deployment/prod/run.sh /scripts/run.sh

# Expose the application port
EXPOSE 8000

# Build and prepare the environment
RUN python -m venv /py && \
    /py/bin/pip install --upgrade pip && \
    /py/bin/pip install -r /tmp/requirements.txt && \
    adduser --disabled-password --no-create-home django-user && \
    mkdir -p /usr/src/app/media /usr/src/app/static && \
    chmod -R 755 /usr/src/app && \
    chmod +x /scripts/run.sh

# Update PATH to use virtual environment and scripts
ENV PATH="/scripts:/py/bin:$PATH"

# Switch to non-root user
USER django-user

