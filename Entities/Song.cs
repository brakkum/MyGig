using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyGigApi.Entities
{
    public class Song
    {
        [Key]
        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int SongId { get; set; }

        // TODO: Set position based on num songs in Setlist
        [Required]
        public int SetlistPosition { get; set; }

        [Required]
        [MinLength(1)]
        [MaxLength(50)]
        public string Name { get; set; }

        [MinLength(1)]
        [MaxLength(200)]
        public string YouTubeUrl { get; set; }

        [MinLength(1)]
        [MaxLength(200)]
        public string PdfUrl { get; set; }

        [MinLength(1)]
        [MaxLength(50)]
        public string Artist { get; set; }

        public ICollection<SongComment> SongComments { get; set; }

        [Required]
        public int SetlistId { get; set; }

        [ForeignKey("SetlistId")]
        public Setlist Setlist { get; set; }
    }
}
