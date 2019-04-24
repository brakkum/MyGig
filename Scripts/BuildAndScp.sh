cd /Users/DanielBrakke/dev/MyGig
dotnet publish -v n && scp -i ~/.ssh/id_rsa -r /Users/DanielBrakke/dev/MyGig/bin/Debug/netcoreapp2.2/linux-x64/publish/ dbrakke@199.192.19.116:
ssh dbrakke@199.192.19.116 "sudo /bin/sh /var/www/mygig.online/UpdatePublish.sh" && tput setaf 2 && echo "Update successful."
