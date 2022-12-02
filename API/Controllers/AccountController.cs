using API.Data;
using API.DTOs;
using API.Entities;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<User> _userManager;
        private readonly TokenService _tokenService;
        private readonly Context _context;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _webHostEnvironment;
 
        public AccountController(Context context,UserManager<User> userManager,TokenService tokenService,IMapper mapper,IWebHostEnvironment webHostEnvironment
        )
        {
            _webHostEnvironment = webHostEnvironment;
            _mapper = mapper;
            _context = context;
            _tokenService = tokenService;
            _userManager = userManager;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByIdAsync(loginDto.UserName);
 
            if (user == null || !await _userManager.CheckPasswordAsync(user, loginDto.Password))
                return Unauthorized();
 
            return new UserDto
            {
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user),
            };
        }

        [HttpPost("register")]
        public async Task<ActionResult<Student>> Register([FromForm]PersonDto personDto)
        {
            var person = _mapper.Map<Person>(personDto);
            
            var user = new User {Id = personDto.Id, UserName = personDto.FirstName, Email = personDto.Email };
            var result = await _userManager.CreateAsync(user, personDto.Birth.ToString());

            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }
                return ValidationProblem();
            }

            string wwwRootPath = _webHostEnvironment.WebRootPath;
            
            List<Student> students = new List<Student>();
            List<Teacher> teachers = new List<Teacher>();

            if(person.Role == "User"){
                if (person.Image != null)
                {
                    string fileName = Guid.NewGuid().ToString();
                    var extension = Path.GetExtension(personDto.Image.FileName);
                    var uploads = Path.Combine(wwwRootPath, @"..\..\client\public\images\Students");

                    if (!Directory.Exists(uploads)) Directory.CreateDirectory(uploads);

                    using (var fileStreams = new FileStream(Path.Combine(uploads, fileName + extension), FileMode.Create))
                    {
                        personDto.Image.CopyTo(fileStreams);
                    }
                    person.Image = @"\images\Students\" + fileName + extension;
                }
                students.Add(new Student() {
                    Id = person.Id,
                    Name = person.FirstName,
                    SurName = person.LastName,
                    Sex = person.Sex,
                    Birthday = person.Birth,
                    Email = person.Email,
                    Tel = person.PhoneNumber,
                    Address = person.Address,
                    Img = person.Image,
                    OldEdu = person.OldEdu,
                    TitleId = person.TitleId,
                    StatusId = person.StatusId,
                    OldSchool = person.OldSchool,
                });
            }
            else if(person.Role == "Member"){
                if (person.Image != null)
                {
                    string fileName = Guid.NewGuid().ToString();
                    var extension = Path.GetExtension(personDto.Image.FileName);
                    var uploads = Path.Combine(wwwRootPath, @"..\..\client\public\images\Teachers");

                    if (!Directory.Exists(uploads)) Directory.CreateDirectory(uploads);

                    using (var fileStreams = new FileStream(Path.Combine(uploads, fileName + extension), FileMode.Create))
                    {
                        personDto.Image.CopyTo(fileStreams);
                    }
                    person.Image = @"\images\Teachers\" + fileName + extension;
                }
                teachers.Add(new Teacher() {
                    Id = person.Id,
                    Name = person.FirstName,
                    SurName = person.LastName,
                    Email = person.Email,
                    Birth = person.Birth,
                    IdCard = person.IdCard,
                    Img = person.Image,
                    Export = person.Export,
                    LvEdu = person.LvEdu,
                    Program = person.Program,
                    Position = person.Position,
                    TitleId = person.TitleId,
                });
            }
            else return NotFound();

            foreach(var item in students){
                await _context.Students.AddAsync(item);
            }

            foreach(var item in teachers){
                await _context.Teachers.AddAsync(item);
            }
            
            await _userManager.AddToRoleAsync(user, personDto.Role);
            
            await _context.Persons.AddAsync(person);
            await _context.SaveChangesAsync();
            
            return Ok(person);
        }

        [Authorize]
        [HttpGet("currentUser")]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            // Console.WriteLine("👍", User.Identity.Name);
            var user = await _userManager.FindByNameAsync(User.Identity.Name);

            var data = await _context.Students.FirstAsync(x=>x.Id == user.Id);

            return new UserDto
            {
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user),
                Id = data.Id,
                FirstName = data.Name,
                LastName = data.SurName,
                Sex = data.Sex,
            };
        }
    }
}
