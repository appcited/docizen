$destinationFile = "dist/merged-docs.md"

if (Test-Path $destinationFile) {
  Remove-Item $destinationFile
}

# Get the full path of the docs directory
$docsDir = (Get-Item "./src/content/docs").FullName

# Recursively get all .mdx and .md files under the base directory
$files = Get-ChildItem -Path $docsDir -Recurse |
  Where-Object { $_.Extension -eq ".mdx" -or $_.Extension -eq ".md" }

foreach ($file in $files) {
  $relativePath = ($file.FullName.Substring($docsDir.Length)) -replace '\\', '/'
  $relativePathWithoutExtension = $relativePath -replace "\.[^.]+$", ""
  $wikiUrl = "https://animated-goggles-qzngnej.pages.github.io$relativePathWithoutExtension"

  # Add a comment with wiki url
  Add-Content -Path $destinationFile -Value "<!-- Wiki Url: $wikiUrl -->" -Encoding UTF8

  # Append the file content to the destination file
  $fileContent = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
  Add-Content -Path $destinationFile -Value $fileContent -Encoding UTF8
  Add-Content -Path $destinationFile -Value "`r`n" -Encoding UTF8
}
