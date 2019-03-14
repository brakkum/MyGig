rm -rf Migrations/*
dotnet ef migrations -v add Init
dotnet ef -v database update
