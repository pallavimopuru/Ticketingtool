using KTS.Service.Interface;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using KTS.Models.Common;
using System.IO;
using ClosedXML.Excel;
using System.Linq;
using System.Data;
using Microsoft.AspNetCore.Hosting;
using MoreLinq;

namespace KTS.Service.Implementation
{
    public class ExportServices : IExportServices
    {
        IHostingEnvironment _hostingEnvironment;
        IAzureServices _azureServices;
        public ExportServices(IHostingEnvironment hostingEnvironment, IAzureServices azureServices)
        {
            _hostingEnvironment = hostingEnvironment;
            _azureServices = azureServices;
        }
        public async Task<FileData> ExportExcel<T>(IEnumerable<T> ticketDataByDateRange, TicketRange ticketRange)
        {
            try
            {
                //DataTable enumerableToDataTable = IEnumerableToDataTable.ToDataTable(ticketDataByDateRange);
                
                var departments = string.Join(", ", ((IEnumerable<TicketExport>)ticketDataByDateRange)
                                                    .Select(i => i.DepartmentName).Distinct());
                var timeRange = string.Join("-", ticketRange.StartDate.ToString(Constants.ExcelFileConfig.REPORT_DATE_FORMAT)
                                            , ticketRange.EndDate.ToString(Constants.ExcelFileConfig.REPORT_DATE_FORMAT));

                using (XLWorkbook wb = new XLWorkbook())
                {
                    var ws = wb.Worksheets.Add(Constants.ExcelFileConfig.WORKSHEET_NAME).Cell(8, 2).InsertTable(ticketDataByDateRange);
                    wb.Worksheets.ElementAt(0).Name = Constants.ExcelFileConfig.WORKSHEET_NAME;
                    wb.Worksheets.ElementAt(0).ShowGridLines = false;

                    if (wb.Worksheet(Constants.ExcelFileConfig.WORKSHEET_NAME).Tables.Count() > 0)
                    {
                        IXLWorksheet xLWorksheet = wb.Worksheets.First();
                        xLWorksheet.Cell("D2").Value = Constants.ExcelFileConfig.REPORT_TITLE;
                        xLWorksheet.Cell("D3").Value = Constants.ExcelFileConfig.DATE_TITLE;
                        xLWorksheet.Cell("D4").Value = Constants.ExcelFileConfig.DEPARTMENT_TITLE;
                        xLWorksheet.Cell("D5").Value = Constants.ExcelFileConfig.ADDITIONAL_TITLE;                        

                        xLWorksheet.Cell("E2").Value = Constants.ExcelFileConfig.REPORT_NAME;
                        xLWorksheet.Cell("E3").Value = timeRange;
                        xLWorksheet.Cell("E4").Value = departments;
                        xLWorksheet.Cell("E5").Value = "";

                        //sheet["D5"].WrapText = true; //ADDITIONAL SELECTIONS
                        //sheet["D5"].RowHeight = GetHeightWidthForCell(sheet["D5"].Text, "height");//ADDITIONAL SELECTIONS

                        xLWorksheet.Range("B2:C5").Merge();
                        xLWorksheet.Range("E2:G2").Merge();
                        xLWorksheet.Range("E3:G3").Row(1).Merge();
                        xLWorksheet.Range("E4:G4").Row(1).Merge();
                        xLWorksheet.Range("E5:G5").Row(1).Merge();

                        xLWorksheet.Range("B2:G5").Style.Border.SetInsideBorder(XLBorderStyleValues.Thin);
                        xLWorksheet.Range("B2:G5").Style.Border.SetOutsideBorder(XLBorderStyleValues.Thin);

                        foreach (IXLTable xLTable in wb.Worksheet(Constants.ExcelFileConfig.WORKSHEET_NAME).Tables)
                        {
                            xLTable.Theme = XLTableTheme.TableStyleLight9;
                            xLTable.SetAutoFilter(false);
                            xLTable.ShowAutoFilter = false;
                            xLTable.Style.Border.SetInsideBorder(XLBorderStyleValues.Thin);
                            xLTable.Style.Border.SetInsideBorderColor(XLColor.SkyBlue);
                        }
                        //IXLColumn col = ws.Column("A").WorksheetColumn();
                        //col.Width = 2;
                        wb.Worksheet(Constants.ExcelFileConfig.WORKSHEET_NAME).Columns().AdjustToContents();

                        wb.Properties.Company = Constants.ExcelFileConfig.COMPANY_NAME;
                        wb.Properties.Author = Constants.ExcelFileConfig.COMPANY_NAME;

                        try
                        {
                            //string templatePath = Path.Combine(_hostingEnvironment.WebRootPath, "Asset\\");
                            //System.Drawing.Bitmap bitmap = new System.Drawing.Bitmap(Path.Combine(templatePath, "KalpitaBrandLogo.png"));
                            var assetFile = await _azureServices.GetAssetFile(Constants.ExcelFileConfig.FILE_BRAND_LOGO);
                            System.Drawing.Bitmap bitmap = new System.Drawing.Bitmap(new MemoryStream(assetFile.FileStream));
                            IXLCell xLCell = xLWorksheet.Cell(2, 2);
                            xLWorksheet.AddPicture(bitmap).MoveTo(xLCell, 10, 5);

                            /*Set default width for 1st Column*/
                            xLWorksheet.Cell(1, 1).WorksheetColumn().Width = 1.5;
                            xLWorksheet.Cell(2, 4).WorksheetColumn().Width = 20;
                        }
                        catch (Exception ex)
                        {
                        }
                    }

                    using (MemoryStream stream = new MemoryStream())
                    {
                        wb.SaveAs(stream);
                        stream.Position = 0;
                        return new FileData
                        {
                            FileStream = stream.ToArray(),
                            FileContentType = Constants.ExcelFileConfig.FILE_CONTENT_TYPE,
                            FileName = string.Join("", Constants.ExcelFileConfig.FILE_PREFIX, DateTime.Now.ToString(Constants.ExcelFileConfig.FILE_TIMESTAMP), Constants.ExcelFileConfig.FILE_EXTENSION)
                        };
                    }
                }
            }
            catch (Exception ex)
            {
                return new FileData();
            }
        }
    }
}
