while IFS== read -r name value
do
  echo "$value" | vercel env add "$name" "$2"
done < "$1"