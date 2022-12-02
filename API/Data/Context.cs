using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class Context : IdentityDbContext<User>
    {
        public Context(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Teacher> Teachers { get; set; }
        public DbSet<Title> Titles { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<School> Schools { get; set; }
        public DbSet<Status> Statuses { get; set; }
        public DbSet<History> Histories { get; set; }
        public DbSet<Job> Jobs { get; set; }
        public DbSet<Picture> Pictures { get; set; }
        public DbSet<Person> Persons { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<IdentityRole>()
            .HasData(
                new IdentityRole { Name = "Admin", NormalizedName = "ADMIN" },
                new IdentityRole { Name = "Teacher", NormalizedName = "MEMBER" },
                new IdentityRole { Name = "Student", NormalizedName = "USER" }
            );
        }

    }
}
