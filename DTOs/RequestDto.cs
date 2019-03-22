namespace MyGigApi.DTOs
{
    public class RequestDto
    {
        public int RequestId { get; set; }

        public string Text { get; set; }

        public string AcceptRoute { get; set; }

        public string DenyRoute { get; set; }
    }
}