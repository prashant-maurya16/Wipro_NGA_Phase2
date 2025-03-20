using Job_Tracker_Application.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Job_Tracker_Application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobPortalController : ControllerBase
    {
        private readonly JobApllicationContext _context;

        public JobPortalController(JobApllicationContext context)
        {
            _context = context;
        }

        // 1) Show all JobPortals
        [HttpGet]
        public async Task<ActionResult<IEnumerable<JobPortal>>> GetJobPortals()
        {
            return await _context.JobPortal.ToListAsync();
        }

        // 2) Search By JobPortalId
        [HttpGet("{id}")]
        public async Task<ActionResult<JobPortal>> GetJobPortalById(int id)
        {
            var jobPortal = await _context.JobPortal.FindAsync(id);
            return jobPortal != null ? Ok(jobPortal) : NotFound("JobPortal not found");
        }


        // 2.1) Search By Job Name
        // 6) Search By Job Name (Case-Insensitive)
        [HttpGet("search/{jobName}")]
        public async Task<ActionResult<IEnumerable<JobPortal>>> SearchJobPortalByName(string jobName)
        {
            var jobPortals = await _context.JobPortal
                .Where(jp => EF.Functions.Like(jp.JobName.ToLower(), "%" + jobName.ToLower() + "%"))
                .ToListAsync();

            return jobPortals.Any() ? Ok(jobPortals) : NotFound("No job portals found with this name.");
        }


        // 3) Add JobPortal
        [HttpPost]
        public async Task<IActionResult> AddJobPortal([FromBody] JobPortal jobPortal)
        {
            if (jobPortal == null) return BadRequest("Invalid JobPortal Data");

            _context.JobPortal.Add(jobPortal);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetJobPortalById), new { id = jobPortal.CompanyId }, new { message = "JobPortal added successfully!" });
        }

        // 4) Update JobPortal
        [HttpPut("{id}")]
        public async Task<IActionResult> PutJobPortal(int id, JobPortal jobPortal)
        {
            if (id != jobPortal.CompanyId)
            {
                return BadRequest();
            }

            _context.Entry(jobPortal).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!JobPortalExists(id))
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

        // 5) Delete JobPortal
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJobPortal(int id)
        {
            var jobPortal = await _context.JobPortal.FindAsync(id);
            if (jobPortal == null)
            {
                return NotFound();
            }

            _context.JobPortal.Remove(jobPortal);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool JobPortalExists(int id)
        {
            return _context.JobPortal.Any(e => e.CompanyId == id);
        }
    }
}
