﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Customer_Project.Models;
using cms_api.Models;

namespace Customer_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly EFCoreDbContext _context;

        public CustomersController(EFCoreDbContext context)
        {
            _context = context;
        }
        [HttpGet("/login/{custUserName}/{custPassword}")]
        public async Task<ActionResult<string>> Login(string custUserName, string custPassword)
        {
            Customer? user = _context.Customers.Where(x => x.custUserName == custUserName && x.custPassword == custPassword).FirstOrDefault();
            if (user != null)
            {
                return "1";
            }
            return "0";

        }


        // GET: api/Customers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomer()
        {
            return await _context.Customers.ToListAsync();
        }

        // GET: api/Customers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetCustomer(int id)
        {
            var customer = await _context.Customers.FindAsync(id);

            if (customer == null)
            {
                return NotFound();
            }

            return customer;
        }

        // PUT: api/Customers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomer(int id, Customer customer)
        {
            if (id != customer.CustId)
            {
                return BadRequest();
            }

            _context.Entry(customer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(id))
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

        // POST: api/Customers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Customer>> PostCustomer(Customer customer)
        {
            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCustomer", new { id = customer.CustId }, customer);
        }

        // DELETE: api/Customers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            var customer = await _context.Customers.FindAsync(id);
            if (customer == null)
            {
                return NotFound();
            }

            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        // GET: api/Customers/{id}/wallet
        [HttpGet("/showWallet/{custId}")]
        public async Task<ActionResult<List<Wallet>>> ShowWallet(int custId)
        {
            var walletCustomer = await _context.Wallets.Where(x => x.custId == custId).ToListAsync();
            if (walletCustomer == null)
            {
                return NotFound("Wallet not found..");
            }
            return Ok(walletCustomer);

        }

        //GET:Menu

        



        private bool CustomerExists(int id)
        {
            return _context.Customers.Any(e => e.CustId == id);
        }
    }
}
