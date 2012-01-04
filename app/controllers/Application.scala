package controllers

import models._
import play.api.libs.iteratee.Input.EOF
import play.api.mvc.Action
import play.api.mvc.Controller
import play.api.mvc.WebSocket

import akka.actor.Actor.remote
import akka.actor.Actor.toAnyOptionAsTypedOption
import akka.actor.actorRef2Scala
import akka.actor.ActorRef
import co.torri.reindxr.index.SearchIndex
import co.torri.reindxr.index.SearchIndexResult
import co.torri.jsonr._


object Application extends Controller {
	
	private val indexedData = remote.actorFor("search-service", "localhost", 8123)
  
	def index = Action {
    	Ok(views.html.index())
  	}
	
  	def search = WebSocket[String] { request => (in, out) =>
	  	out <<: in.map {
		  	case EOF => EOF
	  	  	case query => query.map { q => 
				SearchResponse((indexedData ? SearchIndex(q)).as[SearchIndexResult])
		  	}
	  	}
  	}
	
	def log(name: String) = Action {
		Ok(views.html.log(new Log(name)))
	}
	
}