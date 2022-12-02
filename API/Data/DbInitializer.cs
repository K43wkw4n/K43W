using API.Entities;
using Microsoft.AspNetCore.Identity;

namespace API.Data
{
    public static class DbInitializer
    {
        public static async Task Initialize(Context context,UserManager<User> userManager)
        {
            #region Identityสร้างข้อมูล User
            if (!userManager.Users.Any())
            {
                var user = new User
                {
                    Id = "64123250118",
                    UserName = "Nung",
                    Email = "Nung@test.com"
                };
 
                await userManager.CreateAsync(user, "120645"); //ทำการ hash Password
                await userManager.AddToRoleAsync(user, "User"); // มี Role เดียว

                var teacher = new User
                {               
                    Id = "TeacherTest",     
                    UserName = "Teacher",
                    Email = "Teacher@test.com"
                };
 
                await userManager.CreateAsync(teacher, "252525"); //ทำการ hash Password
                await userManager.AddToRolesAsync(teacher, new[] { "User" , "Member" }); // มี Role เดียว
 
                var admin = new User
                {
                    UserName = "admin",
                    Email = "admin@test.com"
                };
 
                await userManager.CreateAsync(admin, "Pa$$w0rd"); //ทำการ hash Password
                await userManager.AddToRolesAsync(admin, new[] { "User" , "Member", "Admin" }); //มีหลาย Roles
            }
            #endregion

            if (context.Titles.Any()) return;
 
            var titles = new List<Title>
            {
                new Title
                {
                    Name = "นาย" 
                },
                new Title
                {
                    Name = "นาง" 
                },
                new Title
                {
                    Name = "นางสาว" 
                },
            };

            if (context.Statuses.Any()) return;

            var Status = new List<Status>{
                new Status{
                    Name = "กำลังศึกษาอยู่"
                },
                new Status{
                    Name = "พ้นสภาพนักศึกษา"
                },
                new Status{
                    Name = "สำเร็จการศึกษา"
                },
            };

            if (context.Schools.Any()) return;

            var Schools = new List<School>{
                new School{
                    Name = "โรงเรียนวัดราชบพิธ",
                    Province = "กรุงเทพมหานคร",
                    Tel = null,
                },
                new School{
                    Name = "โรงเรียนพระตำหนักสวนกุหลาบ",
                    Province = "กรุงเทพมหานคร",
                    Tel = null,
                },
                new School{
                    Name = "โรงเรียนราชินี",
                    Province = "กรุงเทพมหานคร",
                    Tel = null,
                },
            };

            foreach (var title in titles)
            {
                context.Titles.Add(title);
            }

            foreach (var status in Status)
            {
                context.Statuses.Add(status);
            }

            foreach (var school in Schools)
            {
                context.Schools.Add(school);
            }

            context.SaveChanges();
        }
    }
}
