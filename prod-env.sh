#!/bin/sh

export MIX_ENV=prod
export PORT=5002
export DATABASE_URL="ecto://timesheets:password@localhost/timesheets_prod"
export SECRET_KEY_BASE="FFdiiImj/C7SCsz9Ge9wK6MyD0hKMuUb5O7gfquIyu76aRlHNbwBcwGh10+IX4OT"