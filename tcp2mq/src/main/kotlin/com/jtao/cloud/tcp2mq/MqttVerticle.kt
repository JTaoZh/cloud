package com.jtao.cloud.tcp2mq

import com.jtao.cloud.utils.toHexByteArray
import io.netty.handler.codec.mqtt.MqttQoS
import io.vertx.core.AbstractVerticle
import io.vertx.core.buffer.Buffer
import io.vertx.core.json.JsonObject
import io.vertx.mqtt.MqttClient
import org.slf4j.LoggerFactory

class MqttVerticle(val config:JsonObject) :AbstractVerticle(){

    val log = LoggerFactory.getLogger(MqttVerticle::class.java)

    override fun start() {
        val client = MqttClient.create(vertx)
        val eb = vertx.eventBus()

        client.connect(config.getInteger("port"), config.getString("host"), {
            if (it.succeeded()){
                log.debug("mqtt connect succeeded")
                client.publishHandler {
                    val body = it.payload().toJsonObject()
                    val msg = JsonObject().put(SEND_TYPE, body.getString(SEND_TYPE)).put(DATA_TYPE, body.getString(DATA_TYPE))
                    if (body.getString(SEND_TYPE) == SINGLE)
                        msg.put(REMOTE, body.getString(REMOTE))
                    val s = body.getString(DATA)
                    when (body.getString(DATA_TYPE)){
                        DATA_HEX ->  msg.put(DATA, s.toHexByteArray())
                        DATA_STRING -> msg.put(DATA, s)
                    }
                    log.debug(msg.encode())

                    eb.publish(EB_TCP_OUT, msg)

                }

                client.subscribe(config.getString("topic_sub"), config.getInteger("qos_sub"),{
                    if (it.succeeded()){
                        log.debug("mqtt subscribe succeeded")
                    } else {
                        log.warn("mqtt subscribe failed")
                    }
                })
            } else {
                log.warn("mqtt connect failed")
            }
        })



        eb.consumer<JsonObject>(EB_TCP_IN){
            val msg = it.body()
            log.debug(msg.toString())
            val qos = when(config.getInteger("qos_pub")){
                1 -> MqttQoS.AT_LEAST_ONCE
                2 -> MqttQoS.EXACTLY_ONCE
                else -> MqttQoS.AT_MOST_ONCE
            }
            client.publish(config.getString("topic_pub"),
                    Buffer.buffer(msg.toString()),
                    qos,
                    false, false)
        }
    }
}