import { defineUserConfig } from "vuepress";
import type { DefaultThemeOptions } from "vuepress";
import recoTheme from "vuepress-theme-reco";

module.exports = {
  title: "osmanthus 桂花算法",
  description: "Find and automatically format time text from the string 一款高性能、兼容性强、支持全球多语种的时间文本格式化工具",
  theme: recoTheme({
    colorMode: 'light',
    primaryColor: '#3eaf7c',
    style: "@vuepress-reco/style-default",
    logo: "",  // /logo.png
    author: "ziiyoo",
    docsRepo: "https://github.com/ziiyoo/osmanthus",
    docsBranch: "main",
    docsDir: "example",
    lastUpdatedText: "",
    "startYear": "公元前二百年 秦",
    navbar: [
      { text: "Home", link: "/" },
      {
        text: "documents",
        children: [
          { text: "en docs", link: "/docs/en/index.html" },
          { text: "中文文档", link: "/docs/zh/index.html" },
        ],
      },
    ],
  }),
  base: 'osmanthus.github.io',
};
