
namespace MyGigApi.DTOs
{
    public class ConnectionDto : RequestDto
    {
        public ConnectionDto()
        {
            AcceptRoute = "/api/users/confirmconnection";
            DenyRoute = "/api/users/denyconnection";
        }
    }
}
