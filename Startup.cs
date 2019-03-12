﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MyGigApi.Context;

namespace MyGigApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(cors => 
                cors.AddPolicy("MyGigCors", builder =>
                    builder.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                )
            );

            var connection = Configuration.GetConnectionString("DefaultConnection");
            services.AddDbContext<MyGigContext>(options => options.UseMySQL(connection));
            
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
            
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "Frontend/build";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseCors("MyGigCors");
            
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }          

            app.UseHttpsRedirection();

            app.UseMvc();
            
            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "Frontend";
                
                if (env.IsDevelopment())
                {
//                    spa.UseReactDevelopmentServer("npm start");
                    spa.UseProxyToSpaDevelopmentServer("http://localhost:3000");
                }
            });
        }
    }
}