package com.jtao.cloud.tcp2mq

import com.jtao.cloud.utils.toHexString
import io.vertx.core.AbstractVerticle
import io.vertx.core.buffer.Buffer
import io.vertx.core.json.JsonObject
import io.vertx.core.logging.LoggerFactory
import io.vertx.core.net.NetSocket

class TcpVerticle(val config:JsonObject):AbstractVerticle() {
    private val log = LoggerFactory.getLogger(TcpVerticle::class.java)
    override fun start() {
        val eb = vertx.eventBus()
        val server = vertx.createNetServer()
        val sockets = HashMap<String, NetSocket>()
        server.connectHandler { socket->
            val remote = socket.remoteAddress().toString()
            sockets[remote] = socket
            eb.publish(EB_TCP_IN, JsonObject().put(SOCKET_TYPE, CONNECT).put(REMOTE, remote))

            socket.closeHandler {
                sockets.remove(remote)
                eb.publish(EB_TCP_IN, JsonObject().put(SOCKET_TYPE, DISCONNECT).put(REMOTE, remote))
            }

            socket.handler { buffer->
                eb.publish(EB_TCP_IN,
                        JsonObject().
                                put(SOCKET_TYPE, RECEIVE).
                                put(REMOTE, remote).
                                put(DATA, buffer.bytes.toHexString()))
            }
        }

        eb.consumer<JsonObject>(EB_TCP_OUT){
            val msg = it.body()
            log.debug(msg.encode())
            when(msg.getString(SEND_TYPE)){
                BROADCAST->{
                    when(msg.getString(DATA_TYPE)){
                        DATA_STRING-> {
                            sockets.forEach{log.debug(it.value.toString())}
                            sockets.forEach { _, socket ->
                                socket.write(msg.getString(DATA))
                            }
                        }
                        DATA_HEX ->
                            sockets.forEach { _, socket->
                                socket.write(Buffer.buffer(msg.getBinary(DATA)))
                            }
                    }
                }
                SINGLE->{
                    when(msg.getString(DATA_TYPE)) {
                        DATA_STRING ->
                            sockets[msg.getString(REMOTE)]?.write(msg.getString(DATA))
                        DATA_HEX ->
                            sockets[msg.getString(REMOTE)]?.write(Buffer.buffer(msg.getBinary(DATA)))
                    }
                }
            }
        }

        server.listen(config.getInteger("port"))
    }
}