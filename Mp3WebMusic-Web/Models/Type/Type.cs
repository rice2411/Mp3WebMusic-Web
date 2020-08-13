using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mp3WebMusic_Web.Models.Type
{
    public class Type
    {
        public int TypeID { get; set; }
        public string TypeName { get; set; }
        public string Poster { get; set; }
        public bool IsDelete { get; set; }
        public string Message { get; set; }
    }
}
