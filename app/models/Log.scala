package models

import play.api.Play._
import scala.io.Source.fromFile


case class Log(filename: String) {
	
	private val path = configuration.get("irclog.logsdir")

	def lines = fromFile(path.map(_.value + "/" + filename).getOrElse("")).getLines
	
	def fileExists = true
}