using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mp3WebMusic_Web.Models.Singer
{
    public class Singer
    {
        public int SingerID { get; set; }
        public string SingerNickName { get; set; }
        public string SingerName { get; set; }
        public string Introduce { get; set; }
        public int Views { get; set; }
        public string Avatar { get; set; }
        public string Message { get; set; }
        public bool isDelete { get; set; }
    }
}
