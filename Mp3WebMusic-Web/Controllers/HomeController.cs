using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Mp3WebMusic_Web.Models;
using Mp3WebMusic_Web.Models.Song;
using Mp3WebMusic_Web.Ultilities;

namespace Mp3WebMusic_Web.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        [Route("/Home/GetsSongTrending")]
        public JsonResult GetsSongTrending()
        {
            var songs = new List<Song>();
            songs = ApiHelper<List<Song>>.HttpGetAsync($"{Helper.ApiUrl}Api/Song/GetsSongTrending");
            return Json(new { songs });
        }
    }
}
