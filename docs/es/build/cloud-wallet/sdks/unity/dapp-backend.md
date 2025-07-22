---
layout: doc
title: Requisitos del Backend de la dApp
description: Requisitos del Backend de la dApp
---

# Backend de la dApp

## Implementación

**Código de ejemplo**

```csharp
using System;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

public class CloudWalletController
{
    private readonly IConfiguration _configuration;
    private readonly HttpClient _httpClient;

    public CloudWalletController(IConfiguration configuration)
    {
        _configuration = configuration;
        _httpClient = new HttpClient();
    }

    [HttpPost("sdk-token")]
    public async Task<IActionResult> GetSDKSingleUseToken([FromBody] TokenRequest request)
    {
        try
        {
            // Extraer client_id del cuerpo de la solicitud o usar el predeterminado de la configuración
            var clientId = request.ClientId ?? _configuration["MyCloudWallet:ClientId"];

            if (string.IsNullOrEmpty(clientId))
            {
                return BadRequest(new { error = "client_id es requerido" });
            }

            // Preparar el payload
            var payload = new
            {
                client_id = clientId,
                client_secret = _configuration["MyCloudWallet:ClientSecret"]
            };

            // Construir la URL del endpoint para el intercambio de token
            var sdkAuthorizationEndpoint = _configuration["MyCloudWallet:SdkAuthorizationEndpoint"];
            var endpoint = $"{sdkAuthorizationEndpoint}/dapp-sdk/sut/{clientId}";

            // Realizar la solicitud POST
            var content = new StringContent(
                JsonSerializer.Serialize(payload),
                Encoding.UTF8,
                "application/json"
            );

            var response = await _httpClient.PostAsync(endpoint, content);
            var responseContent = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                return StatusCode((int)response.StatusCode, JsonSerializer.Deserialize<object>(responseContent));
            }

            return Ok(JsonSerializer.Deserialize<object>(responseContent));
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = "Ha ocurrido un error interno del servidor" });
        }
    }
}

public class TokenRequest
{
    public string ClientId { get; set; }
}
```

**Configuración**
```json
{
  "MyCloudWallet": {
    "SdkAuthorizationEndpoint": "https://login-api.mycloudwallet.com/v1/wcw", // URL base de la API
    "ClientSecret": "your-client-secret", // Clave secreta del cliente
    "ClientId": "your-client-id" // Opcional: ID de cliente predeterminado si no se proporciona en la solicitud
  }
}
```

## Clave API del SDK de la dApp
1. Accede a [My Cloud Wallet - Configuración de Desarrollador](https://www.mycloudwallet.com/settings/developer-settings)
2. Solicitud de Autorización del SDK
![Solicitud de Autorización del SDK](./../../../../../public/assets/sdks/unity/dapp-backend/requesting-for-sdk-authorization.png)
3. Completando el Formulario de Solicitud de Autorización del SDK
![Completando el Formulario de Solicitud de Autorización del SDK](./../../../../../public/assets/sdks/unity/dapp-backend/filling-sdk-authorization-request-form.png)
4. URL de Callback Autorizada: URL de tu Backend de DApp
5. Ingresa el Código 2FA (configura uno si aún no lo has hecho)
![Ingresa el Código 2FA](./../../../../../public/assets/sdks/unity/dapp-backend/input-2fa-code.png)
6. Pendiente de aprobación
![Pendiente de aprobación](./../../../../../public/assets/sdks/unity/dapp-backend/pending-for-approval.png)
7. Una vez Aprobada/Denegada, aparecerá una notificación en la esquina superior derecha
![notificación de aprobación](./../../../../../public/assets/sdks/unity/dapp-backend/approval-notification.png)
8. Una vez que la solicitud es aprobada, haz clic nuevamente en el elemento de la solicitud para ver la clave secreta. ¡Ten en cuenta que la clave secreta **solo se puede ver una vez**!
![Solicitud aprobada](./../../../../../public/assets/sdks/unity/dapp-backend/reuest-approved-1.png)
![Ver Clave Secreta oAuth](./../../../../../public/assets/sdks/unity/dapp-backend/view-oauth-secret-key.png)