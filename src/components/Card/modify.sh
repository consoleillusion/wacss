#!/run/current-system/sw/bin/bash

for file in "$@"; do
  echo "Processing $file..."
  yq eval -i '
    if (.required == null) then
      .required = ["component", "block"]
    else
      .required += ["component", "block"]
    end
  ' "$file"
done

