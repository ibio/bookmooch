scrapy 1.3.3

1 clean the environment
https://community.linuxmint.com/tutorial/view/313
bash(sh) r.sh


2 run crawling
scrapy crawl worldcat



NOTICE: 
	1 it doesn't have self.state in start_requests.
	2 run bash r.sh before every new task
  3 press only ONCE ctrl + c for pausing the task, and everything should resume properly later.
  (see here for details http://stackoverflow.com/questions/28851535/how-does-scrapy-pause-resume-work)

#
# Remember to add storage pipeline into ITEM_PIPELINES setting.
#


Test:
scrapy shell 'http://www.worldcat.org/search?q=computer+science&fq=&dblist=638&start=1&qt=page_number_link'
response.css('title')


scrapy crawl worldcat -o worldcat.csv