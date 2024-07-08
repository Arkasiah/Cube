using Microsoft.AspNetCore.Authentication.JwtBearer;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddReverseProxy()
    .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options => 
    {
        options.Authority = builder.Configuration["IdentityServiceUrl"];
        options.RequireHttpsMetadata = false;
        options.TokenValidationParameters.ValidateAudience = false;
        options.TokenValidationParameters.NameClaimType = "username";
    });

var customPolicy = "CustomPolicy";

builder.Services.AddCors(options => 
{
    options.AddPolicy(name: customPolicy, b => 
    {
        b.AllowAnyHeader()
            .WithOrigins("https://app.cube-auction.store")
            .AllowAnyHeader()
            .AllowAnyMethod();
            // .AllowAnyMethod().AllowCredentials().WithOrigins(builder.Configuration["ClientApp"])
    });
});

var app = builder.Build();

app.UseCors(customPolicy);

app.MapReverseProxy();

app.UseAuthentication();
app.UseAuthorization();

app.Run();
