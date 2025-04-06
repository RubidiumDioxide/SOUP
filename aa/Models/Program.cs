using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http.Headers;
using Microsoft.Net.Http.Headers;
using System;
using System.Dynamic;
using System.Security.Cryptography;
using aa.Models; 
using aa.Controllers;

namespace aa.Models;

public class Program
{
    public static void Main(string[] args)
    {
        var app_builder = WebApplication.CreateBuilder(args);

        var config_builder = new ConfigurationBuilder();
        config_builder.SetBasePath(Directory.GetCurrentDirectory());
        config_builder.AddJsonFile("appsettings.json");
        var config = config_builder.Build();
        string connectionString = config.GetConnectionString("DefaultConnection");

        app_builder.Services.AddDbContext<SoupDbContext>(options => options.UseSqlServer(connectionString));
        app_builder.Services.AddSpaStaticFiles(configuration =>
        {
            configuration.RootPath = "client/src";
        });
        //app_builder.Services.AddScoped<IUserService, UserService>();
        app_builder.Services.AddControllers(options =>
        {
            options.SuppressAsyncSuffixInActionNames = false;
        });
        app_builder.Services.AddAuthorization();
        app_builder.Services.AddEndpointsApiExplorer();
        app_builder.Services.AddSwaggerGen(c =>
        {
            c.ResolveConflictingActions(apiDescriptions => apiDescriptions.First());
        });

        var app = app_builder.Build();

        if (!app.Environment.IsDevelopment())
        {
            app.UseExceptionHandler("/Home/Error");
            // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
            app.UseHsts();
        }

        app.UseHttpsRedirection();
        app.UseStaticFiles();
        app.UseRouting();
        app.UseAuthorization();
        app.MapControllers();
        app.UseSwagger();
        app.UseSwaggerUI();
        app.UseDeveloperExceptionPage();

        var spaPath = "/app";
        if (app.Environment.IsDevelopment())
        {
            app.MapWhen(y => y.Request.Path.StartsWithSegments(spaPath), client =>
            {
                client.UseSpa(spa =>
                {
                    spa.UseProxyToSpaDevelopmentServer("https://localhost:6363");
                });
            });
        }
        else
        {
            app.Map(new PathString(spaPath), client =>
            {
                client.UseSpaStaticFiles();
                client.UseSpa(spa =>
                {
                    spa.Options.SourcePath = "client";
                    spa.Options.DefaultPageStaticFileOptions = new StaticFileOptions
                    {
                        OnPrepareResponse = ctx =>
                        {
                            ResponseHeaders headers = ctx.Context.Response.GetTypedHeaders();
                            headers.CacheControl = new CacheControlHeaderValue
                            {
                                NoCache = true,
                                NoStore = true,
                                MustRevalidate = true
                            };
                        }
                    };
                });
            });
        }

        app.Run();
    }
}




