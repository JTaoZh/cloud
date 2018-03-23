package com.jtao.cloud.tcp2mq

import io.vertx.core.Vertx
import io.vertx.core.json.JsonObject

fun main(args:Array<String>){

    val tcp = JsonObject().put("port", 12345)
    val mqtt = JsonObject()
            .put("port", 1883)
            .put("host","localhost")
            .put("topic_sub", "test_sub")
            .put("topic_pub","test_pub")
            .put("qos_sub", 0)
            .put("qos_pub", 0)

    args.forEach {
        when {
            it.contains("--port=") -> tcp.put("port", it.substring("--port=".length).toInt())
            it.contains("--mqtt-server=") -> {
                val s = it.substring("--mqtt-server=".length).split(":")
                mqtt.put("host", s[0]).put("port", s[1])
            }
            it.contains("--topic_sub=") -> mqtt.put("topic_sub", it.substring("--topic_sub=".length))
            it.contains("--topic_pub=") -> mqtt.put("topic_pub", it.substring("--topic_pub=".length))
            it.contains("--qos_sub=") -> mqtt.put("qos_sub", it.substring("--qos_sub=".length).toInt())
            it.contains("--qos_pub=") -> mqtt.put("qos_pub", it.substring("--qos_pub=".length).toInt())
        }
    }

    val vertx = Vertx.vertx()
    vertx.deployVerticle(TcpVerticle(tcp))
    vertx.deployVerticle(MqttVerticle(mqtt))
}