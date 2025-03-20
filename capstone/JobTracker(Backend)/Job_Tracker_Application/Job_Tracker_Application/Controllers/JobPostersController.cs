using Job_Tracker_Application.Middelware;
using Job_Tracker_Application.Middleware;
using Job_Tracker_Application.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Job_Tracker_Application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobPostersController : ControllerBase
    {
        private readonly JobApllicationContext _context;
        private readonly IConfiguration _configuration;
        private readonly GenrateMail _genrateMail;

        public JobPostersController(JobApllicationContext context, IConfiguration configuration, GenrateMail genrateMail)
        {
            _context = context;
            _configuration = configuration;
            _genrateMail = genrateMail;

        }

        // 1) Show all JobPosters
        [HttpGet]
        public async Task<ActionResult<IEnumerable<JobPosters>>> GetJobPosters()
        {
            return await _context.JobPosters.ToListAsync();
        }

        // 2) Search By JobPosterId
        [HttpGet("{id}")]
        public async Task<ActionResult<JobPosters>> GetJobPosterById(int id)
        {
            var jobPoster = await _context.JobPosters.FindAsync(id);
            return jobPoster != null ? Ok(jobPoster) : NotFound("JobPoster not found");
        }



        // 3) Add JobPoster
        [HttpPost]
        public async Task<IActionResult> AddJobPoster([FromBody] JobPosters jobPoster)
        {
            if (jobPoster == null) return BadRequest("Invalid JobPoster Data");

            // Encrypt password before saving
            jobPoster.PasswordHashed = EncryptionHelper.Encrypt(jobPoster.PasswordHashed);

            _context.JobPosters.Add(jobPoster);
            await _context.SaveChangesAsync();
            // Send Email to the registered job seeker

            string body = $"Congratulations {jobPoster.UserName},\nYou have successfully registered on Job Tracker.";
            _genrateMail.MailInfo(jobPoster.Email, "Job Tracker - Registration Successful", body);

            return CreatedAtAction(nameof(GetJobPosterById), new { id = jobPoster.CompanyId}, new { message = "JobPoster added successfully!" });


           
        }

        // 4) Update JobPoster
        [HttpPut("{id}")]
        public async Task<IActionResult> PutJobPoster(int id, JobPosters jobPoster)
        {
            if (id != jobPoster.CompanyId)
            {
                return BadRequest();
            }

            // Encrypt password before updating
            jobPoster.PasswordHashed = EncryptionHelper.Encrypt(jobPoster.PasswordHashed);

            _context.Entry(jobPoster).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!JobPosterExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // 5) Delete JobPoster
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJobPoster(int id)
        {
            var jobPoster = await _context.JobPosters.FindAsync(id);
            if (jobPoster == null)
            {
                return NotFound();
            }

            _context.JobPosters.Remove(jobPoster);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool JobPosterExists(int id)
        {
            return _context.JobPosters.Any(e => e.CompanyId == id);
        }

        // 6) JobPoster Login with JWT Authentication
        [HttpPost("login")]
        public async Task<IActionResult> JobPosterLogin([FromBody] LoginPosters request)
        {
            if (string.IsNullOrWhiteSpace(request.Username) || string.IsNullOrWhiteSpace(request.PasswordHashed))
            {
                return BadRequest("Username and Password are required.");
            }

            var encryptedPassword = EncryptionHelper.Encrypt(request.PasswordHashed);

            var jobPoster = await _context.JobPosters
                .FirstOrDefaultAsync(j => j.UserName == request.Username && j.PasswordHashed == encryptedPassword);

            if (jobPoster == null)
            {
                return Unauthorized("Invalid username or password.");
            }

            // Get JWT settings from appsettings.json
            var jwtSettings = _configuration.GetSection("Jwt");
            var key = Encoding.ASCII.GetBytes(jwtSettings["Key"]);
            var now = DateTime.UtcNow;
            var expires = now.AddMinutes(Convert.ToDouble(jwtSettings["ExpirationMinutes"]));

            // Generate JWT Token
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, jobPoster.UserName),
                    new Claim(ClaimTypes.Role, "JobPoster")
                }),
                Issuer = jwtSettings["Issuer"],
                Audience = jwtSettings["Audience"],
                Expires = expires,
                NotBefore = now,
                IssuedAt = now,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return Ok(new
            {
                message = "Job Poster Login successful",
                token = tokenString,
            });
        }

        // 7) Secure API Example (Requires JWT Authentication)
        [Authorize]
        [HttpGet("secure-data")]
        public IActionResult GetSecureData()
        {
            return Ok("This is secure protected data.");
        }
    }
}
