using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AureliaDotnetTemplate.Models;
using Lesson9.Models;

namespace Lesson9.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MyEventsController : ControllerBase
    {
        private readonly EventsContext _context;

        public MyEventsController(EventsContext context)
        {
            _context = context;
        }

        // GET: api/MyEvents
        [HttpGet]
        public IEnumerable<MyEvent> GetMyEvents()
        {
            return _context.MyEvents;
        }

        // GET: api/MyEvents/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMyEvent([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var myEvent = await _context.MyEvents.FindAsync(id);

            if (myEvent == null)
            {
                return NotFound();
            }

            return Ok(myEvent);
        }

        // PUT: api/MyEvents/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMyEvent([FromRoute] int id, [FromBody] MyEvent myEvent)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != myEvent.Id)
            {
                return BadRequest();
            }

            _context.Entry(myEvent).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MyEventExists(id))
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

        // POST: api/MyEvents
        [HttpPost]
        public async Task<IActionResult> PostMyEvent([FromBody] MyEvent myEvent)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.MyEvents.Add(myEvent);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMyEvent", new { id = myEvent.Id }, myEvent);
        }

        // DELETE: api/MyEvents/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMyEvent([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var myEvent = await _context.MyEvents.FindAsync(id);
            if (myEvent == null)
            {
                return NotFound();
            }

            _context.MyEvents.Remove(myEvent);
            await _context.SaveChangesAsync();

            return Ok(myEvent);
        }

        private bool MyEventExists(int id)
        {
            return _context.MyEvents.Any(e => e.Id == id);
        }
    }
}