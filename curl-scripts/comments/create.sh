#!/bin/bash
#
# API="http://localhost:4741"
# URL_PATH="/animals"
#
# curl "${API}${URL_PATH}/${ID}" \
#   --include \
#   --request PATCH \
#   --header "Content-Type: application/json" \
#   --header "Authorization: Bearer ${TOKEN}" \
#   --data '{
#     "animal": {
#       "comments": "'"${COMMENTS}"'",
#     }
#   }'
#
# echo


API="http://localhost:4741"
URL_PATH="/comments"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "comments": {
      "body": "'"${BODY}"'",
      "owner": "'"${OWNER}"'"
    }
  }'

echo
