# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/en/latest/topics/item-pipeline.html
# Modified by Ibio

import logging
import pymysql
import pymysql.cursors

class StorePipeline(object):

  def __init__(self, host, user, password, database, prefix):
    # http://pymysql.readthedocs.io/en/latest/user/examples.html#crud
    self.db = pymysql.connect(host, user, password, database, charset='utf8mb4', cursorclass=pymysql.cursors.DictCursor)
    self.prefix = prefix

  @classmethod
  def from_crawler(cls, crawler):
    host = crawler.settings.get('MYSQL_HOST')
    user = crawler.settings.get('MYSQL_USER')
    password = crawler.settings.get('MYSQL_PASSWORD')
    database = crawler.settings.get('MYSQL_DATABASE')
    prefix = crawler.settings.get('MYSQL_PREFIX')
    return cls(host, user, password, database, prefix)

  def process_item(self, item, spider):
    cursor = self.db.cursor()
    # https://www.tutorialspoint.com/python3/python_database_access.htm
    sql = 'INSERT INTO {!s}book (isbn, oclc, title, author, cover, publisher, edition, summary, rating, subjects, price, description, url)' \
          'VALUES ("{!s}", {:d}, "{!s}", "{!s}", "{!s}", "{!s}", "{!s}", "{!s}", {:d}, "{!s}", {:10.2f}, "{!s}", "{!s}");'.format(
            self.prefix, 
            item.get('isbn'), 
            item.get('oclc'),
            self._escape(item.get('title')), 
            self._escape(item.get('author')), 
            item.get('cover'), 
            self._escape(item.get('publisher')), 
            self._escape(item.get('edition')), 
            self._escape(item.get('summary')), 
            item.get('rating'), 
            self._escape(item.get('subjects')), 
            item.get('price'), 
            self._escape(item.get('description')), 
            item.get('url'), 
          )
    # self.cursor.execute("""INSERT INTO py_book_store (book_name, price) VALUES (%s, %s)""", (item['book_name'].encode('utf-8'), item['price'].encode('utf-8')))
    # logging.log(logging.WARNING, sql)
    try:
      # Execute the SQL command
      cursor.execute(sql)
      self.db.commit()
    except pymysql.Error as e:
      # Rollback in case there is any error
      # self.db.rollback()
      # http://www.python-course.eu/python3_formatted_output.php
      # http://stackoverflow.com/questions/29613676/python-typeerror-non-empty-format-string-passed-to-object-format
      logging.log(logging.ERROR, "at MySQL {0!r}, NO. {1!s}".format(e, e.args[0]))

    # disconnect from server
    # if commit was invoked, there's no need to call close.
    # self.db.close()

    return item

  def _escape(self, string):
    string = string if string else ''
    return string.replace('\b', '').replace('\n', '').replace('\r', '').replace('\t', '')
