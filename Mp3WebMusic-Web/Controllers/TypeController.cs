using Microsoft.AspNetCore.Mvc;
using Mp3WebMusic_Web.Models.Type;
using Mp3WebMusic_Web.Ultilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Type = Mp3WebMusic_Web.Models.Type.Type;

namespace Mp3WebMusic_Web.Controllers
{
    public class TypeController : Controller
    {
        public ViewResult TyoeDetail(int id)
        {
            var type = new Type()
            {
                TypeID = id
            };
            return View("~/Views/Dashboard/Type/TypeDetail.cshtml", type);
        }
        public ViewResult Type()
        {

            return View("~/Views/Dashboard/Type/Type.cshtml");
        }
        public ViewResult TypeIsDelete()
        {

            return View("~/Views/Dashboard/Type/TypeIsDelete.cshtml");
        }
        [Route("/Type/GetsTypeIsNotDelete")]
        public JsonResult GetsTypeIsNotDelete()
        {
            var types = new List<Type>();
            types = ApiHelper<List<Type>>.HttpGetAsync($"{Helper.ApiUrl}Api/Type/GetsTypeIsNotDelete");
            var json = Json(new { types });
            return json;
        }
        [Route("/Type/GetsTypeIsDelete")]
        public JsonResult GetsTypeIsDelete()
        {
            var types = new List<Type>();
            types = ApiHelper<List<Type>>.HttpGetAsync($"{Helper.ApiUrl}Api/Type/GetsTypeIsDelete");
            var json = Json(new { types });
            return json;
        }
        [Route("/Type/Add")]
        public JsonResult Add([FromBody] Type model)
        {
            var result = new Type();
            result = ApiHelper<Type>.HttpPostAsync(
                                                    $"{Helper.ApiUrl}Api/Type/Add",
                                                    model
                                                );
            return Json(new { result });
        }
        [Route("/Type/Edit")]
        public JsonResult Edit([FromBody] Type model)
        {
            var result = new Type();
            result = ApiHelper<Type>.HttpPostAsync(
                                                    $"{Helper.ApiUrl}Api/Type/Edit",
                                                    model
                                                );
            return Json(new { result });
        }
        [Route("/Type/Get/{id}")]
        public JsonResult Get(int id)
        {
            var result = new Type();
            result = ApiHelper<Type>.HttpGetAsync(
                                                    $"{Helper.ApiUrl}Api/Type/Get/{id}"
                                                );
            return Json(new { result });
        }
        [Route("/Type/Delete/{id}")]
        public JsonResult Delete([FromBody] Type model)
        {
            var result = new Type();
            result = ApiHelper<Type>.HttpPostAsync(
                                                    $"{Helper.ApiUrl}Api/Type/Delete",
                                                    model
                                                );
            return Json(new { result });
        }
        [Route("/Type/Restore/{id}")]
        public JsonResult Restore([FromBody] Type model)
        {
            var result = new Type();
            result = ApiHelper<Type>.HttpPostAsync(
                                                    $"{Helper.ApiUrl}Api/Type/Restore",
                                                    model
                                                );
            return Json(new { result });
        }
    }
}
