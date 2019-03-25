using System.Collections.Generic;

namespace MyGigApi.DTOs
{
    public class EnsembleDto
    {
        public string Name { get; set; }

        public int EnsembleId { get; set; }

        public ICollection<UserDto> Members { get; set; }
    }
}
