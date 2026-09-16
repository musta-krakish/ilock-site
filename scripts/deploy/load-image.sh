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

test -f "$ARCHIVE_PATH"
test -f "$PROJECT_DIR/docker-compose.yml"
test -f "$PROJECT_DIR/.env"

docker load --input "$ARCHIVE_PATH"
docker image inspect "$APP_IMAGE" >/dev/null

cd "$PROJECT_DIR"
APP_IMAGE="$APP_IMAGE" docker compose --env-file .env up -d --no-build --force-recreate app

# The archive is no longer needed after Docker has imported the image. It stays
# in place on a failed deploy to make diagnosis and a retry possible.
rm -f -- "$ARCHIVE_PATH"
