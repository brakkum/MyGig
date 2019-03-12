using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyGigApi.Entities
{
    public class UserPhoto
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("UserPhotoId")]
        [Key]
        public int Id { get; set; }

        [Required]
        public string Url  { get; set; }

        [Required]
        public DateTime UploadedAt { get; set; }
    }
}
