using API.Data;
using API.DTOs;
using API.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class TeacherController : BaseApiController
    {
        private readonly Context _context;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public TeacherController(Context context, IMapper mapper, IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
            _mapper = mapper;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Teacher>>> GetTeachers()=>Ok(await _context.Teachers.Include(x=>x.Title).OrderBy(x=>x.Id).ToListAsync());
        
        [HttpGet("{id}", Name = "GetTeacher")]
        public async Task<ActionResult<Teacher>> GetTeacher(string id)
        {
            var Data = await _context.Teachers.Include(x=>x.Title).FirstAsync(x=>x.Id == id);
            if (Data == null) return NotFound();
            return Ok(Data);
        }
        
        // [HttpPost]
        // public async Task<ActionResult<Teacher>> CreateTeacher([FromForm] CreateTeacherDto teacherDto)
        // {
        //     var teacher = _mapper.Map<Teacher>(teacherDto);

        //     string wwwRootPath = _webHostEnvironment.WebRootPath;

        //     if (teacher.Img != null)
        //     {
        //         string fileName = Guid.NewGuid().ToString();
        //         var extension = Path.GetExtension(teacherDto.Img.FileName);
        //         var uploads = Path.Combine(wwwRootPath, @"images\ImgTeachers");

        //         if (!Directory.Exists(uploads)) Directory.CreateDirectory(uploads);

        //         using (var fileStreams = new FileStream(Path.Combine(uploads, fileName + extension), FileMode.Create))
        //         {
        //             teacherDto.Img.CopyTo(fileStreams);
        //         }
        //         teacher.Img = @"\images\ImgTeachers\" + fileName + extension;
        //     }

        //     await _context.Teachers.AddAsync(teacher);
        //     await _context.SaveChangesAsync();

        //     return Ok(teacher);
        // }
        
        [HttpPut]
        public async Task<ActionResult<Teacher>> UpdateTeacher([FromForm]UpdateTeacherDto teacherDto){
            
            var teacher = await _context.Teachers.FindAsync(teacherDto.Id);
            if(teacher == null) return NotFound();
            _mapper.Map(teacherDto,teacher);

            string wwwRootPath = _webHostEnvironment.WebRootPath;

            if (teacher.Img != null)
            {
                string fileName = Guid.NewGuid().ToString();
                var extension = Path.GetExtension(teacherDto.Img.FileName);
                var uploads = Path.Combine(wwwRootPath, @"images\ImgTeachers");

                if (!Directory.Exists(uploads)) Directory.CreateDirectory(uploads);

                if (teacher.Img != null)
                {
                    var oldImagePath = Path.Combine(wwwRootPath, teacher.Img.TrimStart('\\'));
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
                    teacherDto.Img.CopyTo(fileStreams);
                }
                teacher.Img = @"\images\ImgTeachers\" + fileName + extension;
            }

            _context.Update(teacher);
            await _context.SaveChangesAsync();

            return Ok(teacher);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTeacher(string id){
            var teacher = await _context.Teachers.FindAsync(id);
            if(teacher == null) return NotFound();
            
            string wwwRootPath = _webHostEnvironment.WebRootPath;

            if (teacher.Img != null)
            {
                var oldImagePath = Path.Combine(wwwRootPath, teacher.Img.TrimStart('\\'));
                if (System.IO.File.Exists(oldImagePath))
                {
                    System.IO.File.Delete(oldImagePath);
                }
            }

            _context.Remove(teacher);
            await _context.SaveChangesAsync();
            
            return Ok(teacher);
        }

    }
}