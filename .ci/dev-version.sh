set -ex
BRANCH=next
PACKAGE=$(cat package.json | jq -r '.["name"]')
VERLOC=$(cat package.json | jq -r '.["version"]')
VERNPMRAW=$(curl -s https://registry.npmjs.org/$PACKAGE | jq -r '.["dist-tags"].'$BRANCH'')
BUILD_VERSION=0

if [[ "$VERNPMRAW" == "null" ]]; then
    VEROUT=$VERLOC
else
    VERNPM=$(echo $VERNPMRAW | cut -d'-' -f1)
    BUILD_VERSION=$(echo $VERNPMRAW | awk -F '[.-]' '{print $5+1}')
    VEROUT=$(printf "$VERNPM\n$VERLOC\n" | sort -V -r | awk 'NR==1 {print; exit}')
fi

# Check if VEROUT already has a -build suffix
if [[ "$VEROUT" == *-build.* ]]; then
    CLEAN_VERSION=$(echo $VEROUT | cut -d'-' -f1)
else
    CLEAN_VERSION=$VEROUT
fi

jq -r '.version = "'${CLEAN_VERSION}'-build.'$BUILD_VERSION'"' package.json > /tmp/package.json && mv /tmp/package.json ./package.json
npm publish --tag $BRANCH