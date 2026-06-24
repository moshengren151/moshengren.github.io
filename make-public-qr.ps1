param(
  [Parameter(Mandatory = $true)]
  [ValidateNotNullOrEmpty()]
  [string]$Url
)

$ErrorActionPreference = "Stop"

$outputImage = Join-Path $PSScriptRoot "public-qr.png"
$outputHtml = Join-Path $PSScriptRoot "public-qr.html"
$encodedUrl = [System.Uri]::EscapeDataString($Url)
$qrApiUrl = "https://api.qrserver.com/v1/create-qr-code/?size=512x512&format=png&data=$encodedUrl"

[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
Invoke-WebRequest -Uri $qrApiUrl -OutFile $outputImage

$escapedUrl = [System.Net.WebUtility]::HtmlEncode($Url)
$html = @"
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>作品集二维码</title>
  <style>
    :root {
      color-scheme: dark;
      --bg: #06080d;
      --panel: rgba(255, 255, 255, 0.07);
      --line: rgba(255, 255, 255, 0.16);
      --text: #eef6f8;
      --muted: #95a3b7;
      --cyan: #62e6d3;
    }

    * {
      box-sizing: border-box;
    }

    body {
      display: grid;
      min-height: 100vh;
      margin: 0;
      place-items: center;
      background:
        radial-gradient(circle at 24% 18%, rgba(98, 230, 211, 0.16), transparent 28%),
        radial-gradient(circle at 76% 16%, rgba(158, 123, 255, 0.14), transparent 30%),
        var(--bg);
      color: var(--text);
      font-family: Arial, "Microsoft YaHei", sans-serif;
    }

    main {
      width: min(92vw, 620px);
      padding: 34px;
      border: 1px solid var(--line);
      border-radius: 18px;
      background: var(--panel);
      text-align: center;
    }

    img {
      width: min(78vw, 512px);
      height: auto;
      border: 12px solid #fff;
      border-radius: 12px;
      background: #fff;
    }

    h1 {
      margin: 0 0 18px;
      font-size: 28px;
    }

    a {
      display: inline-block;
      margin-top: 18px;
      color: var(--cyan);
      overflow-wrap: anywhere;
    }

    p {
      margin: 12px 0 0;
      color: var(--muted);
    }
  </style>
</head>
<body>
  <main>
    <h1>作品集二维码</h1>
    <img src="./public-qr.png" alt="作品集访问二维码">
    <p>扫码打开作品集</p>
    <a href="$escapedUrl" target="_blank" rel="noreferrer">$escapedUrl</a>
  </main>
</body>
</html>
"@

Set-Content -Path $outputHtml -Value $html -Encoding UTF8

Write-Host "QR image written to: $outputImage"
Write-Host "Preview page written to: $outputHtml"
