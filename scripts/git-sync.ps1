$ErrorActionPreference = 'Stop'
$branch = git rev-parse --abbrev-ref HEAD
if (-not $branch) {
    Write-Host 'Unable to determine current branch.'
    exit 1
}

Write-Host "Staging all changes..."
git add -A

git diff --cached --quiet --exit-code
if ($LASTEXITCODE -ne 0) {
    $message = "Auto sync $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
    git commit -m $message
} else {
    Write-Host 'No changes to commit.'
}

Write-Host "Pushing to origin/$branch..."
git push -u origin $branch
