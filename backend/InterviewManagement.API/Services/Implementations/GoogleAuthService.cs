using Google.Apis.Auth;
using InterviewManagement.API.Configuration;
using InterviewManagement.API.Services.Interfaces;
using Microsoft.Extensions.Options;

namespace InterviewManagement.API.Services.Implementations
{
    public class GoogleAuthService : IGoogleAuthService
    {
        private readonly GoogleAuthSettings _googleAuthSettings;

        public GoogleAuthService(IOptions<GoogleAuthSettings> googleAuthSettings)
        {
            _googleAuthSettings = googleAuthSettings.Value;
        }

        public async Task<GoogleJsonWebSignature.Payload> VerifyGoogleTokenAsync(string idToken)
        {
            var settings = new GoogleJsonWebSignature.ValidationSettings
            {
                Audience = new[]
                {
                    _googleAuthSettings.ClientId
                }
            };

            var payload = await GoogleJsonWebSignature.ValidateAsync(
                idToken,
                settings);

            return payload;
        }
    }
}