using System;
using System.Collections.Generic;
using System.Text;

namespace Mp3WebMusic_Web.Models.Account

{
    public class RegisterResult
    {
        public string Email { get; set; }
        public string Password { get; set; }
    
        public string Message { get; set; }
        public bool Success { get; set; }
    }
}
