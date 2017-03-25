# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html
# Modified by Ibio

import scrapy


class Book(scrapy.Item):
  # define the fields for your item here like:
  isbn = scrapy.Field()
  oclc = scrapy.Field()
  title = scrapy.Field()
  author = scrapy.Field()
  cover = scrapy.Field()
  publisher = scrapy.Field()
  edition = scrapy.Field()
  summary = scrapy.Field()
  rating = scrapy.Field()
  # spited by comma 
  subjects = scrapy.Field()
  price = scrapy.Field()
  description = scrapy.Field()
  url = scrapy.Field()
