@echo off 
dotnet ef database update %1 --project Backend/Blog.Data/Blog.Data.csproj --startup-project Blog.Api/Blog.Api.csproj
