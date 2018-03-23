# TCP转MQTT服务

## 构建 
gradle build

## 运行
java -jar tcp2mq-<version>-all.jar

### 参数
* --port=<port> TCP监听端口
* --mqtt-server=<host:port> MQTT服务器
* --topic_sub=<topic_sub> 本服务向MQTT订阅的主题
* --topic_pub=<topic_pub> 本服务向MQTT发布的主题
* --qos_sub=<qos_sub> 本服务的向MQTT订阅质量
* --qos_pub=<qos_pub> 本服务的向MQTT发布质量

### 通过MQTT向TCP端下发消息

以JSON的形式作为消息内容，可设置单独发送（并指定地址）或群发，以及指定发送类型（十六进制或字符串）

#### 示例
* mosquitto_pub -t "test_sub" -m "{\"send-type\":\"single\""\\"remote\":\"127.0.0.1:49782\", \"data-type\":\"string\", \"data\":\"hello\"}"
* mosquitto_pub -t "test_sub" -m "{\"send-type\":broadcast\", \"data-type\":\"hex\", \"data\":\"313233\"}"