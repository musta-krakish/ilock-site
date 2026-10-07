#!/usr/bin/env sh

set -eu

: "${ARCHIVE_PATH:?ARCHIVE_PATH is required}"
: "${APP_IMAGE:?APP_IMAGE is required}"
: "${PROJECT_DIR:?PROJECT_DIR is required}"

case "$ARCHIVE_PATH" in
	"$PROJECT_DIR"/incoming/*) ;;
	*)
		echo "Refusing to use an archive outside $PROJECT_DIR/incoming" >&2
		exit 1
		;;
esac

require_file() {
	if [ ! -f "$1" ]; then
		echo "Required file is missing: $1" >&2
		exit 1
	fi
}

require_file "$ARCHIVE_PATH"
require_file "$PROJECT_DIR/docker-compose.production.yml"
require_file "$PROJECT_DIR/.env"

if ! command -v docker >/dev/null 2>&1; then
	echo "Docker is not available for the deployment user" >&2
	exit 1
fi

# amoCRM credentials for the lead form come from the GitHub Environment on every
# deploy and are kept apart from the hand-maintained .env. A deploy without them
# leaves the previous file in place.
CRM_ENV="$PROJECT_DIR/.env.crm"
if [ -n "${CRM_TOKEN:-}" ] && [ -n "${CRM_URL:-}" ]; then
	(
		umask 077
		printf 'TOKEN=%s\nCRM_URL=%s\n' "$CRM_TOKEN" "$CRM_URL" > "$CRM_ENV.tmp"
		mv -f -- "$CRM_ENV.tmp" "$CRM_ENV"
	)
	echo "amoCRM settings updated"
elif [ ! -f "$CRM_ENV" ]; then
	(umask 077 && : > "$CRM_ENV")
	echo "amoCRM settings are not provided; the lead form will answer 503" >&2
fi

echo "Validating deployment configuration..."
(
	cd "$PROJECT_DIR"
	APP_IMAGE="$APP_IMAGE" docker compose \
		-f docker-compose.production.yml --env-file .env config -q
)

echo "Importing Docker image..."
docker load --input "$ARCHIVE_PATH"
docker image inspect "$APP_IMAGE" >/dev/null

echo "Restarting application container..."
cd "$PROJECT_DIR"
APP_IMAGE="$APP_IMAGE" docker compose \
	-f docker-compose.production.yml --env-file .env \
	up -d --no-build --force-recreate app

# The archive is no longer needed after Docker has imported the image. It stays
# in place on a failed deploy to make diagnosis and a retry possible.
rm -f -- "$ARCHIVE_PATH"
