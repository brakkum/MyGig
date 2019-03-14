using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyGigApi.Entities
{
    public class SongComment
    {
        [Key]
        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int SongCommentId { get; set; }

        [Required]
        public int SongId { get; set; }

        [ForeignKey("SongId")]
        public Song Song { get; set; }

        public DateTime Timestamp { get; set; }
    }
}