$dir = "C:\Users\HP3\.cursor\projects\c-Users-HP3-Desktop-education-conclave-2026\assets"
$f = Get-ChildItem -Path $dir -Filter "*8b7bc390-4540-4138-aac7-9bcd47c5e207.png" | Select-Object -First 1
if (-not $f) { throw "Source banner not found" }
Copy-Item -LiteralPath $f.FullName -Destination "C:\Users\HP3\Desktop\education-conclave-2026\assets\season-3-banner.png" -Force
Write-Output $f.FullName
