using Microsoft.AspNetCore.Mvc;
using Mp3WebMusic_Web.Models.Singer;
using Mp3WebMusic_Web.Ultilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace Mp3WebMusic_Web.Controllers
{
    public class SingerController : Controller
    {
        public ViewResult Singer()
        {

            return View("~/Views/Dashboard/Singer/Singer.cshtml");
        }
        public ViewResult SingerIsDelete()
        {

            return View("~/Views/Dashboard/Singer/SingerIsDelete.cshtml");
        }
        [Route("Singer/GetsSingerIsNotDelete")]
        public JsonResult GetsSingerIsNotDelete()
        {
            var singers = new List<Singer>();
            singers = ApiHelper<List<Singer>>.HttpGetAsync($"{Helper.ApiUrl}Api/Singer/GetsSingerIsNotDelete");
            var json = Json(new { singers });
            return json;
        }
        [Route("/Singer/GetsSingerIsDelete")]
        public JsonResult GetsSingerIsDelete()
        {
            var singers = new List<Singer>();
            singers = ApiHelper<List<Singer>>.HttpGetAsync($"{Helper.ApiUrl}Api/Singer/GetsSingerIsDelete");
            var json = Json(new { singers });
            return json;
        }
        [Route("/Singer/Add")]
        public JsonResult Add([FromBody] Singer model)
        {
            var result = new Singer();
            result = ApiHelper<Singer>.HttpPostAsync(
                                                    $"{Helper.ApiUrl}Api/Singer/Add",
                                                    model
                                                );
            return Json(new { result });
        }
        [Route("/Singer/Edit")]
        public JsonResult Edit([FromBody] Singer model)
        {
            var result = new Singer();
            result = ApiHelper<Singer>.HttpPostAsync(
                                                    $"{Helper.ApiUrl}Api/Singer/Edit",
                                                    model
                                                );
            return Json(new { result });
        }
        [Route("/Singer/GetsSingerByID/{id}")]
        public JsonResult Get(int id)
        {
            var result = new Singer();
            result = ApiHelper<Singer>.HttpGetAsync(
                                                    $"{Helper.ApiUrl}Api/Singer/GetsSingerByID/{id}"
                                                );
            return Json(new { result });
        }
        [Route("/Singer/Delete/")]
        public JsonResult Delete([FromBody] Singer model)
        {
            var result = new Singer();
            result = ApiHelper<Singer>.HttpPostAsync(
                                                    $"{Helper.ApiUrl}Api/Singer/Delete",
                                                    model
                                                );
            return Json(new { result });
        }
        [Route("/Singer/Restore/")]
        public JsonResult Restore([FromBody] Singer model)
        {
            var result = new Singer();
            result = ApiHelper<Singer>.HttpPostAsync(
                                                    $"{Helper.ApiUrl}Api/Singer/Restore",
                                                    model
                                                );
            return Json(new { result });
        }
    }
}
