import sbt._
import Keys._
import PlayProject._

object ApplicationBuild extends Build {

    val appName         = "irclog"
    val appVersion      = "1.0"

    val appDependencies = Seq(
        //"com.typesafe.akka" % "akka-actor" % "2.0-M4",
        "com.typesafe.akka" % "akka-remote" % "2.0-M4"
    )

    val main = PlayProject(appName, appVersion, appDependencies, mainLang = SCALA).settings(
      // Add your own project settings here
    )

}
