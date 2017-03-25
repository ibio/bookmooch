# -*- coding: utf-8 -*-

# See: https://doc.scrapy.org/en/latest/topics/downloader-middleware.html
# Modified by Ibio

import scrapy
import logging

class DoSomething(object):

  # http://stackoverflow.com/questions/18950054/class-method-generates-typeerror-got-multiple-values-for-keyword-argument
  # NOTICE: it will be called after first calling scrapy.Request.
  def process_request(self, request, spider):
    logging.log(logging.WARNING, 'This is a warning from AddCookie')
    return scrapy.Request(*request)

