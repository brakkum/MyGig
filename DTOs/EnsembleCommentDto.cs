using System;

namespace MyGigApi.DTOs
{
    public class EnsembleCommentDto
    {
        public DateTime Timestamp { get; set; }

        public string Text { get; set; }

        public MemberDto User { get; set; }

        // Ensemble Id
        public int Id { get; set; }
    }
}
