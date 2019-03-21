using System;

namespace MyGigApi.Entities
{
    public class Connection : Request
    {
        public Connection()
        {
            Text = $"{UserRequester.FullName} would like to connect with you";
        }

        public DateTime? ConfirmedAt { get; set; }
    }
}
