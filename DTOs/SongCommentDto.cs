using System;
using MyGigApi.Entities;

namespace MyGigApi.DTOs
{
    public class SongCommentDto
    {
        public DateTime Timestamp { get; set; }

        public string Text { get; set; }

        public int SongId { get; set; }

        public Song Song { get; set; }

        public UserDto User { get; set; }
    }
}
