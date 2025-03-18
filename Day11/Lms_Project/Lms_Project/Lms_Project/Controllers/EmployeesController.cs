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
    public class EmployeesController : ControllerBase
    {
        private readonly EFCoreDbContext _context;

        public EmployeesController(EFCoreDbContext context)
        {
            _context = context;
        }

        // GET: api/Employees
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployee()
        {
            return await _context.Employee.ToListAsync();
        }

        // GET: api/Employees/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int? id)
        {
            var employee = await _context.Employee.FindAsync(id);

            if (employee == null)
            {
                return NotFound();
            }

            return employee;
        }

        // PUT: api/Employees/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee(int? id, Employee employee)
        {
            if (id != employee.EmpId)
            {
                return BadRequest();
            }

            _context.Entry(employee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
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



        // GET: api/Employees/5
        [HttpGet("/managereId/{mgrId}")]
        public async Task<ActionResult<Employee>> GetByMangerId(int mgrId)
        {
            var employee = await _context.Employee.FindAsync(mgrId);

            if (employee == null)
            {
                return NotFound();
            }

            return employee;

        }

        [HttpPut("updateLeaveBalance/{empId}")]
        public async Task<IActionResult> UpdateLeaveBalance(int empId, [FromBody] int leaveDays)
        {
            var employee = await _context.Employee.FindAsync(empId);
            if (employee == null)
            {
                return NotFound(new { message = "Employee not found" });
            }

            if (employee.LeaveAvail < leaveDays)
            {
                return BadRequest(new { message = "Insufficient leave balance" });
            }

            employee.LeaveAvail -= leaveDays;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Leave balance updated successfully", leaveAvail = employee.LeaveAvail });
        }


        // POST: api/Employees
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Employee>> PostEmployee(Employee employee)
        {
            _context.Employee.Add(employee);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEmployee", new { id = employee.EmpId }, employee);
        }

        // DELETE: api/Employees/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int? id)
        {
            var employee = await _context.Employee.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            _context.Employee.Remove(employee);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EmployeeExists(int? id)
        {
            return _context.Employee.Any(e => e.EmpId == id);
        }
    }
}