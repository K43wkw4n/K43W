using API.Data;
using API.DTOs;
using API.Entities;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class PictureController : BaseApiController
    {
        private readonly Context _context;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IMapper _mapper;
        private readonly ImageService _imageService;
        public PictureController(Context context, IMapper mapper, IWebHostEnvironment webHostEnvironment,ImageService imageService)
        {
            _imageService = imageService;
            _mapper = mapper;
            _webHostEnvironment = webHostEnvironment;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Picture>>> GetPictures()
        {
            return Ok(await _context.Pictures.ToListAsync());
        }

        [HttpGet("{id}", Name = "GetPicture")]
        public async Task<ActionResult<List<Picture>>> GetPicture(int Id)
        {
            var piceture = await _context.Pictures.FindAsync(Id);
            if(piceture == null) return NotFound();
            return Ok(piceture);
        }

        [HttpPost]
        public async Task<ActionResult<Picture>> CreatePicture([FromForm] CreatePictureDto pictureDto)
        {
            var Picture = _mapper.Map<Picture>(pictureDto);

            if (pictureDto.File != null)
            {
                var imageResult = await _imageService.AddImageAsync(pictureDto.File);
 
                if (imageResult.Error != null)
                    return BadRequest(new ProblemDetails { Title = imageResult.Error.Message });
 
                Picture.Img = imageResult.SecureUrl.ToString();
                Picture.PublicId = imageResult.PublicId;
            }


            // string wwwRootPath = _webHostEnvironment.WebRootPath;

            // if (Picture.Img != null)
            // {
            //     string ImgName = Guid.NewGuid().ToString();
            //     var extension = Path.GetExtension(pictureDto.Img.ImgName);
            //     var uploads = Path.Combine(wwwRootPath, @"../../client/public/images/PicturesShow");

            //     if (!Directory.Exists(uploads)) Directory.CreateDirectory(uploads);

            //     using (var ImgStreams = new ImgStream(Path.Combine(uploads, ImgName + extension), ImgMode.Create))
            //     {
            //         pictureDto.Img.CopyTo(ImgStreams);
            //     }
            //     Picture.Img = @"\images\PicturesShow\" + ImgName + extension;
            // }

            _context.Pictures.Add(Picture);
            var result = await _context.SaveChangesAsync() > 0;
            if (result) return CreatedAtRoute("GetPicture", new { Id = Picture.Id }, Picture.Id);
            return BadRequest(new ProblemDetails { Title = "Problem creating new picture" });
        }

        [HttpPut]
        public async Task<ActionResult<Picture>> UpdatePicture([FromForm] UpdatePictureDto pictureDto)
        {
            var Picture = await _context.Pictures.FindAsync(pictureDto.Id);
            if (Picture == null) return Unauthorized();
            _mapper.Map(pictureDto, Picture);

            if (pictureDto.File != null) 
            {
                var imageResult = await _imageService.AddImageAsync(pictureDto.File);
 
                if (imageResult.Error != null) 
                    return BadRequest(new ProblemDetails{Title = imageResult.Error.Message});
 
                if (!string.IsNullOrEmpty(Picture.PublicId)) 
                    await _imageService.DeleteImageAsync(Picture.PublicId);
 
                Picture.Img = imageResult.SecureUrl.ToString();
                Picture.PublicId = imageResult.PublicId;

            }


            // string wwwRootPath = _webHostEnvironment.WebRootPath;

            // if (Picture.Img != null)
            // {
            //     string ImgName = Guid.NewGuid().ToString();
            //     var extension = Path.GetExtension(pictureDto.Img.ImgName);
            //     var uploads = Path.Combine(wwwRootPath, @"../../client/public/images/PicturesShow");

            //     if (!Directory.Exists(uploads)) Directory.CreateDirectory(uploads);

            //     if (Picture.Img != null)
            //     {
            //         var oldImagePath = Path.Combine(wwwRootPath, Picture.Img.TrimStart('\\'));
            //         if (System.IO.Img.Exists(oldImagePath))
            //         {
            //             System.IO.Img.Delete(oldImagePath);
            //         }
            //     }

            //     // if (Picture.Img != null)
            //     // {
            //     //     var oldImagePath = Path.Combine("~/images/ImgPictures" + ImgName);
            //     //     if(System.IO.Img.Exists(oldImagePath))
            //     //     {
            //     //         System.IO.Img.Delete(oldImagePath);
            //     //     }
            //     // }

            //     using (var ImgStreams = new ImgStream(Path.Combine(uploads, ImgName + extension), ImgMode.Create))
            //     {
            //         pictureDto.Img.CopyTo(ImgStreams);
            //     }
            //     Picture.Img = @"\images\PicturesShow\" + ImgName + extension;
            // }

            // _context.Update(Picture);
            var result = await _context.SaveChangesAsync() > 0;
            if (result) return Ok(Picture);
            return BadRequest(new ProblemDetails { Title = "Problem updating Picture" });
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeletePicture(int id)
        {
            var picture = await _context.Pictures.FindAsync(id);
            if (picture == null) return NotFound();

            if (!string.IsNullOrEmpty(picture.PublicId)) 
                await _imageService.DeleteImageAsync(picture.PublicId);

            // string wwwRootPath = _webHostEnvironment.WebRootPath;

            // if (picture.Img != null)
            // {
            //     var oldImagePath = Path.Combine(wwwRootPath, picture.Img.TrimStart('\\'));
            //     if (System.IO.Img.Exists(oldImagePath))
            //     {
            //         System.IO.Img.Delete(oldImagePath);
            //     }
            // }

            _context.Remove(picture);
            var result = await _context.SaveChangesAsync() > 0;
            if (result) return Ok();
            return BadRequest(new ProblemDetails { Title = "Problem deleting Picture" });
        }


    }
}