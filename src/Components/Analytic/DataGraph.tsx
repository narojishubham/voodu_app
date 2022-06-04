import React, { useState, useEffect } from "react";
import { Line } from "@ant-design/plots";

const DataGraph = () => {
    const dummyData = [
        {
            year: "1850",
            value: 0,
            category: "Active Views",
        },
        {
            year: "1850",
            value: 54,
            category: "Video Views",
        },
        {
            year: "1850",
            value: 0,
            category: "Total Watch Time",
        },
        {
            year: "1850",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1850",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1851",
            value: 0,
            category: "Active Views",
        },
        {
            year: "1851",
            value: 54,
            category: "Video Views",
        },
        {
            year: "1851",
            value: 0,
            category: "Total Watch Time",
        },
        {
            year: "1851",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1851",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1852",
            value: 0,
            category: "Active Views",
        },
        {
            year: "1852",
            value: 57,
            category: "Video Views",
        },
        {
            year: "1852",
            value: 0,
            category: "Total Watch Time",
        },
        {
            year: "1852",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1852",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1853",
            value: 0,
            category: "Active Views",
        },
        {
            year: "1853",
            value: 59,
            category: "Video Views",
        },
        {
            year: "1853",
            value: 0,
            category: "Total Watch Time",
        },
        {
            year: "1853",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1853",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1854",
            value: 0,
            category: "Active Views",
        },
        {
            year: "1854",
            value: 69,
            category: "Video Views",
        },
        {
            year: "1854",
            value: 0,
            category: "Total Watch Time",
        },
        {
            year: "1854",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1854",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1855",
            value: 0,
            category: "Active Views",
        },
        {
            year: "1855",
            value: 71,
            category: "Video Views",
        },
        {
            year: "1855",
            value: 0,
            category: "Total Watch Time",
        },
        {
            year: "1855",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1855",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1856",
            value: 0,
            category: "Active Views",
        },
        {
            year: "1856",
            value: 76,
            category: "Video Views",
        },
        {
            year: "1856",
            value: 0,
            category: "Total Watch Time",
        },
        {
            year: "1856",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1856",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1857",
            value: 0,
            category: "Active Views",
        },
        {
            year: "1857",
            value: 77,
            category: "Video Views",
        },
        {
            year: "1857",
            value: 0,
            category: "Total Watch Time",
        },
        {
            year: "1857",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1857",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1858",
            value: 0,
            category: "Active Views",
        },
        {
            year: "1858",
            value: 78,
            category: "Video Views",
        },
        {
            year: "1858",
            value: 0,
            category: "Total Watch Time",
        },
        {
            year: "1858",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1858",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1859",
            value: 0,
            category: "Active Views",
        },
        {
            year: "1859",
            value: 83,
            category: "Video Views",
        },
        {
            year: "1859",
            value: 0,
            category: "Total Watch Time",
        },
        {
            year: "1859",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1859",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1860",
            value: 0,
            category: "Active Views",
        },
        {
            year: "1860",
            value: 91,
            category: "Video Views",
        },
        {
            year: "1860",
            value: 0,
            category: "Total Watch Time",
        },
        {
            year: "1860",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1860",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1861",
            value: 0,
            category: "Active Views",
        },
        {
            year: "1861",
            value: 95,
            category: "Video Views",
        },
        {
            year: "1861",
            value: 0,
            category: "Total Watch Time",
        },
        {
            year: "1861",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1861",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1862",
            value: 0,
            category: "Active Views",
        },
        {
            year: "1862",
            value: 96,
            category: "Video Views",
        },
        {
            year: "1862",
            value: 0,
            category: "Total Watch Time",
        },
        {
            year: "1862",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1862",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1863",
            value: 0,
            category: "Active Views",
        },
        {
            year: "1863",
            value: 103,
            category: "Video Views",
        },
        {
            year: "1863",
            value: 0,
            category: "Total Watch Time",
        },
        {
            year: "1863",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1863",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1864",
            value: 0,
            category: "Active Views",
        },
        {
            year: "1864",
            value: 112,
            category: "Video Views",
        },
        {
            year: "1864",
            value: 0,
            category: "Total Watch Time",
        },
        {
            year: "1864",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1864",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1865",
            value: 0,
            category: "Active Views",
        },
        {
            year: "1865",
            value: 119,
            category: "Video Views",
        },
        {
            year: "1865",
            value: 0,
            category: "Total Watch Time",
        },
        {
            year: "1865",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1865",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1866",
            value: 0,
            category: "Active Views",
        },
        {
            year: "1866",
            value: 122,
            category: "Video Views",
        },
        {
            year: "1866",
            value: 0,
            category: "Total Watch Time",
        },
        {
            year: "1866",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1866",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1867",
            value: 0,
            category: "Active Views",
        },
        {
            year: "1867",
            value: 130,
            category: "Video Views",
        },
        {
            year: "1867",
            value: 0,
            category: "Total Watch Time",
        },
        {
            year: "1867",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1867",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1868",
            value: 0,
            category: "Active Views",
        },
        {
            year: "1868",
            value: 134,
            category: "Video Views",
        },
        {
            year: "1868",
            value: 0,
            category: "Total Watch Time",
        },
        {
            year: "1868",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1868",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1869",
            value: 0,
            category: "Active Views",
        },
        {
            year: "1869",
            value: 142,
            category: "Video Views",
        },
        {
            year: "1869",
            value: 0,
            category: "Total Watch Time",
        },
        {
            year: "1869",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1869",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1870",
            value: 1,
            category: "Active Views",
        },
        {
            year: "1870",
            value: 146,
            category: "Video Views",
        },
        {
            year: "1870",
            value: 0,
            category: "Total Watch Time",
        },
        {
            year: "1870",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1870",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1871",
            value: 1,
            category: "Active Views",
        },
        {
            year: "1871",
            value: 156,
            category: "Video Views",
        },
        {
            year: "1871",
            value: 0,
            category: "Total Watch Time",
        },
        {
            year: "1871",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1871",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1872",
            value: 1,
            category: "Active Views",
        },
        {
            year: "1872",
            value: 173,
            category: "Video Views",
        },
        {
            year: "1872",
            value: 0,
            category: "Total Watch Time",
        },
        {
            year: "1872",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1872",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1873",
            value: 1,
            category: "Active Views",
        },
        {
            year: "1873",
            value: 183,
            category: "Video Views",
        },
        {
            year: "1873",
            value: 0,
            category: "Total Watch Time",
        },
        {
            year: "1873",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1873",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1874",
            value: 1,
            category: "Active Views",
        },
        {
            year: "1874",
            value: 173,
            category: "Video Views",
        },
        {
            year: "1874",
            value: 0,
            category: "Total Watch Time",
        },
        {
            year: "1874",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1874",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1875",
            value: 1,
            category: "Active Views",
        },
        {
            year: "1875",
            value: 187,
            category: "Video Views",
        },
        {
            year: "1875",
            value: 0,
            category: "Total Watch Time",
        },
        {
            year: "1875",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1875",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1876",
            value: 1,
            category: "Active Views",
        },
        {
            year: "1876",
            value: 190,
            category: "Video Views",
        },
        {
            year: "1876",
            value: 0,
            category: "Total Watch Time",
        },
        {
            year: "1876",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1876",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1877",
            value: 2,
            category: "Active Views",
        },
        {
            year: "1877",
            value: 192,
            category: "Video Views",
        },
        {
            year: "1877",
            value: 0,
            category: "Total Watch Time",
        },
        {
            year: "1877",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1877",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1878",
            value: 2,
            category: "Active Views",
        },
        {
            year: "1878",
            value: 194,
            category: "Video Views",
        },
        {
            year: "1878",
            value: 0,
            category: "Total Watch Time",
        },
        {
            year: "1878",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1878",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1879",
            value: 3,
            category: "Active Views",
        },
        {
            year: "1879",
            value: 207,
            category: "Video Views",
        },
        {
            year: "1879",
            value: 0,
            category: "Total Watch Time",
        },
        {
            year: "1879",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1879",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1880",
            value: 3,
            category: "Active Views",
        },
        {
            year: "1880",
            value: 233,
            category: "Video Views",
        },
        {
            year: "1880",
            value: 0,
            category: "Total Watch Time",
        },
        {
            year: "1880",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1880",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1881",
            value: 4,
            category: "Active Views",
        },
        {
            year: "1881",
            value: 239,
            category: "Video Views",
        },
        {
            year: "1881",
            value: 0,
            category: "Total Watch Time",
        },
        {
            year: "1881",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1881",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1882",
            value: 4,
            category: "Active Views",
        },
        {
            year: "1882",
            value: 252,
            category: "Video Views",
        },
        {
            year: "1882",
            value: 0,
            category: "Total Watch Time",
        },
        {
            year: "1882",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1882",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1883",
            value: 3,
            category: "Active Views",
        },
        {
            year: "1883",
            value: 269,
            category: "Video Views",
        },
        {
            year: "1883",
            value: 0,
            category: "Total Watch Time",
        },
        {
            year: "1883",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1883",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1884",
            value: 4,
            category: "Active Views",
        },
        {
            year: "1884",
            value: 271,
            category: "Video Views",
        },
        {
            year: "1884",
            value: 0,
            category: "Total Watch Time",
        },
        {
            year: "1884",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1884",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1885",
            value: 4,
            category: "Active Views",
        },
        {
            year: "1885",
            value: 273,
            category: "Video Views",
        },
        {
            year: "1885",
            value: 1,
            category: "Total Watch Time",
        },
        {
            year: "1885",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1885",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1886",
            value: 5,
            category: "Active Views",
        },
        {
            year: "1886",
            value: 275,
            category: "Video Views",
        },
        {
            year: "1886",
            value: 2,
            category: "Total Watch Time",
        },
        {
            year: "1886",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1886",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1887",
            value: 5,
            category: "Active Views",
        },
        {
            year: "1887",
            value: 287,
            category: "Video Views",
        },
        {
            year: "1887",
            value: 3,
            category: "Total Watch Time",
        },
        {
            year: "1887",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1887",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1888",
            value: 5,
            category: "Active Views",
        },
        {
            year: "1888",
            value: 317,
            category: "Video Views",
        },
        {
            year: "1888",
            value: 5,
            category: "Total Watch Time",
        },
        {
            year: "1888",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1888",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1889",
            value: 6,
            category: "Active Views",
        },
        {
            year: "1889",
            value: 318,
            category: "Video Views",
        },
        {
            year: "1889",
            value: 3,
            category: "Total Watch Time",
        },
        {
            year: "1889",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1889",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1890",
            value: 8,
            category: "Active Views",
        },
        {
            year: "1890",
            value: 345,
            category: "Video Views",
        },
        {
            year: "1890",
            value: 3,
            category: "Total Watch Time",
        },
        {
            year: "1890",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1890",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1891",
            value: 9,
            category: "Active Views",
        },
        {
            year: "1891",
            value: 360,
            category: "Video Views",
        },
        {
            year: "1891",
            value: 2,
            category: "Total Watch Time",
        },
        {
            year: "1891",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1891",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1892",
            value: 9,
            category: "Active Views",
        },
        {
            year: "1892",
            value: 363,
            category: "Video Views",
        },
        {
            year: "1892",
            value: 2,
            category: "Total Watch Time",
        },
        {
            year: "1892",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1892",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1893",
            value: 10,
            category: "Active Views",
        },
        {
            year: "1893",
            value: 358,
            category: "Video Views",
        },
        {
            year: "1893",
            value: 2,
            category: "Total Watch Time",
        },
        {
            year: "1893",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1893",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1894",
            value: 9,
            category: "Active Views",
        },
        {
            year: "1894",
            value: 372,
            category: "Video Views",
        },
        {
            year: "1894",
            value: 2,
            category: "Total Watch Time",
        },
        {
            year: "1894",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1894",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1895",
            value: 11,
            category: "Active Views",
        },
        {
            year: "1895",
            value: 393,
            category: "Video Views",
        },
        {
            year: "1895",
            value: 2,
            category: "Total Watch Time",
        },
        {
            year: "1895",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1895",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1896",
            value: 12,
            category: "Active Views",
        },
        {
            year: "1896",
            value: 405,
            category: "Video Views",
        },
        {
            year: "1896",
            value: 2,
            category: "Total Watch Time",
        },
        {
            year: "1896",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1896",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1897",
            value: 13,
            category: "Active Views",
        },
        {
            year: "1897",
            value: 425,
            category: "Video Views",
        },
        {
            year: "1897",
            value: 2,
            category: "Total Watch Time",
        },
        {
            year: "1897",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1897",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1898",
            value: 13,
            category: "Active Views",
        },
        {
            year: "1898",
            value: 449,
            category: "Video Views",
        },
        {
            year: "1898",
            value: 2,
            category: "Total Watch Time",
        },
        {
            year: "1898",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1898",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1899",
            value: 14,
            category: "Active Views",
        },
        {
            year: "1899",
            value: 491,
            category: "Video Views",
        },
        {
            year: "1899",
            value: 3,
            category: "Total Watch Time",
        },
        {
            year: "1899",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1899",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1900",
            value: 16,
            category: "Active Views",
        },
        {
            year: "1900",
            value: 515,
            category: "Video Views",
        },
        {
            year: "1900",
            value: 3,
            category: "Total Watch Time",
        },
        {
            year: "1900",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1900",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1901",
            value: 18,
            category: "Active Views",
        },
        {
            year: "1901",
            value: 531,
            category: "Video Views",
        },
        {
            year: "1901",
            value: 4,
            category: "Total Watch Time",
        },
        {
            year: "1901",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1901",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1902",
            value: 19,
            category: "Active Views",
        },
        {
            year: "1902",
            value: 543,
            category: "Video Views",
        },
        {
            year: "1902",
            value: 4,
            category: "Total Watch Time",
        },
        {
            year: "1902",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1902",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1903",
            value: 20,
            category: "Active Views",
        },
        {
            year: "1903",
            value: 593,
            category: "Video Views",
        },
        {
            year: "1903",
            value: 4,
            category: "Total Watch Time",
        },
        {
            year: "1903",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1903",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1904",
            value: 23,
            category: "Active Views",
        },
        {
            year: "1904",
            value: 597,
            category: "Video Views",
        },
        {
            year: "1904",
            value: 4,
            category: "Total Watch Time",
        },
        {
            year: "1904",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1904",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1905",
            value: 23,
            category: "Active Views",
        },
        {
            year: "1905",
            value: 636,
            category: "Video Views",
        },
        {
            year: "1905",
            value: 5,
            category: "Total Watch Time",
        },
        {
            year: "1905",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1905",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1906",
            value: 23,
            category: "Active Views",
        },
        {
            year: "1906",
            value: 680,
            category: "Video Views",
        },
        {
            year: "1906",
            value: 5,
            category: "Total Watch Time",
        },
        {
            year: "1906",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1906",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1907",
            value: 28,
            category: "Active Views",
        },
        {
            year: "1907",
            value: 750,
            category: "Video Views",
        },
        {
            year: "1907",
            value: 5,
            category: "Total Watch Time",
        },
        {
            year: "1907",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1907",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1908",
            value: 30,
            category: "Active Views",
        },
        {
            year: "1908",
            value: 714,
            category: "Video Views",
        },
        {
            year: "1908",
            value: 5,
            category: "Total Watch Time",
        },
        {
            year: "1908",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1908",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1909",
            value: 32,
            category: "Active Views",
        },
        {
            year: "1909",
            value: 747,
            category: "Video Views",
        },
        {
            year: "1909",
            value: 6,
            category: "Total Watch Time",
        },
        {
            year: "1909",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1909",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1910",
            value: 34,
            category: "Active Views",
        },
        {
            year: "1910",
            value: 778,
            category: "Video Views",
        },
        {
            year: "1910",
            value: 7,
            category: "Total Watch Time",
        },
        {
            year: "1910",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1910",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1911",
            value: 36,
            category: "Active Views",
        },
        {
            year: "1911",
            value: 792,
            category: "Video Views",
        },
        {
            year: "1911",
            value: 7,
            category: "Total Watch Time",
        },
        {
            year: "1911",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1911",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1912",
            value: 37,
            category: "Active Views",
        },
        {
            year: "1912",
            value: 834,
            category: "Video Views",
        },
        {
            year: "1912",
            value: 8,
            category: "Total Watch Time",
        },
        {
            year: "1912",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1912",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1913",
            value: 41,
            category: "Active Views",
        },
        {
            year: "1913",
            value: 895,
            category: "Video Views",
        },
        {
            year: "1913",
            value: 8,
            category: "Total Watch Time",
        },
        {
            year: "1913",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1913",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1914",
            value: 42,
            category: "Active Views",
        },
        {
            year: "1914",
            value: 800,
            category: "Video Views",
        },
        {
            year: "1914",
            value: 8,
            category: "Total Watch Time",
        },
        {
            year: "1914",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1914",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1915",
            value: 45,
            category: "Active Views",
        },
        {
            year: "1915",
            value: 784,
            category: "Video Views",
        },
        {
            year: "1915",
            value: 9,
            category: "Total Watch Time",
        },
        {
            year: "1915",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1915",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1916",
            value: 48,
            category: "Active Views",
        },
        {
            year: "1916",
            value: 842,
            category: "Video Views",
        },
        {
            year: "1916",
            value: 10,
            category: "Total Watch Time",
        },
        {
            year: "1916",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1916",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1917",
            value: 54,
            category: "Active Views",
        },
        {
            year: "1917",
            value: 891,
            category: "Video Views",
        },
        {
            year: "1917",
            value: 11,
            category: "Total Watch Time",
        },
        {
            year: "1917",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1917",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1918",
            value: 53,
            category: "Active Views",
        },
        {
            year: "1918",
            value: 873,
            category: "Video Views",
        },
        {
            year: "1918",
            value: 10,
            category: "Total Watch Time",
        },
        {
            year: "1918",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1918",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1919",
            value: 61,
            category: "Active Views",
        },
        {
            year: "1919",
            value: 735,
            category: "Video Views",
        },
        {
            year: "1919",
            value: 10,
            category: "Total Watch Time",
        },
        {
            year: "1919",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1919",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1920",
            value: 78,
            category: "Active Views",
        },
        {
            year: "1920",
            value: 843,
            category: "Video Views",
        },
        {
            year: "1920",
            value: 11,
            category: "Total Watch Time",
        },
        {
            year: "1920",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1920",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1921",
            value: 84,
            category: "Active Views",
        },
        {
            year: "1921",
            value: 709,
            category: "Video Views",
        },
        {
            year: "1921",
            value: 10,
            category: "Total Watch Time",
        },
        {
            year: "1921",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1921",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1922",
            value: 94,
            category: "Active Views",
        },
        {
            year: "1922",
            value: 740,
            category: "Video Views",
        },
        {
            year: "1922",
            value: 11,
            category: "Total Watch Time",
        },
        {
            year: "1922",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1922",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1923",
            value: 111,
            category: "Active Views",
        },
        {
            year: "1923",
            value: 845,
            category: "Video Views",
        },
        {
            year: "1923",
            value: 14,
            category: "Total Watch Time",
        },
        {
            year: "1923",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1923",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1924",
            value: 110,
            category: "Active Views",
        },
        {
            year: "1924",
            value: 836,
            category: "Video Views",
        },
        {
            year: "1924",
            value: 16,
            category: "Total Watch Time",
        },
        {
            year: "1924",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1924",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1925",
            value: 116,
            category: "Active Views",
        },
        {
            year: "1925",
            value: 842,
            category: "Video Views",
        },
        {
            year: "1925",
            value: 17,
            category: "Total Watch Time",
        },
        {
            year: "1925",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1925",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1926",
            value: 119,
            category: "Active Views",
        },
        {
            year: "1926",
            value: 846,
            category: "Video Views",
        },
        {
            year: "1926",
            value: 19,
            category: "Total Watch Time",
        },
        {
            year: "1926",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1926",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1927",
            value: 136,
            category: "Active Views",
        },
        {
            year: "1927",
            value: 905,
            category: "Video Views",
        },
        {
            year: "1927",
            value: 21,
            category: "Total Watch Time",
        },
        {
            year: "1927",
            value: 0,
            category: "Average Watch Time",
        },
        {
            year: "1927",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1928",
            value: 143,
            category: "Active Views",
        },
        {
            year: "1928",
            value: 890,
            category: "Video Views",
        },
        {
            year: "1928",
            value: 23,
            category: "Total Watch Time",
        },
        {
            year: "1928",
            value: 10,
            category: "Average Watch Time",
        },
        {
            year: "1928",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1929",
            value: 160,
            category: "Active Views",
        },
        {
            year: "1929",
            value: 947,
            category: "Video Views",
        },
        {
            year: "1929",
            value: 28,
            category: "Total Watch Time",
        },
        {
            year: "1929",
            value: 10,
            category: "Average Watch Time",
        },
        {
            year: "1929",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1930",
            value: 152,
            category: "Active Views",
        },
        {
            year: "1930",
            value: 862,
            category: "Video Views",
        },
        {
            year: "1930",
            value: 28,
            category: "Total Watch Time",
        },
        {
            year: "1930",
            value: 10,
            category: "Average Watch Time",
        },
        {
            year: "1930",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1931",
            value: 147,
            category: "Active Views",
        },
        {
            year: "1931",
            value: 759,
            category: "Video Views",
        },
        {
            year: "1931",
            value: 25,
            category: "Total Watch Time",
        },
        {
            year: "1931",
            value: 8,
            category: "Average Watch Time",
        },
        {
            year: "1931",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1932",
            value: 141,
            category: "Active Views",
        },
        {
            year: "1932",
            value: 675,
            category: "Video Views",
        },
        {
            year: "1932",
            value: 24,
            category: "Total Watch Time",
        },
        {
            year: "1932",
            value: 7,
            category: "Average Watch Time",
        },
        {
            year: "1932",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1933",
            value: 154,
            category: "Active Views",
        },
        {
            year: "1933",
            value: 708,
            category: "Video Views",
        },
        {
            year: "1933",
            value: 25,
            category: "Total Watch Time",
        },
        {
            year: "1933",
            value: 7,
            category: "Average Watch Time",
        },
        {
            year: "1933",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1934",
            value: 162,
            category: "Active Views",
        },
        {
            year: "1934",
            value: 775,
            category: "Video Views",
        },
        {
            year: "1934",
            value: 28,
            category: "Total Watch Time",
        },
        {
            year: "1934",
            value: 8,
            category: "Average Watch Time",
        },
        {
            year: "1934",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1935",
            value: 176,
            category: "Active Views",
        },
        {
            year: "1935",
            value: 811,
            category: "Video Views",
        },
        {
            year: "1935",
            value: 30,
            category: "Total Watch Time",
        },
        {
            year: "1935",
            value: 9,
            category: "Average Watch Time",
        },
        {
            year: "1935",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1936",
            value: 192,
            category: "Active Views",
        },
        {
            year: "1936",
            value: 893,
            category: "Video Views",
        },
        {
            year: "1936",
            value: 34,
            category: "Total Watch Time",
        },
        {
            year: "1936",
            value: 11,
            category: "Average Watch Time",
        },
        {
            year: "1936",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1937",
            value: 219,
            category: "Active Views",
        },
        {
            year: "1937",
            value: 941,
            category: "Video Views",
        },
        {
            year: "1937",
            value: 38,
            category: "Total Watch Time",
        },
        {
            year: "1937",
            value: 11,
            category: "Average Watch Time",
        },
        {
            year: "1937",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1938",
            value: 214,
            category: "Active Views",
        },
        {
            year: "1938",
            value: 880,
            category: "Video Views",
        },
        {
            year: "1938",
            value: 37,
            category: "Total Watch Time",
        },
        {
            year: "1938",
            value: 12,
            category: "Average Watch Time",
        },
        {
            year: "1938",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1939",
            value: 222,
            category: "Active Views",
        },
        {
            year: "1939",
            value: 918,
            category: "Video Views",
        },
        {
            year: "1939",
            value: 38,
            category: "Total Watch Time",
        },
        {
            year: "1939",
            value: 13,
            category: "Average Watch Time",
        },
        {
            year: "1939",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1940",
            value: 229,
            category: "Active Views",
        },
        {
            year: "1940",
            value: 1017,
            category: "Video Views",
        },
        {
            year: "1940",
            value: 42,
            category: "Total Watch Time",
        },
        {
            year: "1940",
            value: 11,
            category: "Average Watch Time",
        },
        {
            year: "1940",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1941",
            value: 236,
            category: "Active Views",
        },
        {
            year: "1941",
            value: 1043,
            category: "Video Views",
        },
        {
            year: "1941",
            value: 42,
            category: "Total Watch Time",
        },
        {
            year: "1941",
            value: 12,
            category: "Average Watch Time",
        },
        {
            year: "1941",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1942",
            value: 222,
            category: "Active Views",
        },
        {
            year: "1942",
            value: 1063,
            category: "Video Views",
        },
        {
            year: "1942",
            value: 45,
            category: "Total Watch Time",
        },
        {
            year: "1942",
            value: 11,
            category: "Average Watch Time",
        },
        {
            year: "1942",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1943",
            value: 239,
            category: "Active Views",
        },
        {
            year: "1943",
            value: 1092,
            category: "Video Views",
        },
        {
            year: "1943",
            value: 50,
            category: "Total Watch Time",
        },
        {
            year: "1943",
            value: 10,
            category: "Average Watch Time",
        },
        {
            year: "1943",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1944",
            value: 275,
            category: "Active Views",
        },
        {
            year: "1944",
            value: 1047,
            category: "Video Views",
        },
        {
            year: "1944",
            value: 54,
            category: "Total Watch Time",
        },
        {
            year: "1944",
            value: 7,
            category: "Average Watch Time",
        },
        {
            year: "1944",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1945",
            value: 275,
            category: "Active Views",
        },
        {
            year: "1945",
            value: 820,
            category: "Video Views",
        },
        {
            year: "1945",
            value: 59,
            category: "Total Watch Time",
        },
        {
            year: "1945",
            value: 7,
            category: "Average Watch Time",
        },
        {
            year: "1945",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1946",
            value: 292,
            category: "Active Views",
        },
        {
            year: "1946",
            value: 875,
            category: "Video Views",
        },
        {
            year: "1946",
            value: 61,
            category: "Total Watch Time",
        },
        {
            year: "1946",
            value: 10,
            category: "Average Watch Time",
        },
        {
            year: "1946",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1947",
            value: 322,
            category: "Active Views",
        },
        {
            year: "1947",
            value: 992,
            category: "Video Views",
        },
        {
            year: "1947",
            value: 67,
            category: "Total Watch Time",
        },
        {
            year: "1947",
            value: 12,
            category: "Average Watch Time",
        },
        {
            year: "1947",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1948",
            value: 364,
            category: "Active Views",
        },
        {
            year: "1948",
            value: 1015,
            category: "Video Views",
        },
        {
            year: "1948",
            value: 76,
            category: "Total Watch Time",
        },
        {
            year: "1948",
            value: 14,
            category: "Average Watch Time",
        },
        {
            year: "1948",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1949",
            value: 362,
            category: "Active Views",
        },
        {
            year: "1949",
            value: 960,
            category: "Video Views",
        },
        {
            year: "1949",
            value: 81,
            category: "Total Watch Time",
        },
        {
            year: "1949",
            value: 16,
            category: "Average Watch Time",
        },
        {
            year: "1949",
            value: 0,
            category: "Conversions (CTA)",
        },
        {
            year: "1950",
            value: 423,
            category: "Active Views",
        },
        {
            year: "1950",
            value: 1070,
            category: "Video Views",
        },
        {
            year: "1950",
            value: 97,
            category: "Total Watch Time",
        },
        {
            year: "1950",
            value: 18,
            category: "Average Watch Time",
        },
        {
            year: "1950",
            value: 23,
            category: "Conversions (CTA)",
        },
        {
            year: "1951",
            value: 479,
            category: "Active Views",
        },
        {
            year: "1951",
            value: 1129,
            category: "Video Views",
        },
        {
            year: "1951",
            value: 115,
            category: "Total Watch Time",
        },
        {
            year: "1951",
            value: 20,
            category: "Average Watch Time",
        },
        {
            year: "1951",
            value: 24,
            category: "Conversions (CTA)",
        },
        {
            year: "1952",
            value: 504,
            category: "Active Views",
        },
        {
            year: "1952",
            value: 1119,
            category: "Video Views",
        },
        {
            year: "1952",
            value: 124,
            category: "Total Watch Time",
        },
        {
            year: "1952",
            value: 22,
            category: "Average Watch Time",
        },
        {
            year: "1952",
            value: 26,
            category: "Conversions (CTA)",
        },
        {
            year: "1953",
            value: 533,
            category: "Active Views",
        },
        {
            year: "1953",
            value: 1125,
            category: "Video Views",
        },
        {
            year: "1953",
            value: 131,
            category: "Total Watch Time",
        },
        {
            year: "1953",
            value: 24,
            category: "Average Watch Time",
        },
        {
            year: "1953",
            value: 27,
            category: "Conversions (CTA)",
        },
        {
            year: "1954",
            value: 557,
            category: "Active Views",
        },
        {
            year: "1954",
            value: 1116,
            category: "Video Views",
        },
        {
            year: "1954",
            value: 138,
            category: "Total Watch Time",
        },
        {
            year: "1954",
            value: 27,
            category: "Average Watch Time",
        },
        {
            year: "1954",
            value: 27,
            category: "Conversions (CTA)",
        },
        {
            year: "1955",
            value: 625,
            category: "Active Views",
        },
        {
            year: "1955",
            value: 1208,
            category: "Video Views",
        },
        {
            year: "1955",
            value: 150,
            category: "Total Watch Time",
        },
        {
            year: "1955",
            value: 30,
            category: "Average Watch Time",
        },
        {
            year: "1955",
            value: 31,
            category: "Conversions (CTA)",
        },
        {
            year: "1956",
            value: 679,
            category: "Active Views",
        },
        {
            year: "1956",
            value: 1273,
            category: "Video Views",
        },
        {
            year: "1956",
            value: 161,
            category: "Total Watch Time",
        },
        {
            year: "1956",
            value: 32,
            category: "Average Watch Time",
        },
        {
            year: "1956",
            value: 32,
            category: "Conversions (CTA)",
        },
        {
            year: "1957",
            value: 714,
            category: "Active Views",
        },
        {
            year: "1957",
            value: 1309,
            category: "Video Views",
        },
        {
            year: "1957",
            value: 178,
            category: "Total Watch Time",
        },
        {
            year: "1957",
            value: 34,
            category: "Average Watch Time",
        },
        {
            year: "1957",
            value: 35,
            category: "Conversions (CTA)",
        },
        {
            year: "1958",
            value: 731,
            category: "Active Views",
        },
        {
            year: "1958",
            value: 1336,
            category: "Video Views",
        },
        {
            year: "1958",
            value: 192,
            category: "Total Watch Time",
        },
        {
            year: "1958",
            value: 36,
            category: "Average Watch Time",
        },
        {
            year: "1958",
            value: 35,
            category: "Conversions (CTA)",
        },
        {
            year: "1959",
            value: 789,
            category: "Active Views",
        },
        {
            year: "1959",
            value: 1382,
            category: "Video Views",
        },
        {
            year: "1959",
            value: 206,
            category: "Total Watch Time",
        },
        {
            year: "1959",
            value: 40,
            category: "Average Watch Time",
        },
        {
            year: "1959",
            value: 36,
            category: "Conversions (CTA)",
        },
        {
            year: "1960",
            value: 849,
            category: "Active Views",
        },
        {
            year: "1960",
            value: 1410,
            category: "Video Views",
        },
        {
            year: "1960",
            value: 227,
            category: "Total Watch Time",
        },
        {
            year: "1960",
            value: 43,
            category: "Average Watch Time",
        },
        {
            year: "1960",
            value: 39,
            category: "Conversions (CTA)",
        },
        {
            year: "1961",
            value: 904,
            category: "Active Views",
        },
        {
            year: "1961",
            value: 1349,
            category: "Video Views",
        },
        {
            year: "1961",
            value: 240,
            category: "Total Watch Time",
        },
        {
            year: "1961",
            value: 45,
            category: "Average Watch Time",
        },
        {
            year: "1961",
            value: 42,
            category: "Conversions (CTA)",
        },
        {
            year: "1962",
            value: 980,
            category: "Active Views",
        },
        {
            year: "1962",
            value: 1351,
            category: "Video Views",
        },
        {
            year: "1962",
            value: 263,
            category: "Total Watch Time",
        },
        {
            year: "1962",
            value: 49,
            category: "Average Watch Time",
        },
        {
            year: "1962",
            value: 44,
            category: "Conversions (CTA)",
        },
        {
            year: "1963",
            value: 1052,
            category: "Active Views",
        },
        {
            year: "1963",
            value: 1396,
            category: "Video Views",
        },
        {
            year: "1963",
            value: 286,
            category: "Total Watch Time",
        },
        {
            year: "1963",
            value: 51,
            category: "Average Watch Time",
        },
        {
            year: "1963",
            value: 47,
            category: "Conversions (CTA)",
        },
        {
            year: "1964",
            value: 1137,
            category: "Active Views",
        },
        {
            year: "1964",
            value: 1435,
            category: "Video Views",
        },
        {
            year: "1964",
            value: 316,
            category: "Total Watch Time",
        },
        {
            year: "1964",
            value: 57,
            category: "Average Watch Time",
        },
        {
            year: "1964",
            value: 51,
            category: "Conversions (CTA)",
        },
        {
            year: "1965",
            value: 1219,
            category: "Active Views",
        },
        {
            year: "1965",
            value: 1460,
            category: "Video Views",
        },
        {
            year: "1965",
            value: 337,
            category: "Total Watch Time",
        },
        {
            year: "1965",
            value: 59,
            category: "Average Watch Time",
        },
        {
            year: "1965",
            value: 55,
            category: "Conversions (CTA)",
        },
        {
            year: "1966",
            value: 1323,
            category: "Active Views",
        },
        {
            year: "1966",
            value: 1478,
            category: "Video Views",
        },
        {
            year: "1966",
            value: 364,
            category: "Total Watch Time",
        },
        {
            year: "1966",
            value: 63,
            category: "Average Watch Time",
        },
        {
            year: "1966",
            value: 60,
            category: "Conversions (CTA)",
        },
        {
            year: "1967",
            value: 1423,
            category: "Active Views",
        },
        {
            year: "1967",
            value: 1448,
            category: "Video Views",
        },
        {
            year: "1967",
            value: 392,
            category: "Total Watch Time",
        },
        {
            year: "1967",
            value: 65,
            category: "Average Watch Time",
        },
        {
            year: "1967",
            value: 66,
            category: "Conversions (CTA)",
        },
        {
            year: "1968",
            value: 1551,
            category: "Active Views",
        },
        {
            year: "1968",
            value: 1448,
            category: "Video Views",
        },
        {
            year: "1968",
            value: 424,
            category: "Total Watch Time",
        },
        {
            year: "1968",
            value: 70,
            category: "Average Watch Time",
        },
        {
            year: "1968",
            value: 73,
            category: "Conversions (CTA)",
        },
        {
            year: "1969",
            value: 1673,
            category: "Active Views",
        },
        {
            year: "1969",
            value: 1486,
            category: "Video Views",
        },
        {
            year: "1969",
            value: 467,
            category: "Total Watch Time",
        },
        {
            year: "1969",
            value: 74,
            category: "Average Watch Time",
        },
        {
            year: "1969",
            value: 80,
            category: "Conversions (CTA)",
        },
        {
            year: "1970",
            value: 1839,
            category: "Active Views",
        },
        {
            year: "1970",
            value: 1556,
            category: "Video Views",
        },
        {
            year: "1970",
            value: 493,
            category: "Total Watch Time",
        },
        {
            year: "1970",
            value: 78,
            category: "Average Watch Time",
        },
        {
            year: "1970",
            value: 87,
            category: "Conversions (CTA)",
        },
        {
            year: "1971",
            value: 1947,
            category: "Active Views",
        },
        {
            year: "1971",
            value: 1559,
            category: "Video Views",
        },
        {
            year: "1971",
            value: 530,
            category: "Total Watch Time",
        },
        {
            year: "1971",
            value: 84,
            category: "Average Watch Time",
        },
        {
            year: "1971",
            value: 88,
            category: "Conversions (CTA)",
        },
        {
            year: "1972",
            value: 2057,
            category: "Active Views",
        },
        {
            year: "1972",
            value: 1576,
            category: "Video Views",
        },
        {
            year: "1972",
            value: 560,
            category: "Total Watch Time",
        },
        {
            year: "1972",
            value: 89,
            category: "Average Watch Time",
        },
        {
            year: "1972",
            value: 95,
            category: "Conversions (CTA)",
        },
        {
            year: "1973",
            value: 2241,
            category: "Active Views",
        },
        {
            year: "1973",
            value: 1581,
            category: "Video Views",
        },
        {
            year: "1973",
            value: 588,
            category: "Total Watch Time",
        },
        {
            year: "1973",
            value: 95,
            category: "Average Watch Time",
        },
        {
            year: "1973",
            value: 110,
            category: "Conversions (CTA)",
        },
        {
            year: "1974",
            value: 2245,
            category: "Active Views",
        },
        {
            year: "1974",
            value: 1579,
            category: "Video Views",
        },
        {
            year: "1974",
            value: 597,
            category: "Total Watch Time",
        },
        {
            year: "1974",
            value: 96,
            category: "Average Watch Time",
        },
        {
            year: "1974",
            value: 107,
            category: "Conversions (CTA)",
        },
        {
            year: "1975",
            value: 2132,
            category: "Active Views",
        },
        {
            year: "1975",
            value: 1673,
            category: "Video Views",
        },
        {
            year: "1975",
            value: 604,
            category: "Total Watch Time",
        },
        {
            year: "1975",
            value: 95,
            category: "Average Watch Time",
        },
        {
            year: "1975",
            value: 92,
            category: "Conversions (CTA)",
        },
        {
            year: "1976",
            value: 2314,
            category: "Active Views",
        },
        {
            year: "1976",
            value: 1710,
            category: "Video Views",
        },
        {
            year: "1976",
            value: 630,
            category: "Total Watch Time",
        },
        {
            year: "1976",
            value: 103,
            category: "Average Watch Time",
        },
        {
            year: "1976",
            value: 108,
            category: "Conversions (CTA)",
        },
        {
            year: "1977",
            value: 2398,
            category: "Active Views",
        },
        {
            year: "1977",
            value: 1756,
            category: "Video Views",
        },
        {
            year: "1977",
            value: 650,
            category: "Total Watch Time",
        },
        {
            year: "1977",
            value: 108,
            category: "Average Watch Time",
        },
        {
            year: "1977",
            value: 104,
            category: "Conversions (CTA)",
        },
        {
            year: "1978",
            value: 2392,
            category: "Active Views",
        },
        {
            year: "1978",
            value: 1780,
            category: "Video Views",
        },
        {
            year: "1978",
            value: 680,
            category: "Total Watch Time",
        },
        {
            year: "1978",
            value: 116,
            category: "Average Watch Time",
        },
        {
            year: "1978",
            value: 106,
            category: "Conversions (CTA)",
        },
        {
            year: "1979",
            value: 2544,
            category: "Active Views",
        },
        {
            year: "1979",
            value: 1875,
            category: "Video Views",
        },
        {
            year: "1979",
            value: 721,
            category: "Total Watch Time",
        },
        {
            year: "1979",
            value: 119,
            category: "Average Watch Time",
        },
        {
            year: "1979",
            value: 98,
            category: "Conversions (CTA)",
        },
        {
            year: "1980",
            value: 2422,
            category: "Active Views",
        },
        {
            year: "1980",
            value: 1935,
            category: "Video Views",
        },
        {
            year: "1980",
            value: 737,
            category: "Total Watch Time",
        },
        {
            year: "1980",
            value: 120,
            category: "Average Watch Time",
        },
        {
            year: "1980",
            value: 86,
            category: "Conversions (CTA)",
        },
        {
            year: "1981",
            value: 2289,
            category: "Active Views",
        },
        {
            year: "1981",
            value: 1908,
            category: "Video Views",
        },
        {
            year: "1981",
            value: 755,
            category: "Total Watch Time",
        },
        {
            year: "1981",
            value: 121,
            category: "Average Watch Time",
        },
        {
            year: "1981",
            value: 65,
            category: "Conversions (CTA)",
        },
        {
            year: "1982",
            value: 2196,
            category: "Active Views",
        },
        {
            year: "1982",
            value: 1976,
            category: "Video Views",
        },
        {
            year: "1982",
            value: 738,
            category: "Total Watch Time",
        },
        {
            year: "1982",
            value: 121,
            category: "Average Watch Time",
        },
        {
            year: "1982",
            value: 64,
            category: "Conversions (CTA)",
        },
        {
            year: "1983",
            value: 2176,
            category: "Active Views",
        },
        {
            year: "1983",
            value: 1977,
            category: "Video Views",
        },
        {
            year: "1983",
            value: 739,
            category: "Total Watch Time",
        },
        {
            year: "1983",
            value: 125,
            category: "Average Watch Time",
        },
        {
            year: "1983",
            value: 58,
            category: "Conversions (CTA)",
        },
        {
            year: "1984",
            value: 2199,
            category: "Active Views",
        },
        {
            year: "1984",
            value: 2074,
            category: "Video Views",
        },
        {
            year: "1984",
            value: 807,
            category: "Total Watch Time",
        },
        {
            year: "1984",
            value: 128,
            category: "Average Watch Time",
        },
        {
            year: "1984",
            value: 51,
            category: "Conversions (CTA)",
        },
        {
            year: "1985",
            value: 2186,
            category: "Active Views",
        },
        {
            year: "1985",
            value: 2216,
            category: "Video Views",
        },
        {
            year: "1985",
            value: 835,
            category: "Total Watch Time",
        },
        {
            year: "1985",
            value: 131,
            category: "Average Watch Time",
        },
        {
            year: "1985",
            value: 49,
            category: "Conversions (CTA)",
        },
        {
            year: "1986",
            value: 2293,
            category: "Active Views",
        },
        {
            year: "1986",
            value: 2277,
            category: "Video Views",
        },
        {
            year: "1986",
            value: 830,
            category: "Total Watch Time",
        },
        {
            year: "1986",
            value: 137,
            category: "Average Watch Time",
        },
        {
            year: "1986",
            value: 46,
            category: "Conversions (CTA)",
        },
        {
            year: "1987",
            value: 2306,
            category: "Active Views",
        },
        {
            year: "1987",
            value: 2339,
            category: "Video Views",
        },
        {
            year: "1987",
            value: 892,
            category: "Total Watch Time",
        },
        {
            year: "1987",
            value: 143,
            category: "Average Watch Time",
        },
        {
            year: "1987",
            value: 44,
            category: "Conversions (CTA)",
        },
        {
            year: "1988",
            value: 2412,
            category: "Active Views",
        },
        {
            year: "1988",
            value: 2387,
            category: "Video Views",
        },
        {
            year: "1988",
            value: 935,
            category: "Total Watch Time",
        },
        {
            year: "1988",
            value: 152,
            category: "Average Watch Time",
        },
        {
            year: "1988",
            value: 50,
            category: "Conversions (CTA)",
        },
        {
            year: "1989",
            value: 2459,
            category: "Active Views",
        },
        {
            year: "1989",
            value: 2428,
            category: "Video Views",
        },
        {
            year: "1989",
            value: 982,
            category: "Total Watch Time",
        },
        {
            year: "1989",
            value: 156,
            category: "Average Watch Time",
        },
        {
            year: "1989",
            value: 41,
            category: "Conversions (CTA)",
        },
        {
            year: "1990",
            value: 2492,
            category: "Active Views",
        },
        {
            year: "1990",
            value: 2359,
            category: "Video Views",
        },
        {
            year: "1990",
            value: 1026,
            category: "Total Watch Time",
        },
        {
            year: "1990",
            value: 157,
            category: "Average Watch Time",
        },
        {
            year: "1990",
            value: 40,
            category: "Conversions (CTA)",
        },
        {
            year: "1991",
            value: 2601,
            category: "Active Views",
        },
        {
            year: "1991",
            value: 2284,
            category: "Video Views",
        },
        {
            year: "1991",
            value: 1051,
            category: "Total Watch Time",
        },
        {
            year: "1991",
            value: 161,
            category: "Average Watch Time",
        },
        {
            year: "1991",
            value: 45,
            category: "Conversions (CTA)",
        },
        {
            year: "1992",
            value: 2499,
            category: "Active Views",
        },
        {
            year: "1992",
            value: 2290,
            category: "Video Views",
        },
        {
            year: "1992",
            value: 1085,
            category: "Total Watch Time",
        },
        {
            year: "1992",
            value: 167,
            category: "Average Watch Time",
        },
        {
            year: "1992",
            value: 36,
            category: "Conversions (CTA)",
        },
        {
            year: "1993",
            value: 2515,
            category: "Active Views",
        },
        {
            year: "1993",
            value: 2225,
            category: "Video Views",
        },
        {
            year: "1993",
            value: 1117,
            category: "Total Watch Time",
        },
        {
            year: "1993",
            value: 176,
            category: "Average Watch Time",
        },
        {
            year: "1993",
            value: 37,
            category: "Conversions (CTA)",
        },
        {
            year: "1994",
            value: 2539,
            category: "Active Views",
        },
        {
            year: "1994",
            value: 2278,
            category: "Video Views",
        },
        {
            year: "1994",
            value: 1133,
            category: "Total Watch Time",
        },
        {
            year: "1994",
            value: 186,
            category: "Average Watch Time",
        },
        {
            year: "1994",
            value: 39,
            category: "Conversions (CTA)",
        },
        {
            year: "1995",
            value: 2560,
            category: "Active Views",
        },
        {
            year: "1995",
            value: 2359,
            category: "Video Views",
        },
        {
            year: "1995",
            value: 1151,
            category: "Total Watch Time",
        },
        {
            year: "1995",
            value: 197,
            category: "Average Watch Time",
        },
        {
            year: "1995",
            value: 39,
            category: "Conversions (CTA)",
        },
        {
            year: "1996",
            value: 2626,
            category: "Active Views",
        },
        {
            year: "1996",
            value: 2382,
            category: "Video Views",
        },
        {
            year: "1996",
            value: 1198,
            category: "Total Watch Time",
        },
        {
            year: "1996",
            value: 203,
            category: "Average Watch Time",
        },
        {
            year: "1996",
            value: 40,
            category: "Conversions (CTA)",
        },
        {
            year: "1997",
            value: 2701,
            category: "Active Views",
        },
        {
            year: "1997",
            value: 2409,
            category: "Video Views",
        },
        {
            year: "1997",
            value: 1197,
            category: "Total Watch Time",
        },
        {
            year: "1997",
            value: 209,
            category: "Average Watch Time",
        },
        {
            year: "1997",
            value: 40,
            category: "Conversions (CTA)",
        },
        {
            year: "1998",
            value: 2763,
            category: "Active Views",
        },
        {
            year: "1998",
            value: 2343,
            category: "Video Views",
        },
        {
            year: "1998",
            value: 1224,
            category: "Total Watch Time",
        },
        {
            year: "1998",
            value: 209,
            category: "Average Watch Time",
        },
        {
            year: "1998",
            value: 36,
            category: "Conversions (CTA)",
        },
        {
            year: "1999",
            value: 2741,
            category: "Active Views",
        },
        {
            year: "1999",
            value: 2310,
            category: "Video Views",
        },
        {
            year: "1999",
            value: 1258,
            category: "Total Watch Time",
        },
        {
            year: "1999",
            value: 217,
            category: "Average Watch Time",
        },
        {
            year: "1999",
            value: 35,
            category: "Conversions (CTA)",
        },
        {
            year: "2000",
            value: 2845,
            category: "Active Views",
        },
        {
            year: "2000",
            value: 2327,
            category: "Video Views",
        },
        {
            year: "2000",
            value: 1289,
            category: "Total Watch Time",
        },
        {
            year: "2000",
            value: 226,
            category: "Average Watch Time",
        },
        {
            year: "2000",
            value: 46,
            category: "Conversions (CTA)",
        },
        {
            year: "2001",
            value: 2848,
            category: "Active Views",
        },
        {
            year: "2001",
            value: 2445,
            category: "Video Views",
        },
        {
            year: "2001",
            value: 1316,
            category: "Total Watch Time",
        },
        {
            year: "2001",
            value: 237,
            category: "Average Watch Time",
        },
        {
            year: "2001",
            value: 47,
            category: "Conversions (CTA)",
        },
        {
            year: "2002",
            value: 2832,
            category: "Active Views",
        },
        {
            year: "2002",
            value: 2518,
            category: "Video Views",
        },
        {
            year: "2002",
            value: 1342,
            category: "Total Watch Time",
        },
        {
            year: "2002",
            value: 252,
            category: "Average Watch Time",
        },
        {
            year: "2002",
            value: 49,
            category: "Conversions (CTA)",
        },
        {
            year: "2003",
            value: 2958,
            category: "Active Views",
        },
        {
            year: "2003",
            value: 2695,
            category: "Video Views",
        },
        {
            year: "2003",
            value: 1397,
            category: "Total Watch Time",
        },
        {
            year: "2003",
            value: 276,
            category: "Average Watch Time",
        },
        {
            year: "2003",
            value: 48,
            category: "Conversions (CTA)",
        },
        {
            year: "2004",
            value: 3043,
            category: "Active Views",
        },
        {
            year: "2004",
            value: 2906,
            category: "Video Views",
        },
        {
            year: "2004",
            value: 1443,
            category: "Total Watch Time",
        },
        {
            year: "2004",
            value: 298,
            category: "Average Watch Time",
        },
        {
            year: "2004",
            value: 54,
            category: "Conversions (CTA)",
        },
        {
            year: "2005",
            value: 3068,
            category: "Active Views",
        },
        {
            year: "2005",
            value: 3108,
            category: "Video Views",
        },
        {
            year: "2005",
            value: 1485,
            category: "Total Watch Time",
        },
        {
            year: "2005",
            value: 320,
            category: "Average Watch Time",
        },
        {
            year: "2005",
            value: 60,
            category: "Conversions (CTA)",
        },
        {
            year: "2006",
            value: 3091,
            category: "Active Views",
        },
        {
            year: "2006",
            value: 3293,
            category: "Video Views",
        },
        {
            year: "2006",
            value: 1534,
            category: "Total Watch Time",
        },
        {
            year: "2006",
            value: 356,
            category: "Average Watch Time",
        },
        {
            year: "2006",
            value: 62,
            category: "Conversions (CTA)",
        },
        {
            year: "2007",
            value: 3071,
            category: "Active Views",
        },
        {
            year: "2007",
            value: 3422,
            category: "Video Views",
        },
        {
            year: "2007",
            value: 1562,
            category: "Total Watch Time",
        },
        {
            year: "2007",
            value: 382,
            category: "Average Watch Time",
        },
        {
            year: "2007",
            value: 66,
            category: "Conversions (CTA)",
        },
        {
            year: "2008",
            value: 3103,
            category: "Active Views",
        },
        {
            year: "2008",
            value: 3587,
            category: "Video Views",
        },
        {
            year: "2008",
            value: 1630,
            category: "Total Watch Time",
        },
        {
            year: "2008",
            value: 388,
            category: "Average Watch Time",
        },
        {
            year: "2008",
            value: 69,
            category: "Conversions (CTA)",
        },
        {
            year: "2009",
            value: 3042,
            category: "Active Views",
        },
        {
            year: "2009",
            value: 3590,
            category: "Video Views",
        },
        {
            year: "2009",
            value: 1584,
            category: "Total Watch Time",
        },
        {
            year: "2009",
            value: 415,
            category: "Average Watch Time",
        },
        {
            year: "2009",
            value: 66,
            category: "Conversions (CTA)",
        },
        {
            year: "2010",
            value: 3107,
            category: "Active Views",
        },
        {
            year: "2010",
            value: 3812,
            category: "Video Views",
        },
        {
            year: "2010",
            value: 1696,
            category: "Total Watch Time",
        },
        {
            year: "2010",
            value: 446,
            category: "Average Watch Time",
        },
        {
            year: "2010",
            value: 67,
            category: "Conversions (CTA)",
        },
        {
            year: "2011",
            value: 3134,
            category: "Active Views",
        },
        {
            year: "2011",
            value: 4055,
            category: "Video Views",
        },
        {
            year: "2011",
            value: 1756,
            category: "Total Watch Time",
        },
        {
            year: "2011",
            value: 494,
            category: "Average Watch Time",
        },
        {
            year: "2011",
            value: 64,
            category: "Conversions (CTA)",
        },
        {
            year: "2012",
            value: 3200,
            category: "Active Views",
        },
        {
            year: "2012",
            value: 4106,
            category: "Video Views",
        },
        {
            year: "2012",
            value: 1783,
            category: "Total Watch Time",
        },
        {
            year: "2012",
            value: 519,
            category: "Average Watch Time",
        },
        {
            year: "2012",
            value: 65,
            category: "Conversions (CTA)",
        },
        {
            year: "2013",
            value: 3220,
            category: "Active Views",
        },
        {
            year: "2013",
            value: 4126,
            category: "Video Views",
        },
        {
            year: "2013",
            value: 1806,
            category: "Total Watch Time",
        },
        {
            year: "2013",
            value: 554,
            category: "Average Watch Time",
        },
        {
            year: "2013",
            value: 68,
            category: "Conversions (CTA)",
        },
        {
            year: "2014",
            value: 3280,
            category: "Active Views",
        },
        {
            year: "2014",
            value: 4117,
            category: "Video Views",
        },
        {
            year: "2014",
            value: 1823,
            category: "Total Watch Time",
        },
        {
            year: "2014",
            value: 568,
            category: "Average Watch Time",
        },
        {
            year: "2014",
            value: 68,
            category: "Conversions (CTA)",
        },
    ];
    const [data, setData] = useState(dummyData);

    const config = {
        data,
        xField: "year",
        yField: "value",
        seriesField: "category",
        xAxis: {
            type: "time",
        },
        yAxis: {
            label: {
                // 数值格式化为千分位
                formatter: (v: any) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
            },
        },
        fields: ["xG conceded", "Shot conceded"],
    };
    // return <Area {...config} />;
    return <Line {...config} />;
};
export default DataGraph;
