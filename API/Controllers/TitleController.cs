using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class TitleController : BaseApiController
    {
        private readonly Context _context;
        public TitleController(Context context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<List<Title>> GetTitle(){
            
            return await _context.Titles.ToListAsync();
        }
    }
}