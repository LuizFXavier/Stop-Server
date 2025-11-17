export const authPage = () => `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>E-mail Confirmado!</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
      background-color: #f4f7f6;
      margin: 0;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
    }

    .container {
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      width: 90%;
      max-width: 450px;
      padding: 40px;
      text-align: center;
      box-sizing: border-box; /* Garante que o padding não estoure o width */
    }

    .success-icon {
      width: 70px;
      height: 70px;
      margin-bottom: 20px;
    }

    .success-icon .circle {
      fill: #e5f7f0; /* Fundo do círculo */
    }

    .success-icon .checkmark {
      stroke: #00b074; /* Cor do "check" */
    }

    h1 {
      color: #333333;
      font-size: 24px;
      font-weight: 600;
      margin: 0 0 15px 0;
    }

    p {
      color: #555555;
      font-size: 16px;
      line-height: 1.6;
      margin: 0 0 30px 0;
    }

    .btn-login {
      display: inline-block;
      padding: 12px 30px;
      font-size: 16px;
      font-weight: 600;
      color: #ffffff;
      background-color: #007bff; /* Azul primário */
      border: none;
      border-radius: 5px;
      text-decoration: none;
      transition: background-color 0.2s ease;
    }

    .btn-login:hover {
      background-color: #0056b3; /* Azul mais escuro no hover */
    }
  </style>
</head>
<body>

  <div class="container">
    
    <svg class="success-icon" viewBox="0 0 52 52">
      <circle class="circle" cx="26" cy="26" r="25" fill="none"/>
      <path class="checkmark" fill="none" stroke-width="3" stroke-linecap="round" d="M14 27l6 6 18-18"/>
    </svg>

    <h1>E-mail confirmado!</h1>
    
    <p>
      Ótima notícia! Sua conta foi ativada com sucesso. Agora você já pode fazer login no <strong>Stop Online</strong>.
    </p>

  </div>

</body>
</html>
`