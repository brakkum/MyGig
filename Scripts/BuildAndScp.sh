dotnet publish -v n && scp -i ~/.ssh/id_rsa -r ./bin/Debug/netcoreapp2.1/linux-x64/publish/ dbrakke@199.192.19.116:mygig/
ssh dbrakke@199.192.19.116 "sudo /bin/sh /var/www/mygig.online/UpdatePublish.sh" && tput setaf 2 && echo "Update successful."
