using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mp3WebMusic_Web.Models.Song
{
    public class Song
    {
        public int SongID { get; set; }
        public string SongName { get; set; }
        public string Audio { get; set; }
        public string Poster { get; set; }
        public int TypeID { get; set; }
        public int TopicID { get; set; }
        public string SingerNickName { get; set; }
        public string AuthorName { get; set; }
        public float Views { get; set; }
        public bool isDelete { get; set; }
     
    }
}
