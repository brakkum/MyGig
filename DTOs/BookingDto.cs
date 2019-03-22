
namespace MyGigApi.DTOs
{
    public class BookingDto : RequestDto
    {
        public BookingDto()
        {
            AcceptRoute = "/route";
            DenyRoute = "/route";
        }
    }
}