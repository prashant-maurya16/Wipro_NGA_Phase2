using Job_Tracker_Application.Middelware;
using Job_Tracker_Application.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Job_Tracker_Application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplyJobController : ControllerBase
    {

        private readonly JobApllicationContext _context;
        private readonly GenrateMail _genrateMail;

        public ApplyJobController(JobApllicationContext context, GenrateMail genrateMail)
        {
            _context = context;
            _genrateMail = genrateMail;
        }

        // 1) Show all ApplyJobs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ApplyJob>>> GetApplyJobs()
        {
            return await _context.ApplyJob.ToListAsync();
        }

        // 2) Search By ApplyJobId
        [HttpGet("{id}")]
        public async Task<ActionResult<ApplyJob>> GetApplyJobById(int id)
        {
            var applyJob = await _context.ApplyJob.FindAsync(id);
            return applyJob != null ? Ok(applyJob) : NotFound("ApplyJob not found");
        }

        // 3) Add ApplyJob
        [HttpPost]
        public async Task<IActionResult> AddApplyJob([FromBody] ApplyJob applyJob)
        {
            if (applyJob == null) return BadRequest("Invalid ApplyJob Data");

            _context.ApplyJob.Add(applyJob);
            await _context.SaveChangesAsync();
            // Send Email to the registered job seeker
            var jobSeeker = await _context.JobSeeker.FindAsync(applyJob.JobSeekerId);
            var jobPortal= await _context.JobPortal.FindAsync(applyJob.PortalId);

            string body = $"Congratulations {jobSeeker.UserName},\nYou have successfully Applied For {jobPortal.JobName} ";
            _genrateMail.MailInfo(jobSeeker.Email, "Job Tracker - Application of Job", body);

           


            return CreatedAtAction(nameof(GetApplyJobById), new { id = applyJob.JobAppId }, new { message = "ApplyJob added successfully!" });
        }

        // 4) Update ApplyJob
        [HttpPut("{id}")]
        public async Task<IActionResult> PutApplyJob(int id, ApplyJob applyJob)
        {
            if (id != applyJob.JobAppId)
            {
                return BadRequest();
            }

            _context.Entry(applyJob).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ApplyJobExists(id))
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

        // 5) Delete ApplyJob
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteApplyJob(int id)
        {
            var applyJob = await _context.ApplyJob.FindAsync(id);
            if (applyJob == null)
            {
                return NotFound();
            }

            _context.ApplyJob.Remove(applyJob);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        // 6) Get Applied Jobs by JobSeekerId
        [HttpGet("jobseeker/{jobSeekerId}")]
        public async Task<ActionResult<IEnumerable<object>>> GetAppliedJobsByJobSeekerId(int jobSeekerId)
        {
            var appliedJobs = await _context.ApplyJob
                .Where(a => a.JobSeekerId == jobSeekerId)
                .Select(a => new
                {
                    a.JobAppId,
                    a.JobSeekerId,
                    a.PortalId,
                    JobName = _context.JobPortal
                        .Where(j => j.PortalId == a.PortalId)
                        .Select(j => j.JobName)
                        .FirstOrDefault(),
                    a.AppliedOn,
                    a.Status
                })
                .ToListAsync();

            return appliedJobs.Any() ? Ok(appliedJobs) : NotFound("No applied jobs found for this JobSeekerId.");
        }


        private bool ApplyJobExists(int id)
        {
            return _context.ApplyJob.Any(e => e.JobAppId == id);
        }
    }
}
