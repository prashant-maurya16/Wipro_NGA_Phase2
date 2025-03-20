using Job_Tracker_Application.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace Job_Tracker_Application.Models
{
    public class AuthService : IAuthService
    {
        private readonly JobApllicationContext _context;
        private readonly JwtSettings _jwtSettings;

        public AuthService(JobApllicationContext context, IOptions<JwtSettings> jwtSettings)
        {
            _context = context;
            _jwtSettings = jwtSettings.Value;
        }
        public async Task<string> Authenticate(string username, string password)
        {
            var user = await _context.JobSeeker.SingleOrDefaultAsync(u => u.UserName == username);

            if (user == null || user.Password != password) // Use hashed passwords in production
            {
                return null;
            }

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.SecretKey));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _jwtSettings.Issuer,
                audience: _jwtSettings.Audience,
                expires: DateTime.Now.AddMinutes(_jwtSettings.ExpirationMinutes),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);




        }
    }
}
