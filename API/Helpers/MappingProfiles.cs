using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Helpers
{
    public class MappingProfiles:Profile
    {
        public MappingProfiles()
        {
            CreateMap<CreateTeacherDto,Teacher>();
            CreateMap<UpdateTeacherDto,Teacher>();
            
            CreateMap<CreateStudentDto,Student>();
            CreateMap<UpdateStudentDto,Student>();

            CreateMap<CreatePictureDto,Picture>();
            CreateMap<UpdatePictureDto,Picture>();

            CreateMap<CreateProjectDto,Project>();
            CreateMap<UpdateProjectDto,Project>();

            CreateMap<PersonDto,Person>();
            CreateMap<StudentDto,Student>();

        }
    }
}