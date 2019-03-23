using System;
using System.Security.Cryptography.X509Certificates;

namespace MyGigApi.DTOs
{
    public class EnsembleCommentDto
    {
        public DateTime Timestamp { get; set; }

        public string Text { get; set; }

        public UserDto User { get; set; }

        public int EnsembleId { get; set; }
    }
}
