using System;
using System.Data.Common;
using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Extensions.DiagnosticAdapter;

namespace MyGigApi.DbInterceptors
{
    public class QueryInterceptor
    {
        [DiagnosticName("Microsoft.EntityFrameworkCore.Database.Command.CommandExecuting")]
        public void OnCommandExecuting(DbCommand command, DbCommandMethod executeMethod, Guid commandId, Guid connectionId, bool async, DateTimeOffset startTime)
        {
            // Section to catch create table queries
            // Append ENGINE=INNODB so constraints work properly
            var dbString = new Regex(@"^CREATE TABLE");
            var cmdString = command.CommandText;
            Console.ForegroundColor = ConsoleColor.Blue;
            Console.WriteLine(cmdString);
            if (dbString.IsMatch(cmdString))
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine(cmdString);
                int place = cmdString.LastIndexOf(";", StringComparison.Ordinal);

                command.CommandText = cmdString.Remove(place, ";".Length).Insert(place, " ENGINE=INNODB;");
                Console.ForegroundColor = ConsoleColor.Green;
                Console.WriteLine(command.CommandText);
            }
        }
    }
}
