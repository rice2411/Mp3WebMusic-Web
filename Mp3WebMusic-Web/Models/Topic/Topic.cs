using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Mp3WebMusic_Web.Models
{
    public class Topic
    {
        public int TopicID { get; set; }
 
        public string TopicName { get; set; }
        public bool IsDelete { get; set; }
        public  string Message { get; set; }
 
        public string Poster { get; set; }
    }
}
