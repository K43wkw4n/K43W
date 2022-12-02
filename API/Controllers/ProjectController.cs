using API.Data;
using API.DTOs;
using API.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ProjectController : BaseApiController
    {
        private readonly Context _context;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public ProjectController(Context context,IMapper mapper, IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
            _mapper = mapper;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Project>>> GetProjects(){
            var Data = await _context.Projects.ToListAsync();
            return Ok(Data);
        }
        
        [HttpGet("{id}",Name ="GetProject")]
        public async Task<ActionResult<Project>> GetProject(int id){

            var Data = await _context.Teachers.FindAsync(id);
            if (Data == null) return NotFound();
            return Ok(Data);
        }

        [HttpPost]
        public async Task<ActionResult<Project>> CreateProject([FromForm] CreateProjectDto projectDto)
        {
            var project = _mapper.Map<Project>(projectDto);

            string wwwRootPath = _webHostEnvironment.WebRootPath;

            if (project.File != null)
            {
                string fileName = Guid.NewGuid().ToString();
                var extension = Path.GetExtension(projectDto.File.FileName);
                var uploads = Path.Combine(wwwRootPath, @"images\ImgProjects");

                if (!Directory.Exists(uploads)) Directory.CreateDirectory(uploads);

                using (var fileStreams = new FileStream(Path.Combine(uploads, fileName + extension), FileMode.Create))
                {
                    projectDto.File.CopyTo(fileStreams);
                }
                project.File = @"\images\ImgProjects\" + fileName + extension;
            }

            await _context.Projects.AddAsync(project);
            await _context.SaveChangesAsync();

            return Ok(project);
        }

        [HttpPut]
        public async Task<ActionResult<Teacher>> UpdateProject([FromForm]UpdateProjectDto projectDto){
            
            var project = await _context.Projects.FindAsync(projectDto.Id);
            if(project == null) return NotFound();
            _mapper.Map(projectDto,project);

            string wwwRootPath = _webHostEnvironment.WebRootPath;

            if (project.File != null)
            {
                string fileName = Guid.NewGuid().ToString();
                var extension = Path.GetExtension(projectDto.File.FileName);
                var uploads = Path.Combine(wwwRootPath, @"images\ImgTeachers");

                if (!Directory.Exists(uploads)) Directory.CreateDirectory(uploads);

                if (project.File != null)
                {
                    var oldImagePath = Path.Combine(wwwRootPath, project.File.TrimStart('\\'));
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
                    projectDto.File.CopyTo(fileStreams);
                }
                project.File = @"\images\ImgTeachers\" + fileName + extension;
            }

            _context.Update(project);
            await _context.SaveChangesAsync();

            return Ok(project);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProject(int id){
            var project = await _context.Projects.FindAsync(id);
            if(project == null) return NotFound();
            
            string wwwRootPath = _webHostEnvironment.WebRootPath;

            if (project.File != null)
            {
                var oldImagePath = Path.Combine(wwwRootPath, project.File.TrimStart('\\'));
                if (System.IO.File.Exists(oldImagePath))
                {
                    System.IO.File.Delete(oldImagePath);
                }
            }

            _context.Remove(project);
            await _context.SaveChangesAsync();
            
            return Ok(project);
        }


    }
}