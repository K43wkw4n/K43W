using System.Text;
using API.Data;
using API.Entities;
using API.Helpers;
using API.Middleware;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
#region Swagger Config
builder.Services.AddSwaggerGen(c =>
    {
        c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
        c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
        {
            Description = "Jwt auth header",
            Name = "Authorization",
            In = ParameterLocation.Header,
            Type = SecuritySchemeType.ApiKey,
            Scheme = "Bearer"
        });
        c.AddSecurityRequirement(new OpenApiSecurityRequirement
        {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            },
                            Scheme = "oauth2",
                            Name = "Bearer",
                            In = ParameterLocation.Header
                        },
                        new List<string>()
                    }
        });
    });
#endregion

builder.Services.AddDbContext<Context>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddAutoMapper(typeof(MappingProfiles).Assembly);

#region Cors
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(MyAllowSpecificOrigins,
                          policy =>
                          {
                              policy.AllowAnyHeader()
                                    .AllowAnyMethod()
                                    .AllowCredentials()
                                    .WithOrigins("http://127.0.0.1:5173");
                              // .SetIsOriginAllowed(x => true);
                          });
});
#endregion

#region Identity สร้างเซอร์วิส User,Role (ระวังการเรียงลำดับ)
builder.Services.AddIdentityCore<User>(opt =>
{
    opt.User.RequireUniqueEmail = true;

    opt.Password.RequireDigit = true;
    opt.Password.RequireLowercase = false;
    opt.Password.RequireNonAlphanumeric = false;
    opt.Password.RequireUppercase = false;
    opt.Password.RequiredLength = 6;
})
     .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<Context>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                       .AddJwtBearer(opt =>
                       {
                           opt.TokenValidationParameters = new TokenValidationParameters
                           {
                               ValidateIssuer = false,
                               ValidateAudience = false,
                               ValidateLifetime = true,
                               ValidateIssuerSigningKey = true,
                               IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8
                                   .GetBytes(builder.Configuration["JWTSettings:TokenKey"]))
                           };
                       });

builder.Services.AddAuthorization();
builder.Services.AddScoped<TokenService>();
builder.Services.AddScoped<ImageService>();
#endregion

var app = builder.Build();

#region  //สร้างข้อมูลจำลอง Fake data
using var scope = app.Services.CreateScope(); //using หลังทำงานเสร็จจะถูกทำลายจากMemory
var context = scope.ServiceProvider.GetRequiredService<Context>();
var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();

try
{
    await context.Database.MigrateAsync();   //สร้าง DB ให้อัตโนมัติถ้ายังไม่มี
    await DbInitializer.Initialize(context, userManager); //สร้างข้อมูลสินค้าและยูเซอร์จำลอง
}
catch (Exception ex)
{
    logger.LogError(ex, "Problem migrating data");
}
#endregion

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

#region ส่ง error ไปให้ Axios ตอนทำ Interceptor
app.UseMiddleware<ExceptionMiddleware>();
#endregion

app.UseRouting(); //เส้นทางของ API, การเปลี่ยนเส้นทาง เทียบเท่ากับ redirect

app.UseDefaultFiles(); // อนุญาตให้เรียกไฟล์ต่างๆ ใน wwwroot
app.UseStaticFiles();  // อนุญาตให้เข้าถึงไฟล์ค่าคงที่ได้

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthentication();
app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
    endpoints.MapFallbackToController("Index", "Fallback");
});

await app.RunAsync();