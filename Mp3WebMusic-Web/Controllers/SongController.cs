using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Mp3WebMusic_Web.Models;
using Mp3WebMusic_Web.Models.Song;
using Mp3WebMusic_Web.Ultilities;
using System;
using System.Collections.Generic;
using System.IO;

namespace Mp3WebMusic_Web.Controllers
{
    public class SongController: Controller
    {
        private IWebHostEnvironment webHostEnvironment;
        public SongController(IWebHostEnvironment webHostEnvironment)
        {
            this.webHostEnvironment = webHostEnvironment;
        }
        public ViewResult Detail(int id)
        {
            var song = new Song()
            {
                SongID = id
            };
            return View("~/Views/Dashboard/Song/Detail.cshtml", song);
        }
        public ViewResult Liten(int id)
        {
            var song = new Song()
            {
                SongID = id
            };
            return View("~/Views/Home/Listen.cshtml", song);
        }
        public ViewResult Song()
        {
           
            return View("~/Views/Dashboard/Song/Song.cshtml");
        }
        public ViewResult SongIsDelete()
        {

            return View("~/Views/Dashboard/Song/Songisdelete.cshtml");
        }
        public ViewResult TopicIsDelete()
        {

            return View("~/Views/Dashboard/Topic/TopicIsDelete.cshtml");
        }
        [Route("/Song/GetsSongByUpLoadday")]
        public JsonResult GetsSongByUpLoadday() 
        { 
            var result = new List<Song>();
            result = ApiHelper<List<Song>>.HttpGetAsync($"{Helper.ApiUrl}Api/Song/GetsSongByUpLoadday"); 
           
            return Json(new { result }); ;
        }
        [Route("/Song/GetsSongByUpLoaddayTop4")]
        public JsonResult GetsSongByUpLoaddayTop4()
        {
            var result = new List<Song>();
            result = ApiHelper<List<Song>>.HttpGetAsync($"{Helper.ApiUrl}Api/Song/GetsSongByUpLoaddayTop4");

            return Json(new { result }); ;
        }
        [Route("/Song/GetsSongIsDelete")]
        public JsonResult GetsSongIsDelete()
        {
            var result = new List<Song>();
            result = ApiHelper<List<Song>>.HttpGetAsync($"{Helper.ApiUrl}Api/Song/GetsSongIsDelete");

            return Json(new { result }); ;
        }
        [Route("/Song/GetSongById/{id}")]
        public JsonResult GetSongById(int id)
        {
            
            var result = new Song();
            result = ApiHelper<Song>.HttpGetAsync($"{Helper.ApiUrl}Api/Song/GetSongById/{id}");
            return Json(new { result });
      
        }
        [Route("/Song/GetsSongBySinger/{id}")]
        public JsonResult GetsSongBySinger(int id)
        {

            var result = new List<Song>();
            result = ApiHelper<List<Song>>.HttpGetAsync($"{Helper.ApiUrl}Api/Song/GetsSongBySinger/{id}");
            return Json(new { result });

        }
        [Route("/Song/GetsSongByAuthor/{id}")]
        public JsonResult GetsSongByAuthor(int id)
        {

            var result = new List<Song>();
            result = ApiHelper<List<Song>>.HttpGetAsync($"{Helper.ApiUrl}Api/Song/GetsSongByAuthor/{id}");
            return Json(new { result });

        }
   
        [Route("/Song/Edit")]
        public JsonResult EditSong([FromBody] Song model)
        {
           
            var result = new Messages();
            result = ApiHelper<Messages>.HttpPostAsync($"{Helper.ApiUrl}Api/Song/EditSong", model);
            return Json(new { result });

        }
        [Route("/Song/Delete/{id}")]
        public JsonResult DeleteSong(int id)
        {
            var result = new Messages();
            result = ApiHelper<Messages>.HttpGetAsync($"{Helper.ApiUrl}Api/Song/DeleteSong/{id}", "post");
            return Json(new { result });

        }
        [Route("/Song/Restore/{id}")]
        public JsonResult RestoreSong(int id)
        {
            var result = new Messages();
            result = ApiHelper<Messages>.HttpGetAsync($"{Helper.ApiUrl}Api/Song/RestoreSong/{id}", "post");
            return Json(new { result });

        }
        [Route("/Song/Add")]
        public JsonResult AddSong([FromBody] Song model)
        {
          
            var result = new Messages();
            result = ApiHelper<Messages>.HttpPostAsync($"{Helper.ApiUrl}Api/Song/AddSong", model);
            return Json(new { result });

        }
    }
}
