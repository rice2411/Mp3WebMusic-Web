using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Mp3WebMusic_Web.Models;
using Mp3WebMusic_Web.Ultilities;

namespace Mp3WebMusic_Web.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public JsonResult GetsSongTrending()
        {
            var songs = new List<SongResult>();
            songs = ApiHelper<List<SongResult>>.HttpGetAsync($"{Helper.ApiUrl}Api/Song/GetsSongTrending");
            return Json(new { songs });
        }
    }
}
