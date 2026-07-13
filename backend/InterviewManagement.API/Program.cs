using InterviewManagement.API.Authorization;
using InterviewManagement.API.Common;
using InterviewManagement.API.Configuration;
using InterviewManagement.API.Data;
using InterviewManagement.API.Enums;
using InterviewManagement.API.Middleware;
using InterviewManagement.API.Services.Implementations;
using InterviewManagement.API.Services.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// ==============================
// Configuration
// ==============================

builder.Services.Configure<GoogleAuthSettings>(
    builder.Configuration.GetSection("GoogleAuthSettings"));

builder.Services.Configure<JwtSettings>(
    builder.Configuration.GetSection("JwtSettings"));

// ==============================
// Dependency Injection
// ==============================

builder.Services.AddScoped<IGoogleAuthService, GoogleAuthService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IJwtService, JwtService>();
builder.Services.AddScoped<IAuditLogService, AuditLogService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ISearchService, SearchService>();
builder.Services.AddScoped<ISearchHistoryService, SearchHistoryService>();

// Authorization Handler
builder.Services.AddScoped<IAuthorizationHandler, PermissionHandler>();

// ==============================
// JWT Authentication
// ==============================

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        var jwtSettings = builder.Configuration
            .GetSection("JwtSettings")
            .Get<JwtSettings>();

        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,

            ValidIssuer = jwtSettings!.Issuer,
            ValidAudience = jwtSettings.Audience,

            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(jwtSettings.SecretKey))
        };
    });

// ==============================
// Authorization Policies
// ==============================

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("Question:View",
        policy => policy.Requirements.Add(
            new PermissionRequirement("Question", PermissionAction.View)));

    options.AddPolicy("Question:Create",
        policy => policy.Requirements.Add(
            new PermissionRequirement("Question", PermissionAction.Create)));

    options.AddPolicy("Question:Update",
        policy => policy.Requirements.Add(
            new PermissionRequirement("Question", PermissionAction.Update)));

    options.AddPolicy("Question:Delete",
        policy => policy.Requirements.Add(
            new PermissionRequirement("Question", PermissionAction.Delete)));

    options.AddPolicy("Metadata:View",
        policy => policy.Requirements.Add(
            new PermissionRequirement("Metadata", PermissionAction.View)));

    options.AddPolicy("Metadata:Create",
        policy => policy.Requirements.Add(
            new PermissionRequirement("Metadata", PermissionAction.Create)));

    options.AddPolicy("Metadata:Update",
        policy => policy.Requirements.Add(
            new PermissionRequirement("Metadata", PermissionAction.Update)));

    options.AddPolicy("Metadata:Delete",
        policy => policy.Requirements.Add(
            new PermissionRequirement("Metadata", PermissionAction.Delete)));
});

// ==============================
// Controllers
// ==============================

builder.Services.AddControllers()
    .ConfigureApiBehaviorOptions(options =>
    {
        options.InvalidModelStateResponseFactory = context =>
        {
            var errors = context.ModelState.Values
                .SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage)
                .ToList();

            return new BadRequestObjectResult(new ApiResponse<object>
            {
                Success = false,
                Message = "Validation failed.",
                Errors = errors
            });
        };
    });

// ==============================
// Database
// ==============================

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")));

// ==============================
// Swagger
// ==============================

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Interview Management API",
        Version = "v1"
    });

    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Enter JWT token. Example: Bearer eyJhbGciOiJIUzI1NiIs..."
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

var app = builder.Build();

// ==============================
// Middleware
// ==============================

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();