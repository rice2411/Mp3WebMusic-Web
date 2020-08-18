using Microsoft.AspNetCore.Mvc;
using Mp3WebMusic_Web.Models.Type;
using Mp3WebMusic_Web.Ultilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace Mp3WebMusic_Web.Controllers
{
    public class TypeController : Controller
    {
        public ViewResult Search()
        {

            return View("~/Views/Home/TypeList.cshtml");
        }
        public ViewResult Detail(int id)
        {
            var type = new Types()
            {
                TypeID = id
            };
            return View("~/Views/Home/TypeDetail.cshtml", type);
        }
        public ViewResult Type()
        {

            return View("~/Views/Dashboard/Type/Type.cshtml");
        }
   
        [Route("/Type/GetsTypeIsNotDelete")]
        public JsonResult GetsTypeIsNotDelete()
        {
            var types = new List<Types>();
            types = ApiHelper<List<Types>>.HttpGetAsync($"{Helper.ApiUrl}Api/Type/GetsTypeIsNotDelete");
            var json = Json(new { types });
            return json;
        }
        [Route("/Type/GetsTypeIsDelete")]
        public JsonResult GetsTypeIsDelete()
        {
            var types = new List<Types>();
            types = ApiHelper<List<Types>>.HttpGetAsync($"{Helper.ApiUrl}Api/Type/GetsTypeIsDelete");
            var json = Json(new { types });
            return json;
        }
        [Route("/Type/Add")]
        public JsonResult Add([FromBody] Types model)
        {
            var result = new Types();
            result = ApiHelper<Types>.HttpPostAsync(
                                                    $"{Helper.ApiUrl}Api/Type/AddType",
                                                    model
                                                );
            return Json(new { result });
        }
        [Route("/Type/Edit")]
        public JsonResult Edit([FromBody] Types model)
        {
            var result = new Types();
            result = ApiHelper<Types>.HttpPostAsync(
                                                    $"{Helper.ApiUrl}Api/Type/EditType",
                                                    model
                                                );
            return Json(new { result });
        }
        [Route("/Type/Get/{id}")]
        public JsonResult Get(int id)
        {
            var result = new Types();
            result = ApiHelper<Types>.HttpGetAsync(
                                                    $"{Helper.ApiUrl}Api/Type/GetTypeById/{id}"
                                                );
            return Json(new { result });
        }
        [Route("/Type/Delete/{id}")]
        public JsonResult Delete(int id)
        {
            var result = new Types();
            result = ApiHelper<Types>.HttpGetAsync(
                                                    $"{Helper.ApiUrl}Api/Type/DeleteType/{id}",
                                                    "post"
                                                );
            return Json(new { result });
        }
        [Route("/Type/Restore/{id}")]
        public JsonResult Restore(int id)
        {
            var result = new Types();
            result = ApiHelper<Types>.HttpGetAsync(
                                                    $"{Helper.ApiUrl}Api/Type/RestoreType/{id}",
                                                        "post"
                                                );
            return Json(new { result });
        }
      /*  public IActionResult Search(string keyword)
        {
            ///Cái này là list sản phẩm
            var types = new List<Types>();
            types = ApiHelper<List<Types>>.HttpGetAsync($"{Helper.ApiUrl}Api/Type/GetsTypeIsNotDelete");
         
            /////// Tạo sẵn 1 list để lưu kết quả
            var searchReult = new List<Types>();
            foreach(var item in  types)
            {
                if(item.TypeName.Contains(keyword))
                {
                    searchReult.Add(item);
                }    
            }
            return View("~/Home/Index", searchReult);
        }*/
    }
}
