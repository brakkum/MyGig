using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyGigApi.Entities
{
    public class UserPhoto
    {
        [Key]
        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserPhotoId { get; set; }

        [Required]
        public string Url  { get; set; }

        [Required]
        public DateTime UploadedAt { get; set; }
    }
}
