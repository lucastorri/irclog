package models

import scala.io.Source.fromFile


case class Log(filename: String) {
	
	private val path = "/Users/lucastorri/tmp/data/"

	def lines = fromFile(path + "/" + filename).getLines
	
	def fileExists = true
}