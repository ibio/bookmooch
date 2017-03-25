# -*- coding: utf-8 -*-
# Modified by Ibio

import scrapy
import re
import datetime
import logging
import random
#
import app.vo.detail as detail


class WorldcatSpider(scrapy.spiders.Spider):
  name = "worldcat"
  allowed_domains = ['http://www.worldcat.org/']
  start_urls = [
    'http://www.worldcat.org/search?q=computer+science&fq=&dblist=638&qt=page_number_link'
  ]
  
  PAGE_ITEMS = 10
  # maxItems = 99999
  MAX_PAGES = 2000
  # for debug use only: if set False, it will stop when meet duplicated items
  # it's so wired that True needed in order to work for this case
  NO_FILTER = True

  # parse items from list
  def parse(self, response):
    # wired: remove ' > tbody'
    elements = response.css('table#br-table-results > tr')
    pageIndex = self.state.get('pageCount', 0)
    logging.log(logging.DEBUG, '==========> current page index: ' + str(pageIndex))
    self.state['itemCount'] = 0
    # follow links to elements
    # logging.log(logging.DEBUG, elements)
    for info in elements:
      # logging.log(logging.DEBUG, info)
      url = info.css('td.coverart > a::attr(href)').extract_first()
      # relative to absolute
      url = response.urljoin(url)
      self.state['itemCount'] = self.state.get('itemCount') + 1
      yield scrapy.Request(url, callback=self.parseDetailPage, meta={'url':url}, dont_filter=self.NO_FILTER)
    #
    itemIndex = self.state.get('itemCount', 0)
    logging.log(logging.DEBUG, '==========> done total items: ' + str(itemIndex) + ' of page index ' + str(pageIndex))
    # add 1 page after done all this page's items
    self.state['pageCount'] = self.state.get('pageCount', 0) + 1
    # follow pagination links
    start = self.state.get('pageCount', 0) * self.PAGE_ITEMS + 1
    next = self.start_urls[0] + '&start=' + str(start)
    if(self.state.get('pageCount', 0) < self.MAX_PAGES):
      logging.log(logging.DEBUG, '==========> next page: ' + next)
      yield scrapy.Request(next, callback=self.parse, dont_filter=self.NO_FILTER)
    else:
      logging.log(logging.DEBUG, '==========> stopped, reached the maximum pages.')

  def parseDetailPage(self, response):
    mainInfo = response.css('div#bib-cont')
    detailInfo = response.css('div#details')
    #
    book = detail.Book()
    book['title'] = mainInfo.css('h1.title::text').extract_first()
    book['author'] = mainInfo.css('td#bib-author-cell > a::text').extract_first()
    book['cover'] = mainInfo.css('div#cover > img::attr(src)').extract_first()
    book['publisher'] = mainInfo.css('td#bib-publisher-cell::text').extract_first()
    book['edition'] = mainInfo.css('span.itemType::text').extract_first()
    book['summary'] = mainInfo.css('div#summary::text').extract_first()
    m = re.search('\d+', mainInfo.css('p.rating > span::attr(class)').extract_first())
    book['rating'] = int(m.group(0)) if m else 0
    subjects = []
    for a in mainInfo.css('ul#subject-terms a'):
      subjects.append(a.css('::text').extract_first().strip())
    book['subjects'] = ','.join(subjects)
    #
    book['isbn'] = detailInfo.css('tr#details-standardno > td::text').extract_first()
    book['oclc'] = int(detailInfo.css('tr#details-oclcno > td::text').extract_first())
    book['description'] = detailInfo.css('tr#details-description > td::text').extract_first()
    # price ajax
    priceUrl = 'http://www.worldcat.org/wcpa/servlet/org.oclc.lac.ui.buying.AjaxBuyingLinksServlet?serviceCommand=getBuyingLinks&oclcno={:d}'.format(book['oclc'])
    book['url'] = response.meta['url']
    yield scrapy.Request(priceUrl, callback=self.parsePrice, meta={'book':book}, dont_filter=self.NO_FILTER)

  def parsePrice(self, response):
    book = response.meta['book']
    priceElements = response.css('div#buyit table tr')
    priceText = ''
    for price in priceElements:
      if(price.css('td.price::text').extract_first()):
        priceText = price.css('td.price::text').extract_first()
        break
    # $12.08
    m = re.search('\d{2,}.\d{2}', priceText)
    # if it's not exist give a random price
    # http://stackoverflow.com/questions/31595594/python-random-float-with-limited-decimal-digits
    randomePrice = round(random.uniform(10 ,200), 2)
    book['price'] = float(m.group(0)) if m else randomePrice
    yield book

