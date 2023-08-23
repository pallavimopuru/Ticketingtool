using System;
using System.Collections.Generic;
using System.Text;
using KTS.Models.Common;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Primitives;

namespace KTS.Models.Common
{
    public class SearchQueryGrid
    {
        public string? UserName { get; set; }
        public string UserEmail { get; set; }
        public IList<SearchOptions> SearchOption { get; set; }
        public string GlobalSearchText { get; set; }
        public string SortColumn { get; set; }
        public string SortOrder { get; set; }
        public int DefaultPageSize { get; set; }
        public int PageRowCount { get; set; }
        public int TotalRowCount { get; set; }
        public int PageCount { get; set; }
        public int Offset { get; set; }

        //public SearchQueryGrid(SearchQueryGrid defaultSettings)
        //{
        //    int intCursor = 0;
        //    string stringCursor = string.Empty;
        //    try
        //    {
        //        if (defaultSettings.SearchOption != null)
        //        {
        //            SearchOption = defaultSettings.SearchOption;
        //        }
        //        else
        //        {
        //            SearchOption = null;
        //        }

        //        if (defaultSettings.DefaultPageSize != null)
        //        {
        //            DefaultPageSize = defaultSettings.DefaultPageSize;
        //        }
        //        else
        //        {
        //            DefaultPageSize = intCursor;
        //        }

        //        if (defaultSettings.Offset != null)
        //        {
        //            Offset = defaultSettings.Offset;
        //        }
        //        else
        //        {
        //            Offset = intCursor;
        //        }

        //        if (defaultSettings.PageRowCount != null)
        //        {
        //            PageRowCount = defaultSettings.PageRowCount;
        //        }
        //        else
        //        {
        //            PageRowCount = intCursor;
        //        }

        //        if (defaultSettings.TotalRowCount != null)
        //        {
        //            TotalRowCount = defaultSettings.TotalRowCount;
        //        }
        //        else
        //        {
        //            TotalRowCount = intCursor;
        //        }

        //        if (defaultSettings.PageCount != null)
        //        {
        //            PageCount = defaultSettings.PageCount;
        //        }
        //        else
        //        {
        //            PageCount = intCursor;
        //        }

        //        if (!string.IsNullOrEmpty(defaultSettings.SortColumn))
        //        {
        //            SortColumn = defaultSettings.SortColumn;
        //        }
        //        else
        //        {
        //            SortColumn = stringCursor;
        //        }

        //        if (!string.IsNullOrEmpty(defaultSettings.UserName))
        //        {
        //            UserName = defaultSettings.UserName;
        //        }
        //        else
        //        {
        //            UserName = stringCursor;
        //        }

        //        if (!string.IsNullOrEmpty(defaultSettings.UserEmail))
        //        {
        //            UserEmail = defaultSettings.UserEmail;
        //        }
        //        else
        //        {
        //            UserEmail = stringCursor;
        //        }

        //        if (!string.IsNullOrEmpty(defaultSettings.SortOrder))
        //        {
        //            SortOrder = defaultSettings.SortOrder;
        //        }
        //        else
        //        {
        //            SortOrder = stringCursor;
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        SearchOption = null;
        //        SortColumn = stringCursor;
        //        SortOrder = stringCursor;
        //        DefaultPageSize = Constants.GridConfig.DEFAULT_PAGE_SIZE;
        //        PageRowCount = intCursor;
        //        TotalRowCount = intCursor;
        //        PageCount = intCursor;
        //        Offset = intCursor;
        //    }
        //}
    }
}
