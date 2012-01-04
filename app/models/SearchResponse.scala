package models

import java.io.File
import co.torri.reindxr.index.SearchIndexResult
import co.torri.jsonr._
import scala.collection.mutable.HashMap
import scala.io.Source


case class SearchResponse(query: String = "", files: List[String] = List(), previews: Map[String,List[String]] = Map())

object SearchResponse {
	def apply(r: Option[SearchIndexResult]) = {
		r match {
			case Some(result) => {
				val q = result.query
				val files = result.files.map { case (f, previews) => f }
				val previews = result.files.toMap
				new SearchResponse(q, files, previews)
			}
			case None => new SearchResponse()
		}
	}.toJSON.toString
}
