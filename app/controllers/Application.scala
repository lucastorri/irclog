package controllers

import models._
import play.api.mvc._

import play.api.libs.concurrent._
import play.api.libs.concurrent.Akka._
import play.api.Play.current
import play.api.libs.iteratee._
import co.torri.reindxr.index._
import co.torri.jsonr._


object Application extends Controller {

  private val indexedData = Akka.system.actorFor("akka://search-service@localhost:8123")

  def index = Action {
    Ok(views.html.index())
  }

  //def search = WebSocket[String] { request => (in, out) =>
    //out <<: in.map {
      //case EOF => EOF
      //case query => query.map { q => 
        //SearchResponse((indexedData ? SearchIndex(q)).as[SearchIndexResult])
      //}
    //}
  //}

  def search = WebSocket.using[String] { request => 
  
  // Log events to the console
  val out = Enumerator.imperative[String]()


    val in = Iteratee.foreach[String](s => out.push(s)).mapDone { _ =>
    println("Disconnected")
  }
  
  // Send a single 'Hello!' message
  
  (in, out)
}

  def log(file: String, query: String) = Action {
    Ok(views.html.index())
    //AsyncResult {
//      (indexedData ? HighlightResult(query, file)).mapTo[String].asPromise.map { result =>
        //Ok(views.html.log(null))
      //}
//    }
  }

}
