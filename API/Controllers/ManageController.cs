using API.Data;
using API.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ManageController : BaseApiController
    {
        private readonly Context _context;
        public ManageController(Context context)
        {
            _context = context;
        }

        
    }
}