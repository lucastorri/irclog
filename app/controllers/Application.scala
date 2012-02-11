package controllers

import models._
import play.api.mvc._

import akka.util._
import akka.util.duration._
import play.api.libs.concurrent._
import play.api.libs.concurrent.Akka._
import play.api.Play.current
import play.api.libs.iteratee._
import co.torri.reindxr.index._
import co.torri.jsonr._


object Application extends Controller {

  private val indexedData = Akka.system.actorFor("akka://localhost:8123/user/search-service")
  private implicit val timeout = Timeout(3 seconds)

  def index = Action {
    Ok(views.html.index())
  }

  def search = WebSocket.using[String] { request => 
    val out = Enumerator.imperative[String]()
    val in = Iteratee.foreach[String] { q =>
      (indexedData ? SearchIndex(q)).mapTo[SearchIndexResult].onComplete {
        case Right(r) => out.push(SearchResponse(r))
        case Left(e) => {println(e)}
      }
    }
    (in, out)
  }

  def log(file: String, query: String) = Action {
    AsyncResult {
      (indexedData ? HighlightResult(query, file)).mapTo[String].asPromise.map { result =>
        Ok(views.html.log(null))
      }
    }
  }

}
