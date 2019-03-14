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
        public string Name { get; set; }

        public string YouTubeUrl { get; set; }

        public string PdfUrl { get; set; }

        public string Artist { get; set; }

        public ICollection<SongComment> SongComments { get; set; }

        [Required]
        public int SetlistId { get; set; }

        [ForeignKey("SetlistId")]
        public Setlist Setlist { get; set; }
    }
}