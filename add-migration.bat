@echo off 
dotnet ef migrations add %1 --project Backend/Blog.Data/Blog.Data.csproj --startup-project Backend/Blog.Api/Blog.Api.csproj
