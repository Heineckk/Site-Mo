# Publica o projeto no GitHub (rode depois de: gh auth login)
$ErrorActionPreference = "Stop"
$env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path", "User")

Set-Location $PSScriptRoot

gh auth status 2>&1 | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "Voce precisa entrar no GitHub primeiro:" -ForegroundColor Yellow
    Write-Host "  gh auth login" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Escolha: GitHub.com -> HTTPS -> Login no navegador" -ForegroundColor Gray
    exit 1
}

$repoName = "ana-livia"

# Renomeia branch para main (padrao do GitHub)
git branch -M main 2>$null

# Cria repositorio privado e envia (ignora se ja existir)
gh repo create $repoName --private --source=. --remote=origin --push 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "Repositorio pode ja existir. Tentando apenas push..." -ForegroundColor Yellow
    git remote remove origin 2>$null
    $user = (gh api user -q .login)
    git remote add origin "https://github.com/$user/$repoName.git"
    git push -u origin main
}

$url = gh repo view --json url -q .url
Write-Host ""
Write-Host "Pronto! Repositorio:" -ForegroundColor Green
Write-Host $url -ForegroundColor Cyan
Write-Host ""
Write-Host "Proximo passo: publique na Vercel em https://vercel.com (Import Project)" -ForegroundColor Gray
