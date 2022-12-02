using API.Data;
using API.DTOs;
using API.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class StudentController : BaseApiController
    {
        private readonly Context _context;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public StudentController(Context context, IMapper mapper, IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
            _mapper = mapper;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Student>>> GetStudents() => Ok(await _context.Students
            .Include(x => x.Title)
            .Include(x => x.Status).OrderBy(x => x.Id).ToListAsync());

        [HttpGet("{id}", Name = "GetStudent")]
        public async Task<ActionResult<Student>> GetStudent(string id)
        {
            var Data = await _context.Students.Include(x => x.Title).Include(x => x.Status).FirstAsync(x => x.Id == id);
            if (Data == null) return NotFound();
            return (Data);
        }

        // [HttpPost]
        // public async Task<ActionResult<Student>> CreateStudent([FromForm] CreateStudentDto studentDto)
        // {
        //     studentDto.Birthday.ToString();

        //     var student = _mapper.Map<Student>(studentDto);

        //     string wwwRootPath = _webHostEnvironment.WebRootPath;

        //     if (student.Img != null)
        //     {
        //         string fileName = Guid.NewGuid().ToString();
        //         var extension = Path.GetExtension(studentDto.Img.FileName);
        //         var uploads = Path.Combine(wwwRootPath, @"..\..\client\public\images\ImgStudents");

        //         if (!Directory.Exists(uploads)) Directory.CreateDirectory(uploads);

        //         using (var fileStreams = new FileStream(Path.Combine(uploads, fileName + extension), FileMode.Create))
        //         {
        //             studentDto.Img.CopyTo(fileStreams);
        //         }
        //         student.Img = @"\images\ImgStudents\" + fileName + extension;
        //     }

        //     await _context.Students.AddAsync(student);
        //     await _context.SaveChangesAsync();

        //     return Ok(student);
        // }

        [HttpPut]
        public async Task<ActionResult<Student>> UpdateStudent([FromForm] UpdateStudentDto studentDto)
        {
            var student = await _context.Students.FindAsync(studentDto.Id);
            if (student == null) return NotFound();
            _mapper.Map(studentDto, student);

            string wwwRootPath = _webHostEnvironment.WebRootPath;

            if (student.Img != null)
            {
                string fileName = Guid.NewGuid().ToString();
                var extension = Path.GetExtension(studentDto.Img.FileName);
                var uploads = Path.Combine(wwwRootPath, @"..\..\client\public\images\Students");

                if (!Directory.Exists(uploads)) Directory.CreateDirectory(uploads);

                if (student.Img != null)
                {
                    var oldImagePath = Path.Combine(wwwRootPath, student.Img.TrimStart('\\'));
                    if (System.IO.File.Exists(oldImagePath))
                    {
                        System.IO.File.Delete(oldImagePath);
                    }
                }

                // var oldImagePath = Path.Combine("~/Images/" + fileName);
                // if(System.IO.File.Exists(oldImagePath))
                // {
                //     System.IO.File.Delete(oldImagePath);
                // }

                using (var fileStreams = new FileStream(Path.Combine(uploads, fileName + extension), FileMode.Create))
                {
                    studentDto.Img.CopyTo(fileStreams);
                }
                student.Img = @"\images\Students\" + fileName + extension;
            }

            _context.Update(student);
            await _context.SaveChangesAsync();

            return Ok(student);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteStudent(string id)
        {
            var Student = await _context.Students.FindAsync(id);
            if (Student == null) return NotFound();

            string wwwRootPath = _webHostEnvironment.WebRootPath;

            if (Student.Img != null)
            {
                var oldImagePath = Path.Combine(wwwRootPath, Student.Img.TrimStart('\\'));
                if (System.IO.File.Exists(oldImagePath))
                {
                    System.IO.File.Delete(oldImagePath);
                }
            }

            _context.Remove(Student);
            await _context.SaveChangesAsync();

            return Ok(Student);
        }


    }
}