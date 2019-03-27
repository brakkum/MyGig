using System.Collections.Generic;
using System.Linq;

namespace MyGigApi.DTOs
{
    public class EnsembleDto
    {
        public string Name { get; set; }

        public int EnsembleId { get; set; }

        public ICollection<UserDto> Members { get; set; }
    }
}
