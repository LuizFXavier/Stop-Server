export const emailTemplate = (username: string, url: string) => `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirme seu E-mail</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">

  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
      <td style="padding: 20px 0;">
        
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
          
          <tr>
            <td style="padding: 40px 30px 20px 30px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px; color: #333333;">Quase lá! Confirme seu e-mail.</h1>
            </td>
          </tr>

          <tr>
            <td style="padding: 20px 30px 30px 30px; color: #555555; font-size: 16px; line-height: 1.6;">
              <p style="margin: 0 0 20px 0;">Olá ${username},</p>
              <p style="margin: 0 0 25px 0;">
                Obrigado por se cadastrar no Stop Online. Para ativar sua conta, por favor, clique no botão abaixo e confirme seu endereço de e-mail.
              </p>

              <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center" style="margin: 30px auto;">
                <tr>
                  <td align="center" style="border-radius: 5px; background-color: #007bff;">
                    <a href="${url}" target="_blank" style="
                      display: inline-block;
                      padding: 12px 25px;
                      font-size: 16px;
                      font-weight: bold;
                      color: #ffffff;
                      text-decoration: none;
                      border-radius: 5px;
                      background-color: #007bff;
                      border: 1px solid #007bff;
                    ">
                      Confirmar Meu E-mail
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 30px 0 10px 0; text-align: center; font-size: 14px;">
                Se o botão não funcionar, copie e cole o link abaixo no seu navegador:
              </p>
              
              <p style="margin: 0; text-align: center; font-size: 12px; color: #888888; word-break: break-all;">
                <a href="${url}" target="_blank" style="color: #007bff;">
                  ${url}
                </a>
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding: 30px 30px; text-align: center; color: #888888; font-size: 12px; background-color: #f9f9f9; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
              <p style="margin: 0 0 10px 0;">Você recebeu este e-mail porque uma conta foi criada no Stop Online com este endereço.</p>
              <p style="margin: 0;">Se você não fez este cadastro, pode ignorar este e-mail com segurança.</p>
              <p style="margin: 15px 0 0 0;">© 2025 Stop Online. Todos os direitos reservados.</p>
            </td>
          </tr>

        </table>
        </td>
    </tr>
  </table>
  </body>
</html>
`