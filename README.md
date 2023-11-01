---
home: true
modules:
  - BannerBrand
  - MdContent
  - Footer
bannerBrand:
  bgImage: '/bg.svg'
  bgImageStyle:
    height: 600px
  title: osmanthus 桂花算法
  description: Find and automatically format time text from the string
  tagline: Fast & High Performance & Light & Auto TimeZone & 100+ Language
  buttons:
    - { text: docs en, link: '/docs/en/index.html' }
    - { text: 中文文档, link: '/docs/zh/index.html' , type: 'plain' }
    - { text: crates.io, link: 'https://crates.io/crates/osmanthus', type: 'plain' }
    - { text: github repo,  icon: 'LogoGithub', link: 'https://github.com/ziiyoo/osmanthus', type: 'plain'  }
isShowTitleInHome: true
actionText: About
actionLink: /views/other/about
---

## Quick Start

##### In Rust

**1.install**

```bash
> cargo add osmanthus
```

**2.useage**

osmanthus provides 4+1 modes:

1. [x] **absolute time text**｜such as `2013年july18 10:03下午`
2. [x] **relative time text**｜such as `3小时前`、`2 minutes ago`
3. [x] **timestamp time text**｜such as`1685025365`、`1663025361000`
4. [x] **series time text**｜such as`https://example.com/20210315/img/2035.png`
5. [x] **auto,any time text**. It including 4 modes: **absolute** and **relative** and **timestamp** and **series**, in the order: **timestamp** > **relative** > **absolute** > **series**

> Tips: When you don't know what type of time text it is, or if you want the osmanthus to recognize it on its own, it is recommended to use auto mode.

**2.1 parse absolute time text**

```rust
use osmanthus::parse_absolute;
use osmanthus::bind::Param;

fn main() {
    let samples = vec![
        "3/08/2023 | 11:51",  // 2023-08-03 11:51:00
        "aug 06 .2023 10h42",  // 2023-08-06 10:42:00"
        "2013年12月8号 pm 3:00",  // 2013-12-08 15:00:00
        "26 ก.ค. 2566 08:00 น.",  // 2023-07-26 08:00:00
        "2014年04月08日11时25分18秒 下午",  // 2014-04-08 23:25:18
        "2023-02-05 10:03:37 pm cst",
        "2023-07-30T14:12:51+02:00",
    ];
    for sample in samples{
        let r =parse_absolute(sample, Some(Param{strict: true, ..Default::default()}));
        let datetime = r.datetime.local.datetime;
        println!("absolute time text parse result: {:?}, status: {}", datetime.format("%Y-%m-%d %H:%M:%S").to_string(), r.status);
    }
}
```

**2.2 parse relative time text**

```rust
use osmanthus::parse_relative;
use osmanthus::bind::Param;

fn main() {
    let samples = vec![
        "发布于 - /n6小時前,",  // 6 hours ago
        "（ 시간: 3분 전）", // 3 minute ago
        "- about / 2 minutes ago", // 2 minutes ago
        "30天前 来源：新华网", // 30 days ago
        "publish 5 second ago." // 5 second ago.
    ];
    for sample in samples{
        let r =parse_relative(sample, Some(Param{strict: true, ..Default::default()}));
        let datetime = r.datetime.local.datetime;
        println!("relative time text parse result: {:?}, status: {}", datetime.format("%Y-%m-%d %H:%M:%S").to_string(), r.status);
    }
}
```

**2.3 parse timestamp time text**

```rust
use osmanthus::parse;
use osmanthus::bind::Param;

fn main() {
    let samples = vec![
        "1677380340",  // success
        "1677380340236982058745",  // parse fail
        "16773803abc",   // parse fail
        "你好，中国",   // parse fail
    ];
    for sample in samples{
        let r =parse(sample, Some(Param{strict: true, ..Default::default()}));
        let datetime = r.datetime.local.datetime;
        println!("timestamp time text parse result: {:?}, status: {}", datetime.format("%Y-%m-%d %H:%M:%S").to_string(), r.status);
    }
}
```

**2.4 parse Series time text**

```rust
use osmanthus::parse_series;
use osmanthus::bind::Param;

fn main() {
    let samples = vec![
        "https://www.kingname.info/2022/JULY309/this20350205-is-gnelist/",  // 2022-07-30 00:00:00"
        "H_502_5@2010oct03 @H_502_5@2012/07/26.doc",  // 2010-10-03 00:00:00
        "https://new.qq.com/rain/a/k09381120221126A03W2R00",  // 2022-11-26 00:00:00
        "/202211/W02022110720101102590.jpg", // 2022-11-07 00:00:00
        "http://cjrb.cjn.cn/html/2023-01/16/content_250826.htm" // 2023-01-16 00:00:00
    ];
    for sample in samples{
        let r =parse_series(sample, Some(Param{strict: true, ..Default::default()}));
        let datetime = r.datetime.local.datetime;
        println!("series time text parse result: {:?}, status: {}", datetime.format("%Y-%m-%d %H:%M:%S").to_string(), r.status);
    }
}
```

**2.5 auto, parse any time text**

```rust
use osmanthus::parse;
use osmanthus::bind::Param;

fn main() {
    let samples = vec![
        "https://www.kingname.info/2022/JULY309/this20350205-is-gnelist/",  // series, 2022-07-30 00:00:00"
        "3/08/2023 | 11:51",  // absolute, 2023-08-03 11:51:00
        "发布于 - /n6小時前,",  // relative, 6 hours ago
        "/202211/W02022110720101102590.jpg", // series, 2022-11-07 00:00:00
        "1677380340" // timestamp, 2023-02-26 10:59:00
    ];
    for sample in samples{
        let r =parse(sample, Some(Param{strict: true, ..Default::default()}));
        let datetime = r.datetime.local.datetime;
        println!("time text  parse result: {:?}, status: {}", datetime.format("%Y-%m-%d %H:%M:%S").to_string(), r.status);
    }
}
```
