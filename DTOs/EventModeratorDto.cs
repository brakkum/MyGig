namespace MyGigApi.DTOs
{
    public class EventModeratorDto : RequestDto
    {
        public EventModeratorDto()
        {
            AcceptRoute = "/route";
            DenyRoute = "/route";
        }
    }
}