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
    public class JobSeekerController : ControllerBase
    {
        private readonly JobApllicationContext _context;
        private readonly IConfiguration _configuration;
        private readonly GenrateMail _genrateMail;

        public JobSeekerController(JobApllicationContext context, IConfiguration configuration, GenrateMail genrateMail)
        {
            _context = context;
            _configuration = configuration;
            _genrateMail =genrateMail;
        }

        // 1) Show all JobSeekers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<JobSeeker>>> GetJobSeekers()
        {
            return await _context.JobSeeker.ToListAsync();
        }

        // 2) Search By JobSeekerId
        [HttpGet("{id}")]
        public async Task<ActionResult<JobSeeker>> GetJobSeekerById(int id)
        {
            var jobSeeker = await _context.JobSeeker.FindAsync(id);
            return jobSeeker != null ? Ok(jobSeeker) : NotFound("JobSeeker not found");
        }

        // 3) Jwt Migration
        [HttpPost]
        public async Task<IActionResult> AddJobSeeker([FromBody] JobSeeker jobSeeker)
        {
            if (jobSeeker == null) return BadRequest("Invalid JobSeeker Data");

            string encry = EncryptionHelper.Encrypt(jobSeeker.Password);
            jobSeeker.Password = encry;

            _context.JobSeeker.Add(jobSeeker);
            await _context.SaveChangesAsync();

            // Send Email to the registered job seeker
            string body = $"Congratulations {jobSeeker.UserName},\nYou have successfully registered on Job Tracker.Remember your password{jobSeeker.Password}";
            _genrateMail.MailInfo(jobSeeker.Email, "Job Tracker - Registration Successful", body);

            return CreatedAtAction(nameof(GetJobSeekerById), new { id = jobSeeker.JobSeekerId }, new { message = "JobSeeker added successfully!" });
        }

        // 4) Update JobSeeker
        [HttpPut("{id}")]
        public async Task<IActionResult> PutJobSeeker(int id, JobSeeker jobSeeker)
        {
            if (id != jobSeeker.JobSeekerId)
            {
                return BadRequest();
            }

            _context.Entry(jobSeeker).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!JobSeekerExists(id))
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

        // 5) Delete JobSeeker
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJobSeeker(int id)
        {
            var jobSeeker = await _context.JobSeeker.FindAsync(id);
            if (jobSeeker == null)
            {
                return NotFound();
            }

            _context.JobSeeker.Remove(jobSeeker);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool JobSeekerExists(int id)
        {
            return _context.JobSeeker.Any(e => e.JobSeekerId == id);
        }

        // 6) JobSeeker Login with JWT Authentication
        [HttpPost("login")]
        public async Task<IActionResult> JobSeekerLogin([FromBody] LoginSeekers request)
        {
            if (string.IsNullOrWhiteSpace(request.Username) || string.IsNullOrWhiteSpace(request.Password))
            {
                return BadRequest("Username and Password are required.");
            }

            
            var encr = EncryptionHelper.Encrypt(request.Password);

            var jobSeeker = await _context.JobSeeker
                .FirstOrDefaultAsync(j => j.UserName == request.Username && j.Password == encr);


            if (jobSeeker == null)
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
          new Claim(ClaimTypes.Name, jobSeeker.UserName),
          new Claim(ClaimTypes.Role, "JobSeeker")
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
                message = " Job Seeker Login successful",
                token = tokenString,
            });

            
        }

        // 7) Search By JobSeeker Username
        [HttpGet("username/{username}")]
        public async Task<ActionResult<JobSeeker>> GetJobSeekerByUsername(string username)
        {
            var jobSeeker = await _context.JobSeeker.FirstOrDefaultAsync(j => j.UserName == username);
            return jobSeeker != null ? Ok(jobSeeker) : NotFound("JobSeeker not found");
        }

        // 8) Secure API Example (Requires JWT Authentication)
        [Authorize]
        [HttpGet("secure-data")]
        public IActionResult GetSecureData()
        {
            return Ok("This is secure protected data.");
        }
    
       
    }
}
