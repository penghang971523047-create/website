# 一键发布到 GitHub Pages（gh-pages 分支）。在项目根目录运行：powershell -File scripts\deploy.ps1
# 绑定自有域名后，把 $base 改成 "/"，$site 改成你的域名。
$ErrorActionPreference = "Stop"
$owner = (gh api user --jq .login)
$repo  = Split-Path -Leaf (Get-Location)
$env:SITE = "https://$owner.github.io"
$env:BASE = "/$repo"
npm run build
$remote = git remote get-url origin
Push-Location dist
New-Item -ItemType File -Force .nojekyll | Out-Null
git init -q -b gh-pages
git add -A
git -c user.name="$(git config --global user.name)" -c user.email="$(git config --global user.email)" commit -qm "deploy $(Get-Date -Format s)"
git push -f $remote gh-pages
Pop-Location
Write-Host "已发布：https://$owner.github.io/$repo/"
