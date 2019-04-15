using System;

namespace MyGigApi.DTOs
{
    public class AccountDto
    {
        public int UserId { get; set; }

        public string FullName { get; set; }

        public string PhotoUrl { get; set; }

        public DateTime JoinedOn { get; set; }

        public int NumEnsembles { get; set; }
    }
}
