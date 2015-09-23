# Mapping of RSS and ATOM elements

This file describes, how the XML elements of RSS and ATOM feeds are mapped to this app's internal feed object.

* **INTERNAL REPRESENTATION**
  * **RSS XPATH**
  * **ATOM XPATH**

* feed/title
  * rss/channel/title
  * feed/title

* feed/entries[]
  * rss/channel/item[]
  * feed/entry[]
* feed/entries[]/feedTitle
  * rss/channel/title
  * feed/title
* feed/entries[]/title
  * rss/channel/item[]/title
  * feed/entry[]/title
* feed/entries[]/link
  * rss/channel/item[]/link
  * feed/entry[]/link
* feed/entries[]/dateTime
  * rss/channel/item[]/pubDate
  * feed/entry[]/updated
* feed/entries[]/abstract
  * rss/channel/item[]/description
  * feed/entry[]/summary
* feed/entries[]/feedTitle
  * rss/channel/title
  * feed/title
