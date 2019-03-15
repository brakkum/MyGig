using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyGigApi.Entities
{
    public class SetlistComment
    {
        [Key]
        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int SetlistCommentId { get; set; }

        public int SetlistId { get; set; }

        [ForeignKey("SetlistId")]
        public Setlist Setlist { get; set; }

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