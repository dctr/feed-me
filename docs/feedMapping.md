# Mapping of RSS and ATOM elements

This file describes, how the XML elements of RSS and ATOM feeds are mapped to this app's internal feed object.

* **INTERNAL REPRESENTATION**
  * **RSS XPATH**
  * **ATOM XPATH**

* feed/title
  * rss/channel/title
  * feed/title

* feed/entry[]
  * rss/channel/item[]
  * feed/entry[]
* feed/entry[]/title
  * rss/channel/item[]/title
  * feed/entry[]/title
* feed/entry[]/link
  * rss/channel/item[]/link
  * feed/entry[]/link
* feed/entry[]/dateTime
  * rss/channel/item[]/pubDate
  * feed/entry[]/updated
* feed/entry[]/abstract
  * rss/channel/item[]/description
  * feed/entry[]/summary
