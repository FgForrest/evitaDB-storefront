url="http://evita:5555/rest/evita/Product/get/63049"

status_code=0
timeout=60  # Timeout after 60 seconds
elapsed=0
interval=5  # Check every 5 seconds

echo "Waiting for $url to be ready..."

while [ $status_code -ne 200 ]
do
    status_code=$(curl -o /dev/null -s -w "%{http_code}\n" $url)
    if [ $status_code -eq 200 ]; then
        echo "Received 200 OK from $url, service is up."
        break
    else
        echo "Service at $url not ready yet, waiting..."
        elapsed=$((elapsed + interval))
    fi
done

if [ $status_code -ne 200 ]; then
    echo "Service at $url did not become ready in time."
    exit 1
fi

npm run dev