using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mp3WebMusic_Web.Models
{
    public class SongResult
    {
        public int SongID { get; set; }
        public int SingerID { get; set; }
        public string SongName { get; set; }
        public string Poster { get; set; }
        public string SingerNickName { get; set; }
    }
}
