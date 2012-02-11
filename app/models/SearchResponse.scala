package models

import java.io.File
import co.torri.reindxr.index.SearchIndexResult
import co.torri.jsonr._
import scala.collection.mutable.HashMap
import scala.io.Source


case class SearchResponse(query: String = "", files: List[String] = List(), previews: Map[String,List[String]] = Map())

object SearchResponse {

  def apply(r: SearchIndexResult) =
    new SearchResponse(r.query, r.files.map { case (f, previews) => f }, r.files.toMap).toJSON.toString

}
