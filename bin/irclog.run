#!/bin/bash

# Variables that must be set:
  # JAVA_HOME
  # IRCLOG_LOGS_DIR
  # IRCLOG_PIDS_DIR

if [ -a env.sh ]
then
	source env.sh
fi


SCRIPT=`basename "$0"`
SCRIPT_DIR=`dirname "$0"`
MAIN=play.core.server.NettyServer
CLASSPATH="$SCRIPT_DIR/../lib-web/*"
LOG_FILE=$IRCLOG_LOGS_DIR/$SCRIPT.log
PID_FILE=$IRCLOG_PIDS_DIR/$SCRIPT.pid

case $1 in
    start)
        ps -p `cat $PID_FILE`
        if [ $? -ne 0 ]
        then
            exec 2>&1 $JAVA_HOME/bin/java -cp $CLASSPATH $MAIN "$SCRIPT_DIR" 1> $LOG_FILE &
            echo $! > $PID_FILE;
        fi
        ;;
    stop)
        kill `cat $PID_FILE` ;;
    *)
        echo "usage: $SCRIPT {start|stop}" ;;
esac

exit 0