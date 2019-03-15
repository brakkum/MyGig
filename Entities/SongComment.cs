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

        [Required]
        public int UserId { get; set; }

        [ForeignKey("UserId")]
        public User User { get; set; }

        [Required]
        [MinLength(1)]
        [MaxLength(500)]
        public string Text { get; set; }

        public DateTime Timestamp { get; set; }
    }
}