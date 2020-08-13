using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mp3WebMusic_Web.Models.Author
{
    public class Author
    {
        

        public int AuthorID { get; set; }
        public string AuthorName { get; set; }
        public string Avatar { get; set; }
        public string Introduce { get; set; }
        public float Views { get; set; }
        public bool IsDelete { get; set; }
        public string Message { get; set; }
    }
}
