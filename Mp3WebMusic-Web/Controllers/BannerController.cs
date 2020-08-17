using Microsoft.AspNetCore.Mvc;
using Mp3WebMusic_Web.Models.Banner;
using Mp3WebMusic_Web.Models.Type;
using Mp3WebMusic_Web.Ultilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace Mp3WebMusic_Web.Controllers
{
    public class BannerController : Controller
    {

        public ViewResult Banner()
        {

            return View("~/Views/Dashboard/Banner/Banner.cshtml");
        }

        [Route("/Banner/BannerGets")]
        public JsonResult BannerGets()
        {
            var banner = new List<Banners>();
            banner = ApiHelper<List<Banners>>.HttpGetAsync($"{Helper.ApiUrl}Api/Banner/Gets");
            var json = Json(new { banner });
            return json;
        }

        [Route("/Banner/Add")]
        public JsonResult Add([FromBody] Banners model)
        {
            var banner = new Banners();
            banner = ApiHelper<Banners>.HttpPostAsync(
                                                    $"{Helper.ApiUrl}Api/Banner/AddBanner",
                                                    model
                                                );
            return Json(new { banner });
        }
        [Route("/Banner/Edit")]
        public JsonResult Edit([FromBody] Banners model)
        {
            var banner = new Banners();
            banner = ApiHelper<Banners>.HttpPostAsync(
                                                    $"{Helper.ApiUrl}Api/Banner/EditBanner",
                                                    model
                                                );
            return Json(new { banner });
        }
        [Route("/Banner/Get/{id}")]
        public JsonResult Get(int id)
        {
            var banner = new Banners();
            banner = ApiHelper<Banners>.HttpGetAsync(
                                                    $"{Helper.ApiUrl}Api/Banner/GetBannerByID/{id}"
                                                );
            return Json(new { banner });
        }
        [Route("/Banner/GetIsNotDelete")]
        public JsonResult GetIsNotDelete()
        {
            var banner = new List<Banners>();
            banner = ApiHelper<List<Banners>>.HttpGetAsync(
                                                    $"{Helper.ApiUrl}Api/Banner/GetsIsNotDelete"
                                                );
            return Json(new { banner });
        }
        [Route("/Banner/Delete/{id}")]
        public JsonResult Delete(int id)
        {
            var banner = new Banners();
            banner = ApiHelper<Banners>.HttpGetAsync(
                                                    $"{Helper.ApiUrl}Api/Banner/DeleteBanner/{id}","post"
                                                 
                                                );
            return Json(new { banner });
        }
        [Route("/Banner/Restore/{id}")]
        public JsonResult Restore(int id)
        {
            var banner = new Banners();
            banner = ApiHelper<Banners>.HttpGetAsync(
                                                    $"{Helper.ApiUrl}Api/Banner/RestoreBanner/{id}", "post"

                                                );
            return Json(new { banner });
        }
    }
}
