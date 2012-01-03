package models

import java.io.File
import co.torri.reindxr.index.SearchIndexResult
import co.torri.jsonr._
import scala.collection.mutable.HashMap
import scala.io.Source


class SearchResponse(val query: String = "", files: List[File] = List()) {

	private val previewsLimit = 3
	private val words = query.split(" ")
	
	// move to reindxr
	val previews = {
		val p = new HashMap[String, List[(String, Int)]]() { override def default(key: String) = List[(String,Int)]() }
		files.foreach { f =>
			Source.fromFile(f).mkString.split("\n").zipWithIndex.takeWhile { case (l,n) =>
				if (words.find{w => l.toLowerCase.contains(w.toLowerCase)}.isDefined) {
					p(f.getName) = (l,n) :: p(f.getName)
				}

				p(f.getName).size < previewsLimit
			}
		}
		p
	}

}

object SearchResponse {
	def apply(r: Option[SearchIndexResult]) = (r match {
		case Some(result) => new SearchResponse(result.query, result.files)
		case None => new SearchResponse()
	}).toJSON.toString
}
