using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using lmsProject.Models;
using Lms_Project.Models;

namespace lmsProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeaveHistoriesController : ControllerBase
    {
        private readonly EFCoreDbContext _context;

        public LeaveHistoriesController(EFCoreDbContext context)
        {
            _context = context;
        }

        // GET: api/LeaveHistories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LeaveHistory>>> GetLeaveHistory()
        {
            return await _context.LeaveHistory.AsNoTracking().ToListAsync();
        }

        // GET: api/LeaveHistories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LeaveHistory>> GetLeaveHistory(int id)
        {
            var leaveHistory = await _context.LeaveHistory
                                             .AsNoTracking()
                                             .FirstOrDefaultAsync(lh => lh.LeaveId == id);

            if (leaveHistory == null)
            {
                return NotFound($"Leave record with ID {id} not found.");
            }

            return leaveHistory;
        }

        // GET: api/LeaveHistories/ByEmployee/2000
        [HttpGet("ByEmployee/{empId}")]
        public async Task<ActionResult<IEnumerable<LeaveHistory>>> GetLeaveHistoryByEmpId(int empId)
        {
            var leaveHistory = await _context.LeaveHistory
                                             .AsNoTracking()
                                             .Where(lh => lh.EmpId == empId)
                                             .ToListAsync();

            if (!leaveHistory.Any())
            {
                return NotFound($"No leave records found for Employee ID {empId}");
            }

            return leaveHistory;
        }






        // ✅ GET: api/LeaveHistories/PendingSubordinates/1000
        [HttpGet("PendingSubordinates/{mgrId}")]
        public async Task<ActionResult<IEnumerable<LeaveHistory>>> GetPendingLeavesForSubordinates(int mgrId)
        {
            // Get all employees who have the given managerId
            var subordinates = await _context.Employee
                                             .AsNoTracking()
                                             .Where(e => e.MgrId == mgrId)
                                             .Select(e => e.EmpId)
                                             .ToListAsync();

            if (!subordinates.Any())
            {
                return NotFound($"No subordinates found for Manager ID {mgrId}");
            }

            // Fetch pending leave requests for subordinates
            var pendingLeaves = await _context.LeaveHistory
                                              .AsNoTracking()
                                              .Where(lh => subordinates.Contains(lh.EmpId) && lh.LeaveStatus == "PENDING")
                                              .ToListAsync();

            return pendingLeaves;
        }





        // PUT: api/LeaveHistories/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLeaveHistory(int id, LeaveHistory leaveHistory)
        {
            if (id != leaveHistory.LeaveId)
            {
                return BadRequest("Mismatched Leave ID.");
            }

            _context.Entry(leaveHistory).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!LeaveHistoryExists(id))
                {
                    return NotFound();
                }
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }

            return NoContent();
        }

        // POST: api/LeaveHistories
        [HttpPost]
        public async Task<ActionResult<LeaveHistory>> PostLeaveHistory(LeaveHistory leaveHistory)
        {
            if (leaveHistory.EmpId == 0)
            {
                return BadRequest("Employee ID is required.");
            }

            _context.LeaveHistory.Add(leaveHistory);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetLeaveHistory), new { id = leaveHistory.LeaveId }, leaveHistory);
        }

        // DELETE: api/LeaveHistories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLeaveHistory(int id)
        {
            var leaveHistory = await _context.LeaveHistory.FindAsync(id);
            if (leaveHistory == null)
            {
                return NotFound();
            }

            _context.LeaveHistory.Remove(leaveHistory);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // POST: api/LeaveHistories/ApplyLeave
        [HttpPost("ApplyLeave")]
        public async Task<ActionResult<LeaveHistory>> ApplyLeave([FromBody] LeaveHistory leaveRequest)
        {
            if (leaveRequest.EmpId == 0 || leaveRequest.LeaveStartDate == null || leaveRequest.LeaveEndDate == null)
            {
                return BadRequest("Employee ID, Start Date, and End Date are required.");
            }

            // Calculate the number of days
            leaveRequest.noOfDays = (leaveRequest.LeaveEndDate - leaveRequest.LeaveStartDate).Days + 1;
            leaveRequest.LeaveStatus = "PENDING";

            _context.LeaveHistory.Add(leaveRequest);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetLeaveHistory), new { id = leaveRequest.LeaveId }, leaveRequest);
        }

        private bool LeaveHistoryExists(int id)
        {
            return _context.LeaveHistory.Any(e => e.LeaveId == id);
        }
    }
}